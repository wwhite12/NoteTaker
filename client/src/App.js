import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import LoginPage from "./components/Login";
import Nav from "./components/Nav/Nav";
import NoteForm from "./components/NoteForm";
import UserContext from "./context/UserContext";
import authenticatedAxios from "./utils/AuthenticatedAxios";

const HomePage = props => (
  <div>
    <ContactList />

    <div className="container">
      <div className="row">
        <div className="col">
        </div>
      </div>

      <div className="row">
        <div className="col">
        </div>
        <div className="col">
        </div>
      </div>
    </div>
  </div>
);

<<<<<<< HEAD
class App extends Component {
=======
// const LoginPage = props =>
//   <div>
//     <Login />
//   </div>

class App extends React.Component {
>>>>>>> 0460412aa111245c9d9fc145de0d7e0bb7f42e1f
  state = {
    user: null
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios
        .get("/api/me")
        .then(response => this.setUser(response.data));
    }
  }

  render() {
    const { user } = this.state;
    const setUser = this.setUser;
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
              <ProtectedRoute exact path="/homePage" component={HomePage} />
              <Route exact path="/" component={LoginPage} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
