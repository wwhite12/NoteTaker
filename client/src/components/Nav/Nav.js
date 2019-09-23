import React from "react";
import "./style.css";


class Nav extends React.Component {

  state = {
    username: ""
  };


  
  render () {

  return (
    <div>
      <img src="#" alt="Logo" height="40px" width="200px"></img>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link active" href="/api/">Logged in as: {this.state.username}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Log Out</a>
        </li>
      </ul>
    </div>

  )

}
}
export default Nav;