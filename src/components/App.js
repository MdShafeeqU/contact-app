import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import React, { useState,useEffect } from 'react';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  
  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts,contact]);
  };
  
  // Store the data in local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]); //dependency

  // Get the data from local storage
  useEffect(() => {
    localStorage.getItem(LOCAL_STORAGE_KEY);
  },[contacts]);

  return (
    <div className="ui container">
      <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;
