import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ContactList = ({ contacts }) => {
  const navigate = useNavigate();

  const actionBodyTemplate = (rowData) => (
    <Button
      label="View"
      className="p-button-text"
      onClick={() => navigate(`/contacts/${rowData.id}`)}
    />
  );

  return (
    <div className="p-m-4">
      <h1>Contact List</h1>
      <DataTable value={contacts} responsiveLayout="scroll" emptyMessage="No contacts found. Click 'Add New Contact' to start.">
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="phone" header="Phone" sortable />
        <Column body={actionBodyTemplate} header="Actions" />
      </DataTable>
      <Button
        label="Add New Contact"
        className="p-button-primary p-mt-2"
        onClick={() => navigate('/add')}
      />
    </div>
  );
};

export default ContactList;