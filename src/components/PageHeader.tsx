import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface PageHeaderProps {
  title: string;
  onAdd?: () => void;
  addLabel?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onAdd,
  addLabel = 'Add New',
}) => {
  return (
    <Box
      sx={{
        mb: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      {onAdd && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          {addLabel}
        </Button>
      )}
    </Box>
  );
};
