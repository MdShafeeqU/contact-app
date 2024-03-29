import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddContactForm = ({ addContactHandler }) => {
    const [state, setState] = useState({
        name: "",
        email: ""
    });
    // const state = {
    //     name: "",
    //     email:""
    // }

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const add = (e) => {
        e.preventDefault();
        console.log(state.email)
        console.log(state.name)
        if (state.name === "" || state.email === "") {
            alert("Fill all fields!");
            return;
        }
        addContactHandler(state);
        setState({ name: "", email: "" });
        navigate('/');
    };
    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" value={state.name} onChange={handleInputChange} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={state.email} onChange={handleInputChange} />
                </div>
                <button className="ui button blue">Add</button>
                <Link to="/">
                    <button className="ui button blue">View Contact List</button>
                </Link>
            </form>
        </div>
    );
}

class AddContact extends React.Component {
    render() {
      return <AddContactForm addContactHandler={this.props.addContactHandler} />;
    }
  }
  

export default AddContact;