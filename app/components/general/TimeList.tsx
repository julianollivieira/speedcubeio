import { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '@/utils/auth';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import TimeList from '@/classes/TimeList';
import useBox from '@/hooks/useBox';
import Time from '@/types/Time';
import { msToTime } from '@/utils/msToTime';

const TimeListComponent = (props: any): ReactElement => {
  const { boxId, ...other } = props;
  const { currentUser } = useAuth();
  const { box } = useBox(currentUser, boxId);

  const [timeList, setTimeList] = useState<TimeList | null>(null);
  useEffect(() => {
    // if (!box) return;
    if (!box?.times) return;
    const timesArray = box.times.map((time: Time) => time.time);
    const timeList: TimeList = new TimeList(timesArray);
    setTimeList(timeList);
  }, [box]);

  return (
    <Box {...other}>
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
              ?.map((time: number, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{msToTime(time, true)}</TableCell>
                    <TableCell>
                      {msToTime(timeList.ao5s[index], true)}
                    </TableCell>
                    <TableCell>
                      {msToTime(timeList.ao12s[index], true)}
                    </TableCell>
                  </TableRow>
                );
              })
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeListComponent;
