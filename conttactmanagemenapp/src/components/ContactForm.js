import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ContactForm = ({ contact, onSubmit }) => {
  const [formData, setFormData] = useState(contact || { name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'Contact List',
      icon: 'pi pi-list',
      command: () => navigate('/')
    }
  ];

  const startContent = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-book" style={{ fontSize: '1.5rem' }}></i>
      <span className="font-bold text-xl">Contact Management System</span>
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    if (!formData.name || !formData.email || !formData.phone) {
      toast.current.show({
        severity: 'warn',
        summary: 'Missing Information',
        detail: 'Please fill all required fields',
        life: 3000
      });
      return;
    }

    try {
      await onSubmit(formData);
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Contact saved successfully!',
        life: 3000
      });

      if (!contact) {
        setFormData({ name: '', email: '', phone: '' });
        setSubmitted(false);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to submit contact', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save contact. Please try again.',
        life: 5000
      });
    }
  };

  const isInvalid = (field) => {
    return submitted && !formData[field];
  };

  const header = (
    <div className="flex justify-content-between align-items-center">
      <h1 className="text-2xl font-bold">
        {contact ? 'Edit Contact' : 'Create New Contact'}
      </h1>
      <Button
        label="Back to Contacts"
        icon="pi pi-arrow-left"
        className="p-button-text"
        onClick={() => navigate('/')}
      />
    </div>
  );

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
        <Card header={header} className="shadow-1">
          <Toast ref={toast} position="top-center" />

          <div className="p-fluid grid formgrid">
            <div className="field col-12 mb-4">
              <label htmlFor="name" className="font-medium block mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={classNames({ 'p-invalid': isInvalid('name') })}
              />
              {isInvalid('name') && <small className="p-error">Name is required</small>}
            </div>

            <div className="field col-12 mb-4">
              <label htmlFor="email" className="font-medium block mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={classNames({ 'p-invalid': isInvalid('email') })}
              />
              {isInvalid('email') && <small className="p-error">Email is required</small>}
            </div>

            <div className="field col-12 mb-6">
              <label htmlFor="phone" className="font-medium block mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <InputText
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={classNames({ 'p-invalid': isInvalid('phone') })}
              />
              {isInvalid('phone') && <small className="p-error">Phone is required</small>}
            </div>
          </div>

          <div className="flex justify-content-end gap-3 mt-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => navigate('/')}
            />
            <Button
              label={contact ? 'Update Contact' : 'Create Contact'}
              icon="pi pi-check"
              className="p-button-success"
              onClick={handleSubmit}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactForm;