import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Login from "./components/Login";
import Nav from "./components/Nav/Nav";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";



class App extends Component {

  state = {
    user: null
  }
  
  setUser = (user) => {
    this.setState({ user });
  }

  render() {
    const {user} = this.state;
    const setUser = this.setUser
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute exact path="/contactform" component={ContactForm} />
            <ProtectedRoute exact path="/contactlist" component={ContactList} />
            <ProtectedRoute exact path="/notelist" component={NoteList} />
            <ProtectedRoute exact path="/noteform" component={NoteForm} />
            <Route component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
