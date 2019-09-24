import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBTable } from "mdbreact";

function NewNote() {

    const addNoteHandler = () => {
        fetch('/notes/convert', {
            method: 'POST',
            body: {}
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <>

            <MDBCol md="6">

                <div className="text-center text-md-left">
                    <MDBBtn color="primary" size="md" onClick={addNoteHandler}>
                        Add Note
                    </MDBBtn>
                </div>

            </MDBCol>
        </>
    )



}

export default NewNote