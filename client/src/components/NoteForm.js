import React from "react";


class NoteForm extends React.Component {
    state = {
        noteTitle: "",
        noteBody: ""
    };

    handleInputChange = event => {
        const { value, name } = event.target;

        this.setState({
            [name]: value

        });

    };


    handleFormSubmit = event => {
        event.preventDefault();
        if (!this.state.noteTitle) {
            alert("Please add Note Title");
        } else {
            alert("Note Saved");
        }

        this.setState({
            noteTitle: "",
            noteBody: ""
        });

    }

    render() {
        return (
            <div>
                <form className="form">
                    <input
                        value={this.state.noteTitle}
                        name="noteTitle"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Note Title"
                    />
                    <button onClick={this.handleFormSubmit}>+ Transcribe Your Field Note</button>

                    <input
                        value={this.state.noteBody}
                        name="noteBody"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Type Your Notes"
                    />
                    <button onClick={this.handleFormSubmit}>Save Note</button>

                </form>
            </div>


        )
    }


}

export default NoteForm
