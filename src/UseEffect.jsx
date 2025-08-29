import { useState, useEffect } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("black");

  // useEffect to change color whenever count changes
  useEffect(() => {
    if (count > 0) {
      setColor("green");   // positive → green
    } else if (count < 0) {
      setColor("red");     // negative → red
    } else {
      setColor("black");   // zero → black
    }
  }, [count]); // runs whenever count changes

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: color }}>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>➕ Add</button>
      <button onClick={() => setCount(count - 1)}>➖ Subtract</button>
      <button onClick={() => setCount(0)}>🔄 Reset</button>
    </div>
  );
}

export default CounterApp;
