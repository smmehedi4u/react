import React from "react";
import TaskList from "./components/TaskList";
import Header from "./Header.jsx";
import Footer from "./Food.jsx";
import Food from "./Food.jsx";
import Card from "./Card.jsx";
// import React from "react";
import List from "./List.jsx";

import Component from "./Component";
import Button from "./button/Button.jsx";
// import ColorPicker from "./colorPicker.jsx";
import Counter from "./update.jsx";
import Object from "./Object.jsx";
import Array from "./Array.jsx";
import UpdateArray from "./UpdateArray.jsx";
import Todo from "./Todo.jsx";

function App() {
  // const items = ["Milk", "Eggs", "Bread", "Butter"];
  const handleClick = (name) => {
    alert(`Hello, ${name}!`);
  };

  return (
    <>
      {/* <Header />
      <Food />
      <Footer /> */}
      {/* <Card /> */}
      {/* <Button label="Submit" age={20} name="John" /> */}
      {/* <h1>My Food List</h1>
      <List items={items} category="Groceries" /> */}
      {/* <button onClick={() => handleClick("Mehedi")}>Greet Me</button> */}
       {/* <Component /> */}
       {/* <ColorPicker /> */}
      {/* <Counter /> */}
      {/* <Object /> */}
      {/* <Array /> */}
      {/* <UpdateArray /> */}
      <Todo/>
    </>
  );
}

export default App;
