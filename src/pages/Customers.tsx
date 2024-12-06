import React, { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { Customer } from '../types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'contactPerson', label: 'Contact Person', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 130 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'City Hospital',
    type: 'hospital',
    contactPerson: 'Dr. John Doe',
    email: 'john@cityhospital.com',
    phone: '+1234567890',
    address: '123 Medical Center Blvd',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock data as needed
];

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>({});

  const handleAdd = () => {
    setFormData({});
    setOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setFormData(customer);
    setOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setCustomers(customers.filter((c) => c.id !== customer.id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (formData.id) {
      setCustomers(
        customers.map((customer) =>
          customer.id === formData.id ? { ...customer, ...formData } : customer
        )
      );
    } else {
      const newCustomer: Customer = {
        ...formData,
        id: Math.random().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Customer;
      setCustomers([...customers, newCustomer]);
    }
    setOpen(false);
  };

  return (
    <div>
      <PageHeader title="Customers" onAdd={handleAdd} addLabel="Add Customer" />
      
      <DataTable
        columns={columns}
        rows={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{formData.id ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type || ''}
                  label="Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <MenuItem value="hospital">Hospital</MenuItem>
                  <MenuItem value="distributor">Distributor</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Person"
                value={formData.contactPerson || ''}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
