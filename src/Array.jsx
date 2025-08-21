import React, { useState } from "react";

function ArrayWithInput() {
  const [items, setItems] = useState(["Apple", "Banana", "Orange"]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Add or Update item
  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    if (editIndex !== null) {
      // Update existing item
      const updatedItems = items.map((item, i) =>
        i === editIndex ? input : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      // Add new item
      setItems([...items, input]);
    }

    setInput("");
  };

  // Remove item on click
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Set item for editing
  const editItem = (index) => {
    setInput(items[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fruits List</h2>

      {/* Input form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter fruit name"
        />
        <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
      </form>

      {/* Display items */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span
              onClick={() => removeItem(index)} // remove when click name
              style={{ cursor: "pointer", marginRight: "10px", color: "blue" }}
            >
              {item}
            </span>
            <button onClick={() => editItem(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArrayWithInput;
