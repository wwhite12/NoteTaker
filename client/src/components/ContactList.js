import React from "react";
import API from "../utils/API";
//import contacts from "./contacts.json";
import ContactCard from "./ContactCard";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBTable } from "mdbreact";
import { MDBJumbotron } from "mdbreact";
import NoteCard from "./NoteCard";
import NewNoteButton from "./NewNoteButton";
import ReactCardFlip from 'react-card-flip';


class ContactList extends React.Component {

  constructor() {
    super();
    this.state = {
      contacts: [],
      notes: [],
      contact: [],
      isFlipped: false,
      currentObjectId: "",
      currentNotes: [],
      firstName: "",
      lastName: "",
      company: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
      email: "",
      phone: "",
      interest: ""
    };


  }



  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    API.getContacts()
      .then(res => {
        console.log(res.data)
        this.setState({ contacts: res.data })
        this.setState({ contact: res.data[0] })
        this.setState({
          firstName: res.data[0]["firstName"],
          lastName: res.data[0]["lastName"],
          company: res.data[0]["company"],
          streetAddress: res.data[0]["streetAddress"],
          city: res.data[0]["city"],
          state: res.data[0]["state"],
          zip: res.data[0]["zip"],
          country: res.data[0]["country"],
          email: res.data[0]["email"],
          phone: res.data[0]["phone"],
          interest: res.data[0]["interest"],
          notes: res.data[0]["notes"],
          currentNotes: res.data[0]["notes"],
          currentObjectId: res.data[0]["_id"]
        });
        console.log(this.state.currentObjectId)
      }

      )

      .catch(err => console.log(err));

  }


  addContact = (e) => {
    e.preventDefault();
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
      interest: "",
      currentObjectId: ""
    });
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));


  }



  ViewContact = key => {
    const id = this.state.contacts[key]["_id"]
    this.setState({ contact: this.state.contacts[key] })
    this.setState({ currentObjectId: id })
    API.getContact(id).then(res => {
      console.log(res.data)
      this.setState({
        firstName: res.data["firstName"],
        lastName: res.data["lastName"],
        company: res.data["company"],
        streetAddress: res.data["streetAddress"],
        city: res.data["city"],
        state: res.data["state"],
        zip: res.data["zip"],
        notes: res.data["notes"],
        country: res.data["country"],
        email: res.data["email"],
        phone: res.data["phone"],
        interest: res.data["interest"],
        currentNotes: res.data["notes"]
      })

    })
  }

  handleInputChange = event => {
    const { value, name } = event.target;

    this.setState({
      [name]: value

    });

  };

  saveContact = event => {

    if (this.state.currentObjectId === "") {
      const contactData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        company: this.state.company,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        country: this.state.country,
        email: this.state.email,
        phone: this.state.phone,
        interest: this.state.interest

      }
      API.saveContact(contactData).then(res => {
        console.log(res.data)
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        this.setState({ contact: res.data })
        this.setState({
          firstName: res.data["firstName"],
          lastName: res.data["lastName"],
          company: res.data["company"],
          streetAddress: res.data["streetAddress"],
          city: res.data["city"],
          state: res.data["state"],
          zip: res.data["zip"],
          notes: [],
          country: res.data["country"],
          email: res.data["email"],
          phone: res.data["phone"],
          interest: res.data["interest"],
          currentObjectId: res.data["_id"],
          notes: res.data["notes"],
          currentNotes: res.data["notes"]
        })

        API.getContacts()
          .then(res => {
            console.log(res.data)
            this.setState({ contacts: res.data })
          })
          .catch(err => console.log(err));

      });

    } else {
      const contactData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        company: this.state.company,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        country: this.state.country,
        email: this.state.email,
        phone: this.state.phone,
        interest: this.state.interest
      }
      const id = this.state.currentObjectId;
      console.log(id)

      API.updateContact(id, contactData).then(res => {
        console.log(res.data)
        this.setState({
          firstName: res.data["firstName"],
          lastName: res.data["lastName"],
          company: res.data["company"],
          streetAddress: res.data["streetAddress"],
          city: res.data["city"],
          state: res.data["state"],
          zip: res.data["zip"],
          country: res.data["country"],
          email: res.data["email"],
          phone: res.data["phone"],
          interest: res.data["interest"],
          notes: res.data["notes"],
          currentNotes: res.data["notes"]
        })

        this.setState({ contact: res.data })
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));


        API.getContacts()
          .then(res => {
            console.log(res.data)
            this.setState({ contacts: res.data })
          })
          .catch(err => console.log(err));

      });

    }

  }

  deleteContact = () => {
    const id = this.state.currentObjectId;
    console.log(id);
    API.deleteContact(id).then(() => {
      this.setState({
        firstName: "",
        lastName: "",
        company: "",
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        notes: [],
        country: "",
        email: "",
        phone: "",
        interest: ""
      })
      this.setState({ contact: [] })


    });
    API.getContacts()
      .then(res => {
        console.log(res.data)
        let previous = res.data.length - 1;
        console.log(previous)
        this.setState({ contact: res.data[previous] })
        this.setState({ contacts: res.data })
        this.setState({
          firstName: res.data[previous]["firstName"],
          lastName: res.data[previous]["lastName"],
          company: res.data[previous]["company"],
          streetAddress: res.data[previous]["streetAddress"],
          city: res.data[previous]["city"],
          state: res.data[previous]["state"],
          zip: res.data[previous]["zip"],
          notes: res.data[previous]["notes"],
          country: res.data[previous]["country"],
          email: res.data[previous]["email"],
          phone: res.data[previous]["phone"],
          interest: res.data[previous]["interest"],
          currentNotes: res.data[previous]["notes"]
        })
        this.setState({ currentObjectId: res.data[previous]["_id"] })


      }
      )

      .catch(err => console.log(err));

  }


  editContact = () => {
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));


  }


  render() {

    return (

      <div>
        <div className="sidebar" style={{ marginTop: "6%" }}>
          <button onClick={this.addContact} name="addContact" type="button" className="btn btn-primary">Add contact</button>
          <MDBTable scrollY maxHeight="100%" style={{ marginTop: "0px" }}>
            <div className="list-group">
              {this.state.contacts.map((contact, index) => (
                <ContactCard
                  ViewContact={this.ViewContact}
                  key={index}
                  id={index}
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  company={contact.company}
                  avatar={contact.avatar}
                />
              ))}
            </div>
          </MDBTable>
        </div>

        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
          <div key="front">
            <div>
              <div className="container">
                <div className="row">
                  <div className="col">

                    <MDBJumbotron fluid>
                      <div className="text-md-right">

                        <MDBBtn onClick={this.editContact} color="primary" size="md">
                          Edit Contact
                  </MDBBtn>
                        <MDBBtn onClick={this.deleteContact} color="primary" size="md">
                          Delete Contact
                  </MDBBtn>
                      </div>
                      <h2 className="h1-responsive font-weight-bold text-center my-5">
                        {this.state.contact.firstName} {this.state.contact.lastName}
                      </h2>
                      <MDBRow>
                        <MDBCol md="9" className="md-0 mb-5 ">
                          <form>
                            <MDBRow>
                              <MDBCol md="6 ">
                                <h4 id="company-name" className="h4-responsive font-weight-bold my-1">
                                  {this.state.contact.company}
                                </h4>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow>
                              <MDBCol>
                                <div className="md-form mb-0">
                                  <NewNoteButton />
                                </div>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow>
                              <MDBCol id="notes-list" md="12">
                                <div className="md-form mb-0">
                                  <MDBTable bordered scrollY maxHeight="300px">
                                    {this.state.currentNotes.map((note, index) => (
                                      <NoteCard
                                        key={index}
                                        id={note.id}
                                        title={note.title}
                                        noteBody={note.noteBody}
                                        createdOn={note.createdOn}
                                        contactRef={note.contactReg}
                                      />
                                    ))}
                                  </MDBTable>
                                </div>
                              </MDBCol>
                            </MDBRow>
                          </form>
                        </MDBCol>
                        <MDBCol id="customer-information" md="3" className="text-center">
                          <ul className="list-unstyled mb-0">
                            <li>
                              <MDBIcon icon="map-marker-alt" size="2x" className="blue-text" />
                              <p>
                                {this.state.contact.streetAddress + ", "}
                                {this.state.contact.city + ", "}
                                {this.state.contact.state + ", "}
                                {this.state.contact.zip + " "}
                                {this.state.contact.country}

                              </p>
                            </li>
                            <li>
                              <MDBIcon icon="phone" size="2x" className="blue-text mt-4" />
                              <p>{this.state.contact.phone}</p>
                            </li>
                            <li>
                              <MDBIcon icon="envelope" size="2x" className="blue-text mt-4" />
                              <p>{this.state.contact.email}</p>
                            </li>
                          </ul>
                        </MDBCol>
                      </MDBRow>
                    </MDBJumbotron>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div key="back">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="text-md-right">
                    <MDBBtn onClick={this.saveContact} color="primary" size="md">
                      Save
                    </MDBBtn>
                  </div>
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-first-name">First Name</label>
                        <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleInputChange} className="form-control" />

                      </div>
                      <div className="form-group col-md-6">
                        <label for="input-last-name">Last Name</label>
                        <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleInputChange} className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label for="input-last-name">Company</label>
                        <input type="text" value={this.state.company} name="company" onChange={this.handleInputChange} className="form-control" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="input-address"> Street Address</label>
                      <input type="text" value={this.state.streetAddress} name="streetAddress" onChange={this.handleInputChange} className="form-control" />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-city">City</label>
                        <input type="text" value={this.state.city} name="city" onChange={this.handleInputChange} className="form-control" />
                      </div>
                      <div className="form-group col-md-4">
                        <label for="input-state">State</label>
                        <input type="text" value={this.state.state} name="state" onChange={this.handleInputChange} className="form-control" />
                      </div>
                      <div className="form-group col-md-2">
                        <label for="input-zip">Zip</label>
                        <input type="text" value={this.state.zip} name="zip" onChange={this.handleInputChange} className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-email">Email</label>
                        <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} className="form-control" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="input-phone">Phone Number</label>
                        <input type="text" value={this.state.phone} name="phone" onChange={this.handleInputChange} className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-interest">Personal Interest</label>
                        <input type="text" value={this.state.interest} name="interest" onChange={this.handleInputChange} className="form-control" />
                      </div>
                      {/* <div className="form-group col-md-6">
                        <label for="avatar">Avatar</label>
                        <input value={this.state.contact.avatar} type="text" className="form-control" />
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>
      </div >
    );
  };


}
export default ContactList
