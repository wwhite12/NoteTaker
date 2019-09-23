import React from "react";

function ContactCard(props) {
    return (

        <button onClick={() => props.ViewContact(props.id)} type="button" class="list-group-item list-group-item-action">
            <img src={props.avatar} className="rounded-circle" alt="Avatar" width="50" height="50"></img>
            <p>{props.firstName} {props.lastName}</p>
            <p>{props.company}</p>
            <hr />
        </button>

    )
}
export default ContactCard