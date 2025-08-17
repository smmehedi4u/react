import React, { useState } from "react";

function ColorPicker() {
  const [color, setColor] = useState("#ffffff");

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="color-picker">
      <h2>Color Picker</h2>
      <div className="color-display" style={{ backgroundColor: color }}>
        <p>Selected Color: {color}</p>
      </div>
      <label>Select a color:</label>
      <input type="color" value={color} onChange={handleChange} />
    </div>
  );
}

export default ColorPicker;
