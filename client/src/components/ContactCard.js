import React from "react";

function ContactCard (props) {
    return (
        <>
        <ul>
        <button>-></button>
            <li>{props.firstName} {props.lastName}</li>
            <li>{props.company}</li>
        <button>Edit</button>
        </ul>
        <hr/>

        </>

        
    )



}




export default ContactCard