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
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch contacts' });
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
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Contact added' });
    } catch (error) {
      console.error('Failed to add contact', error);
      console.log(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed' });
    }
  };

  const handleUpdateContact = async (contact) => {
    try {
      await updateContact(contact);
      setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Contact updated' });
    } catch (error) {
      console.error('Failed to update contact', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update contact' });
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Contact deleted' });
    } catch (error) {
      console.error('Failed to delete contact', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete contact' });
    }
  };

  return (
    <Router>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Routes>
        <Route path="/" element={<ContactList contacts={contacts} />} />
        <Route path="/contacts/:id" element={<ContactDetails contacts={contacts} onUpdate={handleUpdateContact} onDelete={handleDeleteContact} />} />
        <Route path="/add" element={<ContactForm onSubmit={handleAddContact} />} />
      </Routes>
    </Router>
  );
};

export default App;
