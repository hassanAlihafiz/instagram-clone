import React, { useState } from "react";
import "../App.css";

const Stories = () => {
  const [state, setState] = useState([
    {
      id: 1,
      image: require("../images/instagramLogo.png"),
      name: "Hassan Ali",
    },
    {
      id: 2,
      image: require("../images/instagramLogo.png"),
      name: "Syed Abdul Basit",
    },
    {
      id: 3,
      image: require("../images/instagramLogo.png"),
      name: "Bilal Qadri",
    },
  ]);
  return (
    <div className="stories">
      {state.map((user) => (
        <div className="stories__info" key={user.id}>
          <div className="stories__img">
            <span>
              <img src={user.image} alt="user" />
            </span>
          </div>
          <div className="stories__name">{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
