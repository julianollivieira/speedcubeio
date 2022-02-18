import { Time } from '@/types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import AverageOfFiveCalculationsTable from '../timelist/averageCalculations/AverageOfFiveCalculationsTable';

interface Props {
  open: boolean;
  index: number;
  handleClose: () => void;
}

const AverageCalculationDialog = ({ open, index, handleClose }: Props): ReactElement => {
  const [value, setValue] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'background.paper' }}>
        View time calculations
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 3, pb: 1, bgcolor: '#151C24' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="AO5" />
            <Tab label="AO12" />
            <Tab label="???" />
          </Tabs>
        </Box>
        {value === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography>Explanation about average of 5 here</Typography>
            <AverageOfFiveCalculationsTable index={index} />
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography>2</Typography>
          </Box>
        )}
        {value === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography>3</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AverageCalculationDialog;
