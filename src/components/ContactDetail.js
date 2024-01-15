import React from "react";
import user from "../images/user.png"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ContactDetail = (props) => {
    const { id } = useParams();

    const contact = props.contacts.find((c) => c.id === id);

    if (!contact) {
        return <div>Contact not found!</div>;
    }

    const { name, email } = contact;
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
        </div>
    );
}


export default ContactDetail;