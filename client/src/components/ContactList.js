import React from 'react';
import API from "../utils/API";
import ContactCard from "./ContactCard";
import { MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBTable } from "mdbreact";
import { MDBJumbotron } from "mdbreact";
import NoteCard from "./NoteCard";
import ReactCardFlip from 'react-card-flip';
import ToggleDisplay from 'react-toggle-display';
import ImageUpload from './AddNoteBtn';
import Nav from "./Nav/Nav";
import Sidebar from "react-sidebar";
import "./ContactListStyle.css"

const mql = window.matchMedia(`(min-width: 800px)`);
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
      show: false,
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
      interest: "",
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      IsContactListOpen: true,
      noteTitle: "",
      noteBody: "",
      noteId: "",
      createdOn: Date.now,
      username: ""
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }



  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    this.setState(oldState => ({ IsContactListOpen: !oldState.IsContactListOpen }));
  }


  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  handleClickNote() {
    this.setState({
      show: !this.state.show
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  componentDidMount() {
    this.loadContacts();
    this.setState({ username: localStorage.getItem("username") })
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

        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));


        API.getContacts()
          .then(res => {
            console.log(res.data)
            this.setState({ contacts: res.data })
            this.setState({ contact: contactData })

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


  saveNote = () => {
    const noteData = {
      noteTitle: this.state.noteTitle,
      noteBody: this.state.noteBody,
      createdOn: this.state.createdOn
    }

    if (this.state.noteId === "") {

      API.saveNote(noteData).then(res => {
        this.setState({
          show: !this.state.show
        });

        API.updateContactFromNote(this.state.currentObjectId, res.data._id).then(res => {
          API.getContact(res.data._id).then(res => {
            console.log(res.data)
            this.setState({ contact: res.data })
            this.setState({ notes: res.data.notes })
            this.setState({ currentNotes: res.data.notes })
            this.setState({ noteTitle: "", noteBody: "", createdOn: Date.now, noteId: "" })

          })
        })
      })


    } else {
      API.updateNote(this.state.noteId, noteData).then(res => {
        this.setState({ show: !this.state.show })
        API.getContact(this.state.currentObjectId).then(res => {
          console.log(res.data)
          this.setState({ contact: res.data })
          this.setState({ notes: res.data.notes })
          this.setState({ currentNotes: res.data.notes })
          this.setState({ noteTitle: "", noteBody: "", createdOn: Date.now, noteId: "" })


        })
      })
    }
  }

  setConvertedTextState = text => {
    this.setState({ noteBody: text })
  }

  deleteNote = (id) => {
    API.deleteNote(id).then(res => {
      API.getContact(this.state.currentObjectId).then(res => {
        this.setState({ contact: res.data })
        this.setState({ notes: res.data.notes })
        this.setState({ currentNotes: res.data.notes })
      })

    })
  }


  editNote = (id, body, title, date) => {
    console.log(date)
    this.setState({
      show: !this.state.show,
      noteId: id,
      noteTitle: title,
      noteBody: body,
      createdOn: date
    });
  }

  render() {
    return (
      <Sidebar
        sidebar={<b >

          {/* content inside bar */}
          <button style={{ margin: "10px 5px 1px 30px " }, { fontSize: "20px" }} onClick={this.addContact} name="addContact" type="button" className="btn btn-primary">Add contact</button>
          <div className="list-group">
            {this.state.contacts.map((contact, index) => (
              <ContactCard
                ViewContact={this.ViewContact}
                key={index}
                id={index}
                firstName={contact.firstName}
                lastName={contact.lastName}
                company={contact.company}
              />
            ))}
          </div>

        </b>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}

      >
        {/* main content next to side bar */}
        <b>
          <Nav />
          <div className="App" >

            <div className={this.state.IsContactListOpen ? "hidden" : "open"}>
              <button
                onClick={() => this.onSetSidebarOpen(true)} name="addContact" type="button" className="btn btn-primary">Open Contacts</button>
            </div>
            <p className="App-intro"></p>
            <ToggleDisplay show={this.state.show}>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <form>
                      <div class="form-group">
                        <label for="exampleFormControlInput1"></label>
                        <MDBInput type="date" name="createdOn" value={this.state.createdOn} onChange={this.handleInputChange} label="Date" outline />

                        <label for="exampleFormControlInput1"></label>
                        <MDBInput type="textarea" value={this.state.noteTitle} name="noteTitle" onChange={this.handleInputChange} label="Note Title" outline />

                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlSelect1">ImageUpload</label>
                        <ImageUpload setConvertedTextState={this.setConvertedTextState} />
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlSelect2"></label>
                        <MDBInput type="textarea" value={this.state.noteBody} name="noteBody" onChange={this.handleInputChange} label="Note Body" outline />
                      </div>
                      <button onClick={() => this.saveNote()} name="addNote" type="button" className="btn btn-primary">Save</button>
                    </form>
                  </div>
                </div>
              </div>
            </ToggleDisplay>
            <ToggleDisplay if={!this.state.show} tag="section">
              <div>
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                  <div key="front">
                    <div>
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <MDBJumbotron fluid>
                              <div className="container">
                                <div calssName="row" style={{ float: "right" }} >
                                  <MDBBtn onClick={this.editContact} color="primary" size="md">
                                    Edit Contact </MDBBtn>
                                  <MDBBtn onClick={this.deleteContact} color="primary" size="md">
                                    Delete Contact</MDBBtn>
                                </div>
                                <div className="row" >
                                  <h2 style={{ margin: "0px 0 0 20px" }} className="h1-responsive font-weight-bold text-center my-5">
                                    {this.state.contact.firstName} {this.state.contact.lastName}
                                  </h2>
                                </div>
                              </div>
                              <MDBRow>
                                <MDBCol md="9" className="md-0 mb-5 ">
                                  <form>
                                    <MDBRow>
                                      <MDBCol md="6 ">
                                        <h4 id="company-name" className="h4-responsive font-weight-bold my-1">
                                          Company: {this.state.contact.company}
                                        </h4>
                                      </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                      <MDBCol>
                                        <div className="mb-0">
                                          <button style={{ marginLeft: "20px" }} onClick={() => this.handleClickNote()} name="addContact" type="button" className="btn btn-primary">Add Note</button>
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
                                                id={note._id}
                                                noteTitle={note.noteTitle}
                                                noteBody={note.noteBody}
                                                createdOn={note.createdOn}
                                                deleteNote={this.deleteNote}
                                                editNote={this.editNote}
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
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </ReactCardFlip>
              </div>
            </ToggleDisplay>
          </div>
        </b>
      </Sidebar>
    );
  };
}
export default ContactList
