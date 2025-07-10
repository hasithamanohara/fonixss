import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetail';
import ContactForm from './components/ContactForm';
import { getContacts, createContact, updateContact, deleteContact } from './api/ApiCalls';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contacts', error);
      }
    };
    loadContacts();
  }, []);

  const handleAddContact = async (contact) => {
    console.log("***");
    try {
      console.log("***");
      const response = await createContact(contact);
      console.log(contact);
      setContacts([...contacts, response]);
    } catch (error) {
      console.error('Failed to add contact', error);
      console.log(error);
    }
  };


  const handleUpdateContact = async (contact) => {
    console.log(contact);
    console.log("**************");
    console.log(contact.id);
    try {
      await updateContact(contact.id, contact);
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
    } catch (error) {
      console.error('Failed to update contact', error);
    }
  };


  const handleDeleteContact = async (id) => {
    try {
      console.log(id);
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Failed to delete contact', error);
    }
  };

  return (
    <Router>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Routes>
        <Route path="/" element={<ContactList contacts={contacts} />} />
        <Route path="/contacts/:_id" element={<ContactDetails contacts={contacts} onUpdate={handleUpdateContact} onDelete={handleDeleteContact} />} />
        <Route path="/add" element={<ContactForm onSubmit={handleAddContact} />} />
      </Routes>
    </Router>
  );
};

export default App;
