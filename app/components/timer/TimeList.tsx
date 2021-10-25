import { Time } from '@/types';
import { msToTime, UnixEpochToUTC } from '@/utils/helpers';
import {
  Box as MUIBox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Theme,
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
} from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { useEffect, useState } from 'react';
import { Fragment, ReactElement } from 'react';
import TimeList from '@/classes/TimeList';
import DeleteTimeDialog from '@/components/timer/dialogs/DeleteTimeDialog';
import { useData } from '@/hooks/useData';
import { capitalizeFirstLetter } from '@/utils/helpers';

interface Props {
  sx?: SxProps<Theme>;
  tableProps?: any;
  showControls?: boolean;
}

const TimeListComponent = ({
  sx,
  tableProps,
  showControls = false,
}: Props): ReactElement => {
  const { deleteTime, box } = useData();
  const [timeList, setTimeList] = useState<TimeList>();
  const [open, setOpen] = useState<number | null>(null);
  const [deletingTime, setDeletingTime] = useState<Time | null>(null);

  useEffect(() => {
    if (box) {
      const newTimeList = new TimeList(box);
      setTimeList(newTimeList);
    }
  }, [box]);

  return (
    <MUIBox sx={sx}>
      <TableContainer {...tableProps}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>AO5</TableCell>
              <TableCell>AO12</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeList?.times
              .map((time: number, index: number) => {
                const timeData = box?.times ? box?.times[index] : undefined;
                return (
                  <Fragment key={timeData?.id}>
                    <TableRow
                      hover
                      onClick={() => setOpen(open === index ? null : index)}
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{msToTime(time, true)}</TableCell>
                      <TableCell>{msToTime(timeList.ao5s[index], true)}</TableCell>
                      <TableCell>{msToTime(timeList.ao12s[index], true)}</TableCell>
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
                                primary="Puzzle"
                                secondary={capitalizeFirstLetter(timeData?.puzzle)}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <FormatListNumberedIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary="Scramble"
                                secondary={timeData?.scramble}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CalendarTodayIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary="Date"
                                secondary={UnixEpochToUTC(timeData?.createdAt)}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <DescriptionIcon />
                              </ListItemIcon>
                              <ListItemText
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
                                  <IconButton
                                    onClick={() => setDeletingTime(timeData ?? null)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                  <IconButton>
                                    <EditIcon />
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
              })
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
      {showControls && deletingTime ? (
        <DeleteTimeDialog
          time={deletingTime}
          handleClose={() => setDeletingTime(null)}
          deleteTime={async (): Promise<void> => {
            await deleteTime(deletingTime.id);
            setOpen(null);
          }}
        />
      ) : (
        ''
      )}
    </MUIBox>
  );
};

export default TimeListComponent;
