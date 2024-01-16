import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import React, { useState, useEffect } from 'react';
import ContactDetail from "./ContactDetail";
import api from "../api/contacts"

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  // const [contacts, setContacts] = useState([]);

  // Retrieve Contact
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const editContactHandler = async (contactID,contact) => {
    console.log(contactID)
    const response = await api.put(`/contacts/${contactID}`,contact);
    const { id, name, email } = response.data;
    console.log("brrrrr")
    console.log(id, name, email)
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact;
      })
    );
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {

    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // Get the data from local storage
  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if(allContacts)
        setContacts(allContacts)
    };
    getAllContacts();
  }, []);


  // Store the data in local storage
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]); //dependency

  return (
    <div className="ui container">
      <Router>
      <Header />
        <Routes>
          {/* <Route 
            path="/" 
            render = {(props) => {
               return <ContactList 
                {...props} 
                contacts={contacts} 
                getContactId={removeContactHandler} 
              />
            }}
          /> */}
          <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetail contact={contacts} /> }/>
          <Route path="/edit/:id" element={<EditContact editContactHandler={editContactHandler} contact={contacts}/>} />
          {/* <Route  
            path="/add" 
            render = {(props) => (
              <AddContact
              {...props}
              addContactHandler={addContactHandler}
              />
            )}
          /> */}
          
          {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
