import { Box } from '@/types';
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
} from '@mui/material';
import {
  Extension as ExtensionIcon,
  FormatListNumbered as FormatListNumberedIcon,
  CalendarToday as CalendarTodayIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useAuth } from '@/hooks/useAuth';
import TimeList from '@/classes/TimeList';

interface Props {
  boxId: string | undefined;
  sx?: SxProps<Theme>;
}

const TimeListComponent = ({ boxId, sx }: Props) => {
  const { user } = useAuth();
  const [timeList, setTimeList] = useState<TimeList>();
  const [box, setBox] = useState<Box>();
  const [open, setOpen] = useState<number | null>();

  useEffect(() => {
    if (user && boxId) {
      const box = user?.boxes.find((box) => box.id === boxId);
      if (box) {
        const newTimeList = new TimeList(box);
        setTimeList(newTimeList);
        setBox(box);
      }
    }
  }, [user, boxId]);

  return (
    <MUIBox sx={sx}>
      <TableContainer>
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
                                secondary={timeData?.puzzle}
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
                                secondary={UnixEpochToUTC(timeData?.creationTime)}
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
                                    {timeData?.comment ?? 'none'}
                                  </span>
                                }
                              />
                            </ListItem>
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
    </MUIBox>
  );
};

export default TimeListComponent;
