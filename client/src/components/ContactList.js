import React from "react";
import API from "../utils/API";
//import contacts from "./contacts.json";
import ContactCard from "./ContactCard";
//import { MDBTable} from 'mdbreact';
//import NoteList from "./NoteList.js";
import APP from "../App.js"






import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBTable } from "mdbreact";
import { MDBJumbotron } from "mdbreact";
import NoteCard from "./NoteCard";
import NewNoteButton from "./NewNoteButton";

class ContactList extends React.Component {
  state = {
    contacts: [],
    contact: [],
    currentObjectId: ""


  };



  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    API.getContacts()
      .then(res => {
        this.setState({ contacts: res.data })
        this.setState({ contact: res.data[0] })

        console.log(res)

      }

      )


      .catch(err => console.log(err));

  }

  ViewContact = key => {
    const contact = this.state.contacts[key];
    const id = this.state.contacts[key]["_id"]
    this.setState({ contact })
    this.setState({ currentObjectId: id })
    API.getContact(id).then(res => {
      console.log(res.data.notes)
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


        <div className="container">
          <div className="row">
            <div className="col">

              <MDBJumbotron fluid>
                <div className="text-md-right">
                  <MDBBtn color="primary" size="md">
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
                          <div className="md-form mb-0 ">
                            <p><u>{this.state.contact.company}</u></p>
                          </div>
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
                        <MDBCol md="12">
                        </MDBCol>
                      </MDBRow>
                    </form>
                  </MDBCol>
                  <MDBCol md="3" className="text-center">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <MDBIcon icon="map-marker-alt" size="2x" className="blue-text" />
                        <p>
                          {this.state.contact.streetAddress} {this.state.contact.city}{this.state.contact.state} {this.state.contact.zip} {this.state.contact.country}

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

              }








            </div>
          </div>
        </div>


      </div>


    );

  }

}
export default ContactList







