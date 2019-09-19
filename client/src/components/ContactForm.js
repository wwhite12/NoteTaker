import React from "react"


class ContactForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    company: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    phone: "",
    interest: ""
  };


  handleInputChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value

    });

  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.firstName || !this.state.lastName) {
      alert("Fill out your first and last name please!");
    } else {
      alert("Contact Saved");
    }

    this.setState({
      firstName: "",
      lastName: "",
      company: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      email: "",
      phone: "",
      interest: ""
    });

  }

  render() {

    return (

      <div>
        <form className="form">
          <input
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="First"
          />
          <input
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Last"
          />
          <input
            value={this.state.company}
            name="company"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Company"
          />
          <input
            value={this.state.streetAddress}
            name="streetAddress"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Street Address"
          />
          <input
            value={this.state.city}
            name="city"
            onChange={this.handleInputChange}
            type="text"
            placeholder="City"
          />
          <input
            value={this.state.state}
            name="state"
            onChange={this.handleInputChange}
            type="state"
            placeholder="State"
          />
          <input
            value={this.state.zip}
            name="zip"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Zip"
          />
          <input
            value={this.state.country}
            name="country"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Country"
          />
          <input
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="email"
            placeholder="Email"
          />
          <input
            value={this.state.phone}
            name="phone"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Phone"
          />
          <input
            value={this.state.interest}
            name="interest"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Personal Interest"
          />

          <button onClick={this.handleFormSubmit}>Save Contact</button>
        </form>
      </div>




    )

  }
}






export default ContactForm