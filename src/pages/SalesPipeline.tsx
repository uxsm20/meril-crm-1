import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PageHeader } from '../components/PageHeader';
import { SalesOpportunity } from '../types';

const stages = [
  'lead',
  'qualification',
  'proposal',
  'negotiation',
  'closed-won',
  'closed-lost',
] as const;

const stageColors = {
  lead: '#e3f2fd',
  qualification: '#e8f5e9',
  proposal: '#fff3e0',
  negotiation: '#f3e5f5',
  'closed-won': '#e8f5e9',
  'closed-lost': '#ffebee',
};

// Mock data
const mockOpportunities: SalesOpportunity[] = [
  {
    id: '1',
    customerId: '1',
    productIds: ['1', '2'],
    stage: 'qualification',
    value: 50000,
    probability: 60,
    expectedCloseDate: new Date('2024-03-01'),
    notes: 'Interested in cardiac stents',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock data as needed
];

export const SalesPipeline: React.FC = () => {
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>(mockOpportunities);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<SalesOpportunity>>({});

  const handleAdd = () => {
    setFormData({});
    setOpen(true);
  };

  const handleEdit = (opportunity: SalesOpportunity) => {
    setFormData(opportunity);
    setOpen(true);
  };

  const handleDelete = (opportunity: SalesOpportunity) => {
    setOpportunities(opportunities.filter((o) => o.id !== opportunity.id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(opportunities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    // Update the stage
    reorderedItem.stage = result.destination.droppableId as any;
    
    items.splice(result.destination.index, 0, reorderedItem);
    setOpportunities(items);
  };

  const handleSave = () => {
    if (formData.id) {
      setOpportunities(
        opportunities.map((opp) =>
          opp.id === formData.id ? { ...opp, ...formData } : opp
        )
      );
    } else {
      const newOpportunity: SalesOpportunity = {
        ...formData,
        id: Math.random().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as SalesOpportunity;
      setOpportunities([...opportunities, newOpportunity]);
    }
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Sales Pipeline"
        onAdd={handleAdd}
        addLabel="Add Opportunity"
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
          {stages.map((stage) => (
            <Paper
              key={stage}
              sx={{
                minWidth: 300,
                bgcolor: stageColors[stage],
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </Typography>

              <Droppable droppableId={stage}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {opportunities
                      .filter((opp) => opp.stage === stage)
                      .map((opportunity, index) => (
                        <Draggable
                          key={opportunity.id}
                          draggableId={opportunity.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ mb: 2 }}
                            >
                              <CardContent>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                  }}
                                >
                                  <Typography variant="subtitle1">
                                    ${opportunity.value.toLocaleString()}
                                  </Typography>
                                  <Box>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEdit(opportunity)}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleDelete(opportunity)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                  {opportunity.notes}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                  <Chip
                                    label={`${opportunity.probability}% Probability`}
                                    size="small"
                                    sx={{ mr: 1 }}
                                  />
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Paper>
          ))}
        </Box>
      </DragDropContext>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {formData.id ? 'Edit Opportunity' : 'Add Opportunity'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer ID"
                value={formData.customerId || ''}
                onChange={(e) =>
                  setFormData({ ...formData, customerId: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Value"
                type="number"
                value={formData.value || ''}
                onChange={(e) =>
                  setFormData({ ...formData, value: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Probability (%)"
                type="number"
                value={formData.probability || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    probability: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expected Close Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={
                  formData.expectedCloseDate?.toISOString().split('T')[0] || ''
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expectedCloseDate: new Date(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Stage</InputLabel>
                <Select
                  value={formData.stage || ''}
                  label="Stage"
                  onChange={(e) =>
                    setFormData({ ...formData, stage: e.target.value as any })
                  }
                >
                  {stages.map((stage) => (
                    <MenuItem key={stage} value={stage}>
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={formData.notes || ''}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
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
