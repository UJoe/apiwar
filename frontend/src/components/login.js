import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./navstyle.css";
import Tie from "./tie.jsx";

const Login = (props) => {
  const [sucLog, setSucLog] = useState();
  const [welUs, setWelUs] = useState();

  var welcomeUser;
  var successLog = false;

  const postLogin = (e) => {
    e.preventDefault();
    console.log(e);
    const email = e.target[0].value;
    const password = e.target[1].value;
    fetch(`http://localhost:8000/login?email=${email}&password=${password}`, {
      method: "POST",
    })
      .then((res) => {
        if (res.status === 401) {
          document.getElementById("log-result").classList.add("animated")
          setTimeout(() => {
            document.getElementById("log-result").classList.remove("animated")
          }, 3001);
          document.getElementById("log-result").innerHTML =
            "Wrong username or password!";
        }
        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          successLog = data[0];
          welcomeUser = data[1];
          document.getElementById("log-result").innerHTML =
            successLog === true
              ? "Welcome, " + welcomeUser.name + "!"
              : "Wrong username or password!";
          console.log(successLog, welcomeUser);
          window.loggedinuser = "Signed in as " + welcomeUser.name;
          setSucLog(successLog);
          setTimeout(() => {
            setWelUs(welcomeUser);
          }, 500);
        }, 500);
      });
  };

  if (sucLog) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { boolean: sucLog },
        }}
      />
    );
  }

  //ha létezik a beírt felhasználó, akkor true és tovább enged, ha nem, akkor false és marasztal
  //backendből kell lekérni gombnyomásra

  return (
    <div>
      <div className="navbar">
        <Link className="navitem" to="/register">
          Register
        </Link>
        <img className="logo" src="logo.png" alt="Api Wars"></img>
      </div>
      <br />
      <form onSubmit={postLogin}>
        <div>
          <label>Email: </label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <span id="log-result"></span>
      <Tie />
    </div>
  );
};

export default Login;
