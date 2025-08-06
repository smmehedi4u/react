import Image from "./assets/image.jpg";

function Card() {
  return (
    <div className="card">
      <img src={Image} alt="Task" />
      <h2>Task Card</h2>
      <p>This is a card component for displaying tasks.</p>
    </div>
  );
}

export default Card;
