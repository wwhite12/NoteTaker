import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBTable } from "mdbreact";
import { MDBJumbotron } from "mdbreact";
import NoteCard from "./NoteCard";
import NewNoteButton from "./NewNoteButton";
import notes from "./notes.json";


class NoteList extends React.Component {
    constructor(props) {
        super(props);
      
    this.state = {
        notes

    };
}
    render() {
        return (
            <MDBJumbotron fluid>
                <div className="text-md-right">
                    <MDBBtn color="primary" size="md">

                    </MDBBtn>
                </div>
                <h2 className="h1-responsive font-weight-bold text-center my-5">
                   Name
                    </h2>
                <MDBRow>
                    <MDBCol md="9" className="md-0 mb-5 ">
                        <form>
                            <MDBRow>
                                <MDBCol md="6 ">
                                    <div className="md-form mb-0 ">
                                        <p><u>Company name</u></p>
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
                                    <div className="md-form mb-0">
                                        <MDBTable bordered scrollY maxHeight="300px">
                                            {this.state.notes.map((note, index) => (
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
                    <MDBCol md="3" className="text-center">
                        <ul className="list-unstyled mb-0">
                            <li>
                                <MDBIcon icon="map-marker-alt" size="2x" className="blue-text" />
                                <p>San Francisco, CA 94126, USA</p>
                            </li>
                            <li>
                                <MDBIcon icon="phone" size="2x" className="blue-text mt-4" />
                                <p>+ 01 234 567 89</p>
                            </li>
                            <li>
                                <MDBIcon icon="envelope" size="2x" className="blue-text mt-4" />
                                <p>contact@example.com</p>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBJumbotron>
        )
    }
}

export default NoteList


// contenteditable="false"