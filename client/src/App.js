import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Login from "./components/Login";
import Nav from "./components/Nav/Nav";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";


const HomePage = props => <div>
  
      <ContactList/>
  
  <div className="container">
    <div className="row">
      <div className="col">
        <NoteList/>
      </div>
    </div>

    <div className="row">
      <div className="col">
        <ContactForm />
      </div>
      <div className="col">
        <NoteForm />
      </div>
    </div>
  </div>
</div>
 
const LoginPage = props =>
  <div>
    <Login />
  </div>

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/homePage" component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;


{/* <Route exact path="/contactlist" component={ContactList} />
<Route exact path="/notelist" component={NoteList} />
<Route exact path="/noteform" component={NoteForm} />
<Route component={Login} /> */}