import React from "react";

function ContactCard(props) {
    return (

        <button style={{marginTop:"20px",fontWeight:"bold"}} onClick={() => props.ViewContact(props.id)} type="button" className="list-group-item list-group-item-action">
            <p> <p style={{fontSize:"24px"}}>{props.firstName} {props.lastName}</p></p>
            <p><p>{props.company}</p></p>
            <hr />
        </button>

    )
}
export default ContactCard