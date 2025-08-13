// List.js
export default function List(props) {
  const { items, category } = props;

  if (!items || items.length === 0) {
    return <h2>No items available in {category}</h2>;
  }

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


// export default List;