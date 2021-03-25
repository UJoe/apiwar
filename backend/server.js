const express = require("express");
const app = express();
const port = 8000;
const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const fs = require("fs");
let cors = require("cors");
var passwordHash = require("password-hash");

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

const rawdata = fs.readFileSync("./data/users.json");
let users = JSON.parse(rawdata);
let user = {};

//TODO: megnézni, hogy létezik-e már ilyen user
app.post("/register", function (req, res) {
  let regName = req.query.name;
  let regEmail = req.query.email;
  let regPassword =
    req.query.password; /* 
  res.send("This is horrible!!!!!!!!!"); */
  console.log(res.send);
  console.log(regName, regEmail, regPassword);
  let filteredName = users.filter((user) => user.name === regName);
  let filteredEmail = users.filter((user) => user.email === regEmail);

  console.log(filteredName.length, filteredEmail.length);
  if (filteredName.length !== 0 || filteredEmail.length !== 0) {
    res.send(false, 404);
  }
  if (filteredName.length === 0 || filteredEmail.length === 0) {
    var hashedPassword = passwordHash.generate(regPassword);
    console.log(passwordHash.verify(regPassword, hashedPassword));
    user = { name: regName, email: regEmail, regPassword: hashedPassword };
    users.push(user);
    let json = JSON.stringify(users);
    fs.writeFile("./data/users.json", json, function () {});
    console.log("Got body:", users);
    res.send(true);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false, //számon tartja, hogy valaki be van jelentkezve és le tudom kérdezni a user-t, sütit fog visszaküldeni
    },
    //Ki kell kotorni az adatbázisból a user-t
    function (email, password, done) {
      const loginUser = users.filter((user) => user.email === email)[0];
      //const loginPassword = users.filter(user=>user.password===password)[0].password
      if (!loginUser) {
        return done(null, false);
      }
      if (!passwordHash.verify(password, loginUser.regPassword)) {
        return done(null, false);
      }
      return done(null, [true, loginUser]);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
//Átadom az adatokat a passport.authenticate által visszaadott fv-nek.

app.post("/login", passport.authenticate("local", {}), function (req, res) {
  console.log("running");
  const userArray = req.session.passport.user;
  console.log(user);
  res.send([userArray[0], { name: userArray[1].name }]);
  console.log(res.send);
});
app.post("/logout", function (req, res) {
  req.logout();
  res.send("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
