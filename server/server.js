const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to DB
mongoose.connect('mongodb://127.0.0.1/nodeexpressdb',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));


// API endpoints for tasks
let tasks = [];

app.get('/', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body.task;
  tasks.push(newTask);
  res.status(201).json({ success: true, message: 'Task added successfully' });
});

app.delete('/api/tasks/:index', (req, res) => {
  const index = req.params.index;
  tasks.splice(index, 1);
  res.status(200).json({ success: true, message: 'Task deleted successfully' });
});

// Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../todo/public', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
