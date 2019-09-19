import React from "react";
import NoteCard from "./NoteCard";
import NewNoteButton from "./NewNoteButton";
import notes from "./notes.json";



class NoteList extends React.Component {
    state = {
        notes: notes
    };

    render() {
        return (
            <div>
                <NewNoteButton />
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


            </div>
        )
    }



}

export default NoteList