import React from "react";


function NoteCard(props) {
    return (
        <>
            <ul>
                <li>{props.title}</li>
                <li>{props.createdOn}</li>
                <li>{props.noteBody}</li>
                <button>Edit</button>
            </ul>
            <hr />

        </>


    )



}




export default NoteCard
