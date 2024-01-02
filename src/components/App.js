import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  return (
    <div className="ui container">
      <Header/>
      <AddContact />
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;
