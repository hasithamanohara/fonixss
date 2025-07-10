import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import ContactForm from './ContactForm';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ContactDetails = ({ contacts, onUpdate, onDelete }) => {
  const { id } = useParams();
  const contact = contacts.find((c) => c?.id?.toString() === id);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useRef(null);

  const menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'Add Contact',
      icon: 'pi pi-user-plus',
      command: () => navigate('/add')
    }
  ];

  const startContent = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-book" style={{ fontSize: '1.5rem' }}></i>
      <span className="font-bold text-xl">Contact Management System</span>
    </div>
  );

  const confirmDelete = () => {
    confirmDialog({
      message: `Are you sure you want to delete ${contact.name}'s contact? This action cannot be undone.`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await onDelete(contact._id);
          toast.current.show({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Contact has been deleted',
            life: 3000
          });
          setTimeout(() => navigate('/'), 1000);
        } catch (error) {
          toast.current.show({
            severity: 'error',
            summary: 'Delete Failed',
            detail: 'Could not delete contact',
            life: 5000
          });
        }
      }
    });
  };

  if (!contact) {
    return (
      <div className="min-h-screen">
        <Menubar
          model={menuItems}
          start={startContent}
          className="p-3 shadow-3 mb-4 bg-primary-reverse"
          style={{
            borderRadius: 0,
            border: 'none',
            borderBottom: '1px solid #dee2e6'
          }}
        />

        <div className="p-4 lg:p-8 max-w-3xl mx-auto">
          <Card className="shadow-1">
            <h2 className="text-2xl font-bold mb-4">Contact Not Found</h2>
            <p className="mb-4">The requested contact does not exist or has been removed.</p>
            <Button
              label="Back to Contacts"
              icon="pi pi-arrow-left"
              className="p-button-text"
              onClick={() => navigate('/')}
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Menubar
        model={menuItems}
        start={startContent}
        className="p-3 shadow-3 mb-4 bg-primary-reverse"
        style={{
          borderRadius: 0,
          border: 'none',
          borderBottom: '1px solid #dee2e6'
        }}
      />

      <div className="p-4 lg:p-8 max-w-3xl mx-auto">
        <Toast ref={toast} position="top-center" />

        {isEditing ? (
          <Card className="shadow-1 mb-4">
            <div className="flex justify-content-between align-items-center mb-4">
              <h1 className="text-2xl font-bold">Edit Contact</h1>
              <Button
                label="Cancel Edit"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => setIsEditing(false)}
              />
            </div>
            <ContactForm
              contact={contact}
              onSubmit={async (updatedContact) => {
                try {
                  const updated = { ...updatedContact, id: contact._id };
                  await onUpdate(updated);
                  setIsEditing(false);
                  toast.current.show({
                    severity: 'success',
                    summary: 'Updated',
                    detail: 'Contact updated successfully',
                    life: 3000
                  });
                } catch (error) {
                  toast.current.show({
                    severity: 'error',
                    summary: 'Update Failed',
                    detail: 'Failed to update contact',
                    life: 5000
                  });
                }
              }}
            />
          </Card>
        ) : (
          <Card className="shadow-1">
            <div className="flex flex-wrap justify-content-between align-items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{contact.name}</h1>
                <Tag
                  value="Active Contact"
                  icon="pi pi-check"
                  severity="success"
                  className="text-sm"
                />
              </div>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-outlined"
                  onClick={() => setIsEditing(true)}
                  tooltip="Edit contact"
                  tooltipOptions={{ position: 'bottom' }}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-outlined p-button-danger"
                  onClick={confirmDelete}
                  tooltip="Delete contact"
                  tooltipOptions={{ position: 'bottom' }}
                />
              </div>
            </div>

            <div className="grid">
              <div className="col-12 md:col-6">
                <div className="mb-5">
                  <h3 className="text-500 font-medium mb-1">Email Address</h3>
                  <div className="flex align-items-center gap-2">
                    <i className="pi pi-envelope text-500"></i>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-900 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12 md:col-6">
                <div className="mb-5">
                  <h3 className="text-500 font-medium mb-1">Phone Number</h3>
                  <div className="flex align-items-center gap-2">
                    <i className="pi pi-phone text-500"></i>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-900 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-content-between mt-6 pt-4 border-top-1 surface-border">
              <Button
                label="Back to Contacts"
                icon="pi pi-arrow-left"
                className="p-button-text"
                onClick={() => navigate('/')}
              />
              <div className="flex gap-2">
                <Button
                  label="Edit Contact"
                  icon="pi pi-pencil"
                  className="p-button-outlined"
                  onClick={() => setIsEditing(true)}
                />
                <Button
                  label="Delete Contact"
                  icon="pi pi-trash"
                  className="p-button-outlined p-button-danger"
                  onClick={confirmDelete}
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;