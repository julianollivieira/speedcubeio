import React, { ReactElement } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { msToTime } from '@/utils/convert';
import TimeList from '@/classes/TimeList';

interface Props {
  timeList: TimeList | null;
  showWorst?: boolean;
}

const BoxSummaryTable = (props: Props): ReactElement => {
  const { timeList, showWorst } = { ...props };
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Last</TableCell>
            <TableCell>Best</TableCell>
            {showWorst ? <TableCell>Worst</TableCell> : <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>{msToTime(timeList?.getLastTime(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getBestTime(), true)}</TableCell>
            {showWorst ? (
              <TableCell>{msToTime(timeList?.getWorstTime(), true)}</TableCell>
            ) : (
              <></>
            )}
          </TableRow>
          <TableRow>
            <TableCell>AO5</TableCell>
            <TableCell>
              {msToTime(timeList?.getLastAverageOf5(), true)}
            </TableCell>
            <TableCell>
              {msToTime(timeList?.getBestAverageOf5(), true)}
            </TableCell>
            {showWorst ? (
              <TableCell>
                {msToTime(timeList?.getWorstAverageOf5(), true)}
              </TableCell>
            ) : (
              <></>
            )}
          </TableRow>
          <TableRow>
            <TableCell>AO12</TableCell>
            <TableCell>
              {msToTime(timeList?.getLastAverageOf12(), true)}
            </TableCell>
            <TableCell>
              {msToTime(timeList?.getBestAverageOf12(), true)}
            </TableCell>
            {showWorst ? (
              <TableCell>
                {msToTime(timeList?.getWorstAverageOf12(), true)}
              </TableCell>
            ) : (
              <></>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoxSummaryTable;
