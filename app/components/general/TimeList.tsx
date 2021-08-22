import { ReactElement } from 'react';
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
import useTimes from '@/hooks/useTimes';
import Time from '@/types/Time';

const TimeList = (props: any): ReactElement => {
  const { boxId, ...other } = props;
  const { currentUser } = useAuth();
  const { times } = useTimes(currentUser, boxId);
  console.log(times);

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
            {times
              ?.map((time: Time, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{time.time}</TableCell>
                    <TableCell>00.00</TableCell>
                    <TableCell>00.00</TableCell>
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

export default TimeList;
