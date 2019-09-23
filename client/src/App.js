import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import LoginPage from "./components/LoginPage";
import Nav from "./components/Nav/Nav";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import UserContext from "./context/UserContext";
import authenticatedAxios from "./utils/AuthenticatedAxios";


class App extends Component {

  state = {
    user: null
  }
  
  setUser = (user) => {
    this.setState({ user });
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if(token) {
      authenticatedAxios
      .get("/api/me")
      .then(response => this.setUser(response.data));
    }
  }

  render() {
    const {user} = this.state;
    const setUser = this.setUser
    return (
      <Router>
        <div className="App">
          <Nav />

          <UserContext.Provider
          value={{
            user: user,
            setUser: setUser
          }}
          >
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <ProtectedRoute exact path="/contactform" component={ContactForm} />
            <ProtectedRoute exact path="/contactlist" component={ContactList} />
            <ProtectedRoute exact path="/notelist" component={NoteList} />
            <ProtectedRoute exact path="/noteform" component={NoteForm} />
            <Route component={LoginPage} />
          </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
