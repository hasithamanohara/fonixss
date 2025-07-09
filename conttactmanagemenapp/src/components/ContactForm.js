import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ contact, onSubmit }) => {
  const [formData, setFormData] = useState(contact || { name: '', email: '', phone: '' });
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.name && formData.email && formData.phone) {
      try {
        await onSubmit(formData);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Contact saved' });
        if (!contact) navigate('/');
      } catch (error) {
        console.error('Failed to submit contact', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to save contact' });
      }
    } else {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please fill all fields' });
    }
  };

  return (
    <div className="p-fluid">
      <Toast ref={toast} />
      <div className="p-field">
        <label htmlFor="name">Name</label>
        <InputText id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="p-field">
        <label htmlFor="email">Email</label>
        <InputText id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="p-field">
        <label htmlFor="phone">Phone</label>
        <InputText id="phone" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <Button label="Save" onClick={handleSubmit} />
    </div>
  );
};

export default ContactForm;