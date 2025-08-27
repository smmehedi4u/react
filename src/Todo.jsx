import React, { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Move task up
  const moveUp = (index) => {
    if (index === 0) return; // can't move up the first task
    const updated = [...tasks];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setTasks(updated);
  };

  // Move task down
  const moveDown = (index) => {
    if (index === tasks.length - 1) return; // can't move down the last task
    const updated = [...tasks];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setTasks(updated);
  };

  return (
    <div style={{ margin: "40px", fontFamily: "Arial" }}>
      <h2>React To-Do App</h2>
      <input
        type="text"
        value={newTask}
        placeholder="Enter task..."
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              margin: "8px 0",
              padding: "8px",
              background: "#f4f4f4",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{task}</span>
            <div>
              <button onClick={() => moveUp(index)}>⬆️</button>
              <button onClick={() => moveDown(index)}>⬇️</button>
              <button onClick={() => deleteTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
