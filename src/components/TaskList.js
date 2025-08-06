import React, { useEffect, useState } from 'react';
import api from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);


  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // UPDATE
        await api.put(`/tasks/${editingId}`, form);
        setEditingId(null);
      } else {
        // CREATE
        await api.post('/tasks', form);
      }
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      console.error("API Error:", err);
    }
  };
  

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleEdit = (task) => {
    console.log('Editing task ID:', task.id);
    setForm({ title: task.title, description: task.description });
    setEditingId(task.id);
  };
  

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={form.title}
          className="border px-3 py-2 rounded"
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 border rounded shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
