import axios from "axios";
const User = require ("../../../models/user");

function Auth() {
  function logIn(username, password, cb) {
    console.log("logging in");
    axios.post("/api/authenticate", { username, password }).then(response => {
      console.log("u are logged in");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      cb(response.data);
    });
  }

  function signUp(username, password, cb) {
    axios.post("/api/signup", { username, password }).then(req => {
      User.create(req.body).then(function(res) {
        res.json({ message: "user created" });
        cb(res);
      });
    });
  }

  function logOut(cb) {
    console.log("logged out");
    localStorage.removeItem("token");
    cb();
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  return {
    isLoggedIn,
    logIn,
    logOut,
    getToken,
    signUp
  };
}

export default Auth();
