import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const ContactList = ({ contacts }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => navigate('/')
    }
  ];

  const actionBodyTemplate = (rowData) => (
    <Button
      label="View"
      icon="pi pi-eye"
      className="p-button-outlined p-button-secondary"
      onClick={() => navigate(`/contacts/${rowData.id}`)}
    />
  );

  const startContent = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-book" style={{ fontSize: '1.5rem' }}></i>
      <span className="font-bold text-xl">Contact Management System</span>
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
      
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        <Card className="shadow-1">
          <div className="flex flex-wrap justify-content-between align-items-center mb-4">
            <h1 className="text-3xl font-bold text-900">Contact Directory</h1>
            <Button
              label="Add New Contact"
              icon="pi pi-plus"
              className="p-button-primary"
              onClick={() => navigate('/add')}
            />
          </div>
          
          <DataTable 
            value={contacts} 
            responsiveLayout="scroll"
            emptyMessage="No contacts found."
            className="p-datatable-striped"
            paginator
            rows={8}
            rowsPerPageOptions={[5, 8, 15]}
          >
            <Column field="name" header="Name" sortable style={{ minWidth: '200px' }} />
            <Column field="email" header="Email" sortable style={{ minWidth: '250px' }} />
            <Column field="phone" header="Phone" sortable style={{ minWidth: '180px' }} />
            <Column 
              body={actionBodyTemplate} 
              header="Actions" 
              style={{ width: '120px', textAlign: 'center' }}
            />
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default ContactList;