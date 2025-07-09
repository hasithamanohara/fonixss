import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import ContactForm from './ContactForm';

const ContactDetails = ({ contacts, onUpdate, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find((c) => c.id.toString() === id);
  const [isEditing, setIsEditing] = useState(false);

  if (!contact) {
    return (
      <div className="p-m-4">
        <h2>Contact not found</h2>
        <Button label="Back to Home" onClick={() => navigate('/')} />
      </div>
    );
  }

  const confirmDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this contact?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await onDelete(id);
        navigate('/');
      },
    });
  };

  return (
    <div className="p-m-4">
      {isEditing ? (
        <ContactForm
          contact={contact}
          onSubmit={async (updatedContact) => {
            await onUpdate(updatedContact);
            setIsEditing(false);
          }}
        />
      ) : (
        <div className="p-card p-p-3">
          <h2>{contact.name}</h2>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <Button label="Edit" onClick={() => setIsEditing(true)} />
          <Button label="Delete" className="p-button-danger p-ml-2" onClick={confirmDelete} />
          <Button label="Back" className="p-button-secondary p-mt-2" onClick={() => navigate('/')} />
        </div>
      )}
    </div>
  );
};

export default ContactDetails;