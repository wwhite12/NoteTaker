import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter
} from "mdbreact";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";
import "./LoginStyle.css";
import ReactCardFlip from "react-card-flip";

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
  }

  handleInputChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    if (username && password) {
      Auth.logIn(username, password, response => {
        this.context.setUser(response);
        console.log(this.context.response);
        this.props.history.push("/homePage");
      });
    } else {
      alert("Enter username and password");
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "inline-block" }}>
          <ReactCardFlip
            isFlipped={this.state.isFlipped}
            flipDirection="vertical"
          >
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
                                <MDBInput
                                  value={this.state.username}
                                  name="username"
                                  onChange={this.handleInputChange}
                                  type="email"
                                  label="Your email"
                                  group
                                  type="email"
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
                                  group
                                  type="password"
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
                                    <button onClick={this.handleFormSubmit}>
                                      Sign in
                                    </button>
                                  </MDBBtn>
                                </div>
                              </MDBCardBody>
                              <MDBModalFooter className="mx-5 pt-3 mb-1">
                                <p className="font-small grey-text d-flex justify-content-end">
                                  Not a member?
                                  <a href="#!" className="blue-text ml-1">
                                    <MDBBtn
                                      onClick={this.handleClick}
                                      color="primary"
                                      size="md"
                                    >
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
                          <MDBCard style={{ width: "500px" }}>
                            <MDBCardBody>
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
    );
  }
}

export default withRouter(Login);
