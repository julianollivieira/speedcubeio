import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { msToTime } from '@/utils/helpers';
import useTimeList from '@/hooks/useTimeList';
import { Box } from '@/types';
import { ReactElement } from 'react';

interface Props {
  box: Box | undefined;
}

const BoxCardSummaryTable = ({ box }: Props): ReactElement => {
  const timeList = useTimeList(box);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>AO5</TableCell>
            <TableCell>AO12</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Last</TableCell>
            <TableCell>{msToTime(timeList?.getLastTime(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getLastAverageOf5(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getLastAverageOf12(), true)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Best</TableCell>
            <TableCell>{msToTime(timeList?.getBestTime(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getBestAverageOf5(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getBestAverageOf12(), true)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Worst</TableCell>
            <TableCell>{msToTime(timeList?.getWorstTime(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getWorstAverageOf5(), true)}</TableCell>
            <TableCell>{msToTime(timeList?.getWorstAverageOf12(), true)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoxCardSummaryTable;
