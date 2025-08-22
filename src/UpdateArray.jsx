import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "Mehedi", age: 24 },
    { id: 2, name: "Hasan", age: 25 },
  ]);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  // Add new user
  const addUser = () => {
    if (!newName || !newAge) return; // prevent empty
    setUsers((prev) => [
      ...prev,
      { id: Date.now(), name: newName, age: Number(newAge) },
    ]);
    setNewName("");
    setNewAge("");
  };

  // Update user name
  const updateUser = (id, key, value) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [key]: value } : user
      )
    );
  };

  // Remove user
  const removeUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      {/* Input for new user */}
      <input
        type="text"
        placeholder="Enter name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter age"
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={user.name}
              onChange={(e) => updateUser(user.id, "name", e.target.value)}
            />
            <input
              type="number"
              value={user.age}
              onChange={(e) => updateUser(user.id, "age", e.target.value)}
            />
            <button onClick={() => removeUser(user.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
