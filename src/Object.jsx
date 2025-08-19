import React, { useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({
    name: "Mehedi",
    age: 24,
    city: "Dhaka",
  });

  const updateCity = () => {
    setUser(prevUser => ({
      ...prevUser,
      city: "Chattogram",
    }));
  };

  return (
    <div>
      <h2>{user.name} ({user.age})</h2>
      <p>City: {user.city}</p>
      <button onClick={updateCity}>Move to Chattogram</button>
    </div>
  );
}

export default UserProfile;
