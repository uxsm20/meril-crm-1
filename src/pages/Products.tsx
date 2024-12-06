import React, { useState } from 'react';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { Product, Certification } from '../types';
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
  Chip,
  Box,
} from '@mui/material';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 130 },
  { id: 'sku', label: 'SKU', minWidth: 100 },
  {
    id: 'certifications',
    label: 'Certifications',
    minWidth: 170,
    format: (certifications: Certification[]) => (
      <Box>
        {certifications.map((cert) => (
          <Chip
            key={cert.id}
            label={`${cert.type} - ${cert.status}`}
            size="small"
            color={cert.status === 'active' ? 'success' : 'error'}
            sx={{ mr: 0.5 }}
          />
        ))}
      </Box>
    ),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    format: (value: number) => `$${value.toLocaleString()}`,
  },
  { id: 'stock', label: 'Stock', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cardiac Stent X1',
    category: 'cardiovascular',
    description: 'Advanced cardiac stent with drug-eluting capability',
    sku: 'CS-001',
    certifications: [
      {
        id: '1',
        type: 'FDA',
        number: 'FDA123',
        issueDate: new Date('2023-01-01'),
        expiryDate: new Date('2024-01-01'),
        status: 'active',
      },
    ],
    price: 1200,
    stock: 100,
    status: 'active',
  },
  // Add more mock data as needed
];

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [certificationOpen, setCertificationOpen] = useState(false);
  const [certFormData, setCertFormData] = useState<Partial<Certification>>({});

  const handleAdd = () => {
    setFormData({});
    setOpen(true);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setOpen(true);
  };

  const handleDelete = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (formData.id) {
      setProducts(
        products.map((product) =>
          product.id === formData.id ? { ...product, ...formData } : product
        )
      );
    } else {
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(),
        certifications: formData.certifications || [],
      } as Product;
      setProducts([...products, newProduct]);
    }
    setOpen(false);
  };

  const handleAddCertification = () => {
    setCertFormData({});
    setCertificationOpen(true);
  };

  const handleSaveCertification = () => {
    const newCert: Certification = {
      ...certFormData,
      id: Math.random().toString(),
    } as Certification;
    setFormData({
      ...formData,
      certifications: [...(formData.certifications || []), newCert],
    });
    setCertificationOpen(false);
  };

  return (
    <div>
      <PageHeader title="Products" onAdd={handleAdd} addLabel="Add Product" />
      
      <DataTable
        columns={columns}
        rows={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{formData.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
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
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category || ''}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                >
                  <MenuItem value="cardiovascular">Cardiovascular</MenuItem>
                  <MenuItem value="orthopedic">Orthopedic</MenuItem>
                  <MenuItem value="diagnostic">Diagnostic</MenuItem>
                  <MenuItem value="endo-surgery">Endo-Surgery</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="SKU"
                value={formData.sku || ''}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={formData.stock || ''}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Button variant="outlined" onClick={handleAddCertification}>
                  Add Certification
                </Button>
              </Box>
              <Box>
                {formData.certifications?.map((cert) => (
                  <Chip
                    key={cert.id}
                    label={`${cert.type} - ${cert.number}`}
                    onDelete={() =>
                      setFormData({
                        ...formData,
                        certifications: formData.certifications?.filter((c) => c.id !== cert.id),
                      })
                    }
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
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

      <Dialog open={certificationOpen} onClose={() => setCertificationOpen(false)}>
        <DialogTitle>Add Certification</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={certFormData.type || ''}
                  label="Type"
                  onChange={(e) => setCertFormData({ ...certFormData, type: e.target.value as any })}
                >
                  <MenuItem value="FDA">FDA</MenuItem>
                  <MenuItem value="CE">CE</MenuItem>
                  <MenuItem value="ISO">ISO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Certificate Number"
                value={certFormData.number || ''}
                onChange={(e) => setCertFormData({ ...certFormData, number: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Issue Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={certFormData.issueDate?.toISOString().split('T')[0] || ''}
                onChange={(e) =>
                  setCertFormData({ ...certFormData, issueDate: new Date(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={certFormData.expiryDate?.toISOString().split('T')[0] || ''}
                onChange={(e) =>
                  setCertFormData({ ...certFormData, expiryDate: new Date(e.target.value) })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertificationOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveCertification} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
