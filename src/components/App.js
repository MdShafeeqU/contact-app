import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import React, { useState, useEffect } from 'react';
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  // const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // Get the data from local storage
  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
    console.log("here too");
  }, []);

  // Store the data in local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    console.log("here");
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
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts} /> }/>
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
