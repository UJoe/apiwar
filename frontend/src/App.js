/* import { response } from "express";*/
import React from "react";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import "./App.css";
import "./components/navstyle.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
        <Route render={() => <h3>Better luck next time</h3>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
