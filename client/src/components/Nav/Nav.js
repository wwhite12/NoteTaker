import React from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
} from "mdbreact";
import "./NavStyle.css";
import Auth from "../../utils/Auth";
import UserContext from "../../context/UserContext";

class Nav extends React.Component {
  state = {
    username: "",
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }




  render() {

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
          <div className={localStorage.getItem("username") ? "open" : "hidden"}>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline >
                  <p id="loggedInAs">Logged in as: {localStorage.getItem("username")}</p>
                </MDBFormInline>
              </MDBNavItem>
              <MDBNavItem>
                <MDBFormInline waves>
                  <button type="button" className="btn btn-primary">Sign out</button>
                </MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
          </div>
        </MDBCollapse>
      </MDBNavbar>


    )
  }
}
export default Nav;
