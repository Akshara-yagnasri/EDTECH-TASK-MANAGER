import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskApi';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const { token, user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    if (!token) return;
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data.tasks);
    } catch (err) {
      alert('Failed to fetch tasks');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask(token, form);
      setForm({ title: '', description: '', dueDate: '' });
      fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTask(token, id, data);
      fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(token, id);
      fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete task');
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.progress === filter);

  if (!user) return <div>Please login</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>Logged in as: {user.email} ({user.role})</p>
      {user.role === 'student' && <p>Assigned Teacher: {user.teacherId}</p>}
      <button onClick={logout}>Logout</button>

      <hr />

      <h3>Add Task</h3>
      <form onSubmit={handleCreate}>
        <input placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} /><br />
        <input placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} /><br />
        <input type="date" value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /><br />
        <button type="submit">Add Task</button>
      </form>

      <h3>Filter</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <h3>Tasks</h3>
      {filteredTasks.map(task => (
        <TaskCard key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} currentUserId={user.id} />
      ))}
    </div>
  );
};

export default Dashboard;
