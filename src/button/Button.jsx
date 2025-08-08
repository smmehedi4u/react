import "./Button.css";

function Button(props) {
  return ( 
    <div>
        <p>Condition : {props.label}</p>
        <p>Age: {props.age}</p>
        <p>Name: {props.name}</p>
    </div>
    );
}

export default Button;
