import { Time } from '@/types';
import { Fragment, ReactElement } from 'react';
import {
  TableRow,
  TableCell,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Extension as ExtensionIcon,
  FormatListNumbered as FormatListNumberedIcon,
  CalendarToday as CalendarTodayIcon,
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { msToTime, UnixEpochToUTC } from '@/utils/helpers';

interface Props {
  ao5: number | null;
  ao12: number | null;
  timeData?: Time;
  index: number;
  open: number | null;
  setOpen: (index: number | null) => void;
  showControls?: boolean;
  setDeletingTime: (timeData: Time | null) => void;
  setEditingTime: (timeData: Time | null) => void;
  setShowTimeAverageCalculations: (index: number) => void;
}

const TimeListRow = ({
  ao5,
  ao12,
  timeData,
  index,
  open,
  setOpen,
  showControls = false,
  setDeletingTime,
  setEditingTime,
  setShowTimeAverageCalculations,
}: Props): ReactElement => {
  return (
    <Fragment key={timeData?.id}>
      <TableRow
        hover
        onClick={() => setOpen(open === index ? null : index)}
        sx={{ '&:hover': { cursor: 'pointer' } }}
      >
        <TableCell>{index + 1}</TableCell>
        <TableCell>{msToTime(timeData?.time, true)}</TableCell>
        <TableCell>{msToTime(ao5, true)}</TableCell>
        <TableCell>{msToTime(ao12, true)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={4}
          sx={{
            p: 0,
            borderTop: 'none',
            borderBottom: open === index ? undefined : 'none',
          }}
        >
          <Collapse in={open === index}>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <ExtensionIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ whiteSpace: 'normal' }}
                  primary="Puzzle"
                  secondary={capitalizeFirstLetter(timeData?.puzzle)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ whiteSpace: 'normal' }}
                  primary="Scramble"
                  secondary={
                    <span
                      style={{
                        fontStyle: timeData?.scramble ? 'normal' : 'italic',
                      }}
                    >
                      {timeData?.scramble && timeData?.scramble !== ''
                        ? timeData?.scramble
                        : 'none'}
                    </span>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ whiteSpace: 'normal' }}
                  primary="Date"
                  secondary={UnixEpochToUTC(timeData?.createdAt)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ whiteSpace: 'normal' }}
                  primary="Comment"
                  secondary={
                    <span
                      style={{
                        fontStyle: timeData?.comment ? 'normal' : 'italic',
                      }}
                    >
                      {timeData?.comment && timeData?.comment !== ''
                        ? timeData?.comment
                        : 'none'}
                    </span>
                  }
                />
              </ListItem>
              {showControls ? (
                <>
                  <Divider />
                  <ListItem
                    sx={{
                      py: 1,
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <IconButton onClick={() => setEditingTime(timeData ?? null)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setShowTimeAverageCalculations(index)}>
                      <CalculateIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeletingTime(timeData ?? null)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </>
              ) : (
                ''
              )}
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default TimeListRow;
