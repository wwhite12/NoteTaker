//import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import "./LoginStyle.css";
import API from "../utils/API";
import ReactCardFlip from 'react-card-flip';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";
import Nav from "../components/Nav/Nav";





class Login extends Component {
  static contextType = UserContext;

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  handleSignup(e) {
    e.preventDefault();

    const { username, password } = this.state;

    if (username && password) {
      Auth.signUp(username, password, response => {
        this.context.setUser(response);
        api.create(response).then(function(res) {
          res.json({ message: "User Created" });
        })
        console.log(this.context.response);
        this.props.history.push("/");
      });
    } else {
      alert("Enter username and password");
    }

    

  

    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const contactData = {
      firstName: "Welcome",
      lastName: localStorage.getItem("username"),
      notes: [],
    }

    API.saveContact(contactData).then(res => {
      console.log(res)
    })

    const { username, password } = this.state;
    localStorage.setItem("username", this.state.username)

    if (username && password) {
      Auth.logIn(username, password, response => {
        this.context.setUser(response);
        console.log(this.context);
        this.props.history.push("/homePage");
      });
    } else {
      alert("Enter username and password");
    }
  };

  render() {
    return (

<<<<<<< HEAD
      
    
      <div style={{textAlign: "center"}} >
        <div style={{display: "inline-block"}}>

        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
          <div key="front">
            <div>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <MDBContainer className="login-container">
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBCard style={{width:"500px"}}>
                            <MDBCardBody className="mx-4">
                              <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                  <strong>Sign in</strong>
                                </h3>
                              </div>
                              <MDBInput
                                value={this.state.username}
                                name="username"
                                onChange={this.handleInputChange}
                                type="text"
                                label="Your username"
                                validate
                                error="wrong"
                                success="right"
                              />
                              <MDBInput
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                label="Your password"
                                validate
                                containerClass="mb-0"
                              />
                             
                              <div className="text-center mb-3">
                                <MDBBtn
                                  type="button"
                                  gradient="blue"
                                  rounded
                                  className="btn-block z-depth-1a"
                                >
                                  <button onClick={this.handleFormSubmit}>Sign in</button>
                                </MDBBtn>
                              </div>
                             
                             
                            </MDBCardBody>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                              <p className="font-small grey-text d-flex justify-content-end">
                                Not a member?
                                   <a href="#!" className="blue-text ml-1">
                                  <MDBBtn onClick={this.handleClick} color="primary" size="md">
                                    Sign up
                                  </MDBBtn>
                                </a>
                              </p>
                            </MDBModalFooter>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div key="back">
            <div className="container">
              <div className="row">
                <div className="col">
                  <MDBContainer>
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBCard  style={{width: "500px"}}>
                          <MDBCardBody >
                            <form>
                              <p className="h4 text-center py-4">Sign up</p>
                              <div className="grey-text" id="thisidhere">
                                {/* <MDBInput
                                  value={this.state.username}
                                  name="username"
                                  onChange={this.handleInputChange}
                                  type="text"
                                  label="Your name"
                                  group
                                  type="text"
                                  validate
                                  error="wrong"
                                  success="right"
                                  style={{display: "block"}}
                                /> */}

            
=======
      <div>
        <Nav />

        <div style={{ textAlign: "center" }} >
          <div style={{ display: "inline-block" }}>

            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
              <div key="front">
                <div>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <MDBContainer className="login-container">
                          <MDBRow>
                            <MDBCol md="6">
                              <MDBCard style={{ width: "500px" }}>
                                <MDBCardBody className="mx-4">
                                  <div className="text-center">
                                    <h3 className="dark-grey-text mb-5">
                                      <strong>Sign in</strong>
                                    </h3>
                                  </div>
>>>>>>> 15c92de2275a4933917cd1f391344318b31a1751
                                  <MDBInput
                                    value={this.state.username}
                                    name="username"
                                    onChange={this.handleInputChange}
<<<<<<< HEAD
                                    label="Your name"
                                    icon="envelope"
                                    group
                                    type="text"
=======
                                    type="email"
                                    label="Your email"
>>>>>>> 15c92de2275a4933917cd1f391344318b31a1751
                                    validate
                                    error="wrong"
                                    success="right"
                                  />
                                  <MDBInput
<<<<<<< HEAD
                                  value={this.state.password}
                                  name="password"
                                  onChange={this.handleInputChange}
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    error="wrong"
                                    success="right"
                                  />
                                  <MDBInput
                                  value={this.state.passwordVer}
                                  name="passwordVer"
                                  onChange={this.handleInputChange}
                                    label="Confirm your password"
                                    icon="lock"
                                    group
=======
                                    value={this.state.password}
                                    name="password"
                                    onChange={this.handleInputChange}
>>>>>>> 15c92de2275a4933917cd1f391344318b31a1751
                                    type="password"
                                    label="Your password"
                                    validate
                                    containerClass="mb-0"
                                  />
<<<<<<< HEAD
                                </div>
                                <div className="text-center py-4 mt-3">
                                  <MDBBtn
                                    onClick={this.handleSignup}
                                    color="primary"
                                    size="md"
                                  >
                                    Register
=======

                                  <div className="text-center mb-3">
                                    <MDBBtn
                                      type="button"
                                      gradient="blue"
                                      rounded
                                      className="btn-block z-depth-1a"
                                    >
                                      <button onClick={this.handleFormSubmit}>Sign in</button>
                                    </MDBBtn>
                                  </div>


                                </MDBCardBody>
                                <MDBModalFooter className="mx-5 pt-3 mb-1">
                                  <p className="font-small grey-text d-flex justify-content-end">
                                    Not a member?
                                   <a href="#!" className="blue-text ml-1">
                                      <MDBBtn onClick={this.handleClick} color="primary" size="md">
                                        Sign up
>>>>>>> 15c92de2275a4933917cd1f391344318b31a1751
                                  </MDBBtn>
                                    </a>
                                  </p>
                                </MDBModalFooter>
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                        </MDBContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div key="back">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <MDBContainer>
                        <MDBRow>
                          <MDBCol md="6">
                            <MDBCard style={{ width: "500px" }}>
                              <MDBCardBody >
                                <form>
                                  <p className="h4 text-center py-4">Sign up</p>
                                  <div className="grey-text" id="thisidhere">
                                    <MDBInput

                                      label="Your name"
                                      icon="user"
                                      group
                                      type="text"
                                      validate
                                      error="wrong"
                                      success="right"
                                      style={{ display: "block" }}
                                    />


                                    <MDBInput
                                      label="Your email"
                                      icon="envelope"
                                      group
                                      type="email"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                    <MDBInput
                                      label="Confirm your email"
                                      icon="exclamation-triangle"
                                      group
                                      type="text"
                                      validate
                                      error="wrong"
                                      success="right"
                                    />
                                    <MDBInput
                                      label="Your password"
                                      icon="lock"
                                      group
                                      type="password"
                                      validate
                                    />
                                  </div>
                                  <div className="text-center py-4 mt-3">
                                    <MDBBtn
                                      onClick={this.handleClick}
                                      color="primary"
                                      size="md"
                                    >
                                      Register
                                  </MDBBtn>
                                  </div>
                                </form>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                      <div className="text-md-right"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ReactCardFlip>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Login);
