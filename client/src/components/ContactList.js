import React from "react";
import API from "../utils/API";
//import contacts from "./contacts.json";
import ContactCard from "./ContactCard";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBTable } from "mdbreact";
import { MDBJumbotron } from "mdbreact";
import NoteCard from "./NoteCard";
import NewNoteButton from "./NewNoteButton";
import notes from "./notes.json";
import ReactCardFlip from 'react-card-flip';


class ContactList extends React.Component {

  constructor() {
    super();
    this.state = {
      contacts: [],
      notes,
      contact: [],
      isFlipped: false,
      currentObjectId: "",
      currentNotes: []

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  changeContact = (e, value) => {
    let contacts = [...this.state.contacts];
    let contact = { ...contacts[0] }
    contact.firstName = value;
    contacts[0] = contact;
    this.setState({ contacts });
    this.setState({ contact: contact });
  }


  componentDidMount() {
    this.loadContacts();
    //    ViewContact = id => {
    //      const contact = this.state.contacts[id];
    //      this.setState({ contact })
    //}
  }

  loadContacts = () => {
    API.getContacts()
      .then(res => {
        console.log(res.data)
        this.setState({ contacts: res.data })
        this.setState({ contact: res.data[0] })


      }

      )


      .catch(err => console.log(err));

  }

  ViewContact = key => {
    const contact = this.state.contacts[key];
    const id = this.state.contacts[key]["_id"];
    this.setState({ contact })
    this.setState({ currentObjectId: id })
    API.getContact(id).then(res => {
      const notes = res.data.notes
      this.setState({ currentNotes: notes })
    })
  }




  render() {

    return (

      <div>
        <div className="sidebar" style={{ marginTop: "6%" }}>
          <button type="button" className="btn btn-primary">Add contact</button>
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

                        <MDBBtn onClick={this.handleClick} color="primary" size="md">
                          Edit customer
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
                    <MDBBtn onClick={this.handleClick} color="primary" size="md">
                      Save
                    </MDBBtn>
                  </div>
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-first-name">First Name</label>
                        <input id={this.state.contact.id} value={this.state.contact.firstName} onChange={(e) => this.changeContact(e.target.value)} type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="input-last-name">Last Name</label>
                        <input value={this.state.contact.lastName} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="input-address">Address</label>
                      <input value={this.state.contact.streetAddress} type="text" className="form-control" />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-city">City</label>
                        <input value={this.state.contact.city} type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-4">
                        <label for="input-state">State</label>
                        <input value={this.state.contact.state} type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-2">
                        <label for="input-zip">Zip</label>
                        <input value={this.state.contact.zip} type="text" className="form-control" id="inputZip" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-email">Email</label>
                        <input value={this.state.contact.email} type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="input-phone">Phone Number</label>
                        <input value={this.state.contact.phone} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="input-interest">interest</label>
                        <input value={this.state.contact.interest} type="text" className="form-control" />
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
      </div>
    );
  };


}
export default ContactList
