// import logo from './logo.svg';
// import './App.css';
// import React, { useState, useEffect} from 'react';
// import axios from 'axios';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   const handleAddTask = () => {
//     if (newTask.trim() !== '') {
//       setTasks([...tasks, newTask]);
//       setNewTask('');
//     }
//   };

//   const handleDeleteTask = (index) => {
//     const updatedTasks = [...tasks];
//     updatedTasks.splice(index, 1);
//     setTasks(updatedTasks);
//   };

//   useEffect(() => {
//     fetch('/api/tasks')
//       .then(response => response.json())
//       .then(data => setTasks(data));
//   }, []);

//   return (
//     <div className="App">
//       <h1>To-Do List</h1>
//       <div className="task-form">
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Enter task"
//         />
//         <button onClick={handleAddTask}>Add Task</button>
//       </div>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>
//             {task}
//             <button onClick={() => handleDeleteTask(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

//using express 
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
      })
      .then(response => response.json())
      .then(() => {
        setTasks([...tasks, newTask]);
        setNewTask('');
      });
    }
  };

  const handleDeleteTask = (index) => {
    fetch(`/api/tasks/${index}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    });
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-form">
        <input
          type="text"
          value={newTask}
          id="input-field"
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
