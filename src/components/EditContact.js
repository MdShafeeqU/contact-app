import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditContactForm = ({ editContactHandler, contact }) => {
    const [state, setState] = useState({
        name: contact.name,
        email: contact.email
    });
    // const state = {
    //     name: "",
    //     email:""
    // }
    const { id } = useParams();

    // const cont = props.contacts.find((c) => c.id === id);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const update = (e) => {
        e.preventDefault();
        console.log(state.email)
        console.log(state.name)
        if (state.name === "" || state.email === "") {
            alert("Fill all fields!");
            return;
        }
        console.log("this state")
        console.log(state)
        editContactHandler(id, state);
        setState({ name: "", email: "" });
        navigate('/');
    };

    // useEffect(() => {
    //     setState({ name: contact.name, email: contact.email });
    // }, [contact]);

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" value={state.name} onChange={handleInputChange} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={state.email} onChange={handleInputChange} />
                </div>
                <button className="ui button blue">Update</button>
                <Link to="/">
                    <button className="ui button blue">View Contact List</button>
                </Link>
            </form>
        </div>
    );
}

class EditContact extends React.Component {
    // constructor(props) {
    //     super(props)
    //     console.log(props);
    //     const {id,name,email} = props.state.contact;
    //     this.state = {
    //         id: id,
    //         name: name,
    //         email: email,
    //     }
    // }
    render() {
        return <EditContactForm editContactHandler={this.props.editContactHandler} contact={this.props.contact} />;
  }
}
  

export default EditContact;