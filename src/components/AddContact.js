import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContactForm = ({ addContactHandler }) => {
    const [state, setState] = useState({
        name: "",
        email: ""
    });

    const navigate = useNavigate();

    const add = (e) => {
        e.preventDefault();
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
                    <input type="text" name="name" placeholder="Name" value={state.name} onChange={(e) => setState({ name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={state.email} onChange={(e) => setState({ email: e.target.value })} />
                </div>
                <button className="ui button blue">Add</button>
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