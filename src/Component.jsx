import React, { useState } from "react";

function Component() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: "",
    fruit: "",
    gender: "",
  });

  // Handle all input changes in one place
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>React Form Example</h1>

      {/* Text Input */}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </label>
      <br />

      {/* Number Input */}
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
        />
      </label>
      <br />

      {/* Textarea */}
      <label>
        Bio:
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write something..."
        />
      </label>
      <br />

      {/* Select Dropdown */}
      <label>
        Favorite Fruit:
        <select name="fruit" value={formData.fruit} onChange={handleChange}>
          <option value="">--Choose--</option>
          <option value="apple">Apple</option>
          <option value="mango">Mango</option>
          <option value="banana">Banana</option>
        </select>
      </label>
      <br />

      {/* Radio Buttons */}
      <label>
        Gender:
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />{" "}
        Female
      </label>
      <br />

      <hr />

      {/* Show Live Data */}
      <h2>Form Data:</h2>
      <p>Name: {formData.name}</p>
      <p>Age: {formData.age}</p>
      <p>Bio: {formData.bio}</p>
      <p>Fruit: {formData.fruit}</p>
      <p>Gender: {formData.gender}</p>
    </div>
  );
}

export default Component;
