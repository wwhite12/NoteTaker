import React from "react";

function ContactCard(props) {
    return (

        <button style={{ marginTop: "20px", fontWeight: "bold" }} onClick={() => props.ViewContact(props.id)} type="button" className="list-group-item list-group-item-action">
            <p style={{ fontSize: "24px" }}>{props.firstName} {props.lastName}</p>
            <p>{props.company}</p>
            <hr />
        </button>

    )
}
export default ContactCard