import React from "react";
import contacts from "./contacts.json";
import ContactCard from "./ContactCard";

class ContactList extends React.Component {

    state = {
        contacts: contacts
    };
    render() {
        return (
            <div>
                {this.state.contacts.map((contact, index) => (
                    <ContactCard
                        key={index}
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        company={contact.company}
                    />

                ))}
            </div>
        );

    }

}


export default ContactList