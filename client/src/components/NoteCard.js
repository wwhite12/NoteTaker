import React from "react";



function NoteCard(props) {

    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={props.image || "https://via.placeholder.com/150C/O"} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">

                        <p className="card-text"><small className="text-muted">{props.createdOn}</small></p>
                        <h5 className="card-title">{props.noteTitle}</h5>
                        <p className="card-text">{props.noteBody}</p>
                        <button type="button" className="btn btn-primary btn-sm" value={props.id} onClick={() => props.editNote(props.id, props.noteBody, props.noteTitle, props.createdOn)}>Edit</button>
                        <button type="button" className="btn btn-primary btn-sm" value={props.id} onClick={() => props.deleteNote(props.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div >
    )
}




export default NoteCard
