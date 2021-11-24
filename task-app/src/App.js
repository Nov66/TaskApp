import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from './components/Tasks';

function App({ title }) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:4000/tasks');
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Tasks
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:4000/tasks/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
    // console.log(task);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // console.log(id);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) => {
        console.log({ reminder: !task.reminder });
        return task.id === id ? { ...task, reminder: !data.reminder } : task;
      })
    );
  };

  return (
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        `No Tasks To Show`
      )}
    </div>
  );
}

export default App;
