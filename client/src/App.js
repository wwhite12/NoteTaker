import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Login from "./components/Login";
import Nav from "./components/Nav/Nav";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";



class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/contactform" component={ContactForm} />
            <Route exact path="/contactlist" component={ContactList} />
            <Route exact path="/notelist" component={NoteList} />
            <Route exact path="/noteform" component={NoteForm} />
            <Route component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
