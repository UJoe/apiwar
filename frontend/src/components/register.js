import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Tie from "./tie.jsx";

function Register(props) {
  const [successReg, setSuccessReg] = useState("");
  const postUser = (e) => {
    e.preventDefault();
    console.log(e);
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    fetch(
      `http://localhost:8000/register?name=${name}&email=${email}&password=${password}`,
      {
        method: "POST",
      }
    ).then((res) => {
      console.log(res.ok);
      setSuccessReg(res.ok);
    });
  };
  useEffect(() => {
    switch (successReg) {
      case "":
        document.getElementById("reg-result").innerHTML = "";
        break;
      case true:
        document.getElementById("reg-result").classList.add("animated");
          setTimeout(() => {
            document.getElementById("reg-result").classList.remove("animated");
            setSuccessReg("")
          }, 3001);
        document.getElementById("reg-result").innerHTML =
          "Successful registration. Log in to continue.";
        break;
      case false:
        document.getElementById("reg-result").classList.add("animated");
        setTimeout(() => {
          document.getElementById("reg-result").classList.remove("animated");
          setSuccessReg("");
        }, 4001);
        document.getElementById("reg-result").innerHTML =
          " Username already exists, please choose another one!";
        break;
      default:
        break;
    }
  }, [successReg]);

  return (
    <div>
      <div className="navbar">
        <Link className="navitem" to="/login">
          Back to login
        </Link>
        <img className="logo" src="logo.png" alt="Api Wars"></img>
      </div>
      <form onSubmit={postUser}>
        <div>
          <label>Name: </label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="password">Password: </label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <span id="reg-result"></span>
      <Tie/>
    </div>
  );
}

export default Register;
