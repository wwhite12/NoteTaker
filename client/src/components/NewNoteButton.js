import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBTable } from "mdbreact";

function NewNote() {
    return (
        <>
           
           <MDBCol md="6">
                                    <div className="text-center text-md-left">
                                        <MDBBtn color="primary" size="md">
                                            Add Note
                                      </MDBBtn>
                                    </div>
                                </MDBCol>
        </>
    )



}

export default NewNote