import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
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
} from '@mui/material';
import { DataTable } from '../components/DataTable';
import { PageHeader } from '../components/PageHeader';
import { QualityReport } from '../types';
import { StatCard } from '../components/StatCard';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const columns = [
  { id: 'productId', label: 'Product ID', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  {
    id: 'severity',
    label: 'Severity',
    minWidth: 100,
    format: (value: string) => (
      <Chip
        label={value}
        color={
          value === 'critical'
            ? 'error'
            : value === 'high'
            ? 'warning'
            : 'default'
        }
        size="small"
      />
    ),
  },
  { id: 'description', label: 'Description', minWidth: 200 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    format: (value: string) => (
      <Chip
        label={value}
        color={
          value === 'open'
            ? 'error'
            : value === 'in-progress'
            ? 'warning'
            : 'success'
        }
        size="small"
      />
    ),
  },
  {
    id: 'reportedDate',
    label: 'Reported Date',
    minWidth: 130,
    format: (value: Date) => value.toLocaleDateString(),
  },
];

// Mock data
const mockReports: QualityReport[] = [
  {
    id: '1',
    productId: 'CS-001',
    type: 'complaint',
    description: 'Product packaging damage reported',
    severity: 'medium',
    status: 'open',
    reportedBy: 'John Doe',
    reportedDate: new Date(),
  },
  // Add more mock data as needed
];

export const QualityAssurance: React.FC = () => {
  const [reports, setReports] = useState<QualityReport[]>(mockReports);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<QualityReport>>({});

  const handleAdd = () => {
    setFormData({});
    setOpen(true);
  };

  const handleEdit = (report: QualityReport) => {
    setFormData(report);
    setOpen(true);
  };

  const handleDelete = (report: QualityReport) => {
    setReports(reports.filter((r) => r.id !== report.id));
  };

  const handleSave = () => {
    if (formData.id) {
      setReports(
        reports.map((report) =>
          report.id === formData.id ? { ...report, ...formData } : report
        )
      );
    } else {
      const newReport: QualityReport = {
        ...formData,
        id: Math.random().toString(),
        reportedDate: new Date(),
      } as QualityReport;
      setReports([...reports, newReport]);
    }
    setOpen(false);
  };

  const getStats = () => {
    const openReports = reports.filter((r) => r.status === 'open').length;
    const inProgressReports = reports.filter(
      (r) => r.status === 'in-progress'
    ).length;
    const resolvedReports = reports.filter(
      (r) => r.status === 'resolved' || r.status === 'closed'
    ).length;

    return { openReports, inProgressReports, resolvedReports };
  };

  const stats = getStats();

  return (
    <div>
      <PageHeader
        title="Quality Assurance"
        onAdd={handleAdd}
        addLabel="Add Report"
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Open Reports"
            value={stats.openReports}
            icon={<WarningIcon />}
            color="error.main"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="In Progress"
            value={stats.inProgressReports}
            icon={<PendingIcon />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Resolved"
            value={stats.resolvedReports}
            icon={<CheckCircleIcon />}
            color="success.main"
          />
        </Grid>
      </Grid>

      <DataTable
        columns={columns}
        rows={reports}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {formData.id ? 'Edit Report' : 'Add Report'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product ID"
                value={formData.productId || ''}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type || ''}
                  label="Type"
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as any })
                  }
                >
                  <MenuItem value="NCR">NCR</MenuItem>
                  <MenuItem value="CAPA">CAPA</MenuItem>
                  <MenuItem value="complaint">Complaint</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select
                  value={formData.severity || ''}
                  label="Severity"
                  onChange={(e) =>
                    setFormData({ ...formData, severity: e.target.value as any })
                  }
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status || ''}
                  label="Status"
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reported By"
                value={formData.reportedBy || ''}
                onChange={(e) =>
                  setFormData({ ...formData, reportedBy: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
