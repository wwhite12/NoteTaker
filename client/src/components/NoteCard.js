import React from "react";


function NoteCard(props) {
    return (
        <div className="card mb-3" style={{maxWidth: "540px"}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/150C/O https://placeholder.com/" className="card-img" alt="..."/>
                     </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.title}</h5>
                            <p className="card-text">{props.noteBody}</p>
                            <p className="card-text"><small className="text-muted">{props.createdOn}</small></p>
                            <button type="button" className="btn btn-primary">Primary</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        
        
        
        
        export default NoteCard
