import React from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,  MDBNavbarToggler, MDBCollapse, MDBFormInline,
} from "mdbreact";

import "./NavStyle.css";
import { withRouter } from "react-router-dom";
import Auth from "../../utils/Auth";

import UserContext from "../../context/UserContext";


class Nav extends React.Component {
  static contextType = UserContext;
  constructor () {
    super()
  this.state = {
    username: "",
    isOpen: false
  };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onClick = event => {
    event.preventDefault();
   console.log("logging out");
   const state = this.props.location.state;
      Auth.logOut(response => {
        
        
        this.props.history.push("/", {response:response});
      })
    
  };

  
  render () {

  return (
    <MDBNavbar expand="md" color="aqua-gradient" className="font-weight-bold py-4 px-2 mb-4">
    <MDBNavbarBrand>
      <strong className="white-text">LazySalesman</strong>
    </MDBNavbarBrand>
    <MDBNavbarToggler onClick={this.toggleCollapse} />
    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
      <MDBNavbarNav left>
        <MDBNavItem>
       
        </MDBNavItem>
      </MDBNavbarNav>
      <MDBNavbarNav right>
      <MDBNavItem>
          <MDBFormInline >
            <p id="loggedInAs">Logged in as: {this.state.username}</p>
          </MDBFormInline>
        </MDBNavItem>
        <MDBNavItem>
          <MDBFormInline waves>
<<<<<<< HEAD
          <button onClick={this.onClick} type="button" className="btn btn-primary" >Sign out</button>
=======
          <button type="button" className="btn btn-primary">Sign out</button>
>>>>>>> 0460412aa111245c9d9fc145de0d7e0bb7f42e1f
          </MDBFormInline>
        </MDBNavItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>


  )
  }
}
export default withRouter(Nav);

