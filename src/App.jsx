import TaskList from "./components/TaskList";
import Header from "./Header.jsx";
import Footer from "./Food.jsx";
import Food from "./Food.jsx";
import Card from "./Card.jsx";
import React from "react";
import List from "./List.jsx";

import Button from './button/Button.jsx';

function App() {

  const items = ["Milk", "Eggs", "Bread", "Butter"];

  return (
    <>
      {/* <Header />
      <Food />
      <Footer /> */}
      {/* <Card /> */}
      {/* <Button label="Submit" age={20} name="John" /> */}
      <h1>My Food List</h1>
      <List items={items} category="Groceries" />
    </>
  );
}

export default App;
