import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactList from "./components/ContactList";
import Login from "./components/Login";
import Nav from "./components/Nav/Nav";


const HomePage = props => <div>
  <ContactList />
</div>

const LoginPage = props =>
  <div>
    <Nav />
    <Login />
  </div>

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
         
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
