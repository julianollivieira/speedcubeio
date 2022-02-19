import { boxesAtom, currentBoxIdAtom } from '@/store';
import { Box } from '@/types';
import { msToTime } from '@/utils/helpers';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useAtom } from 'jotai';
import { ReactElement, useEffect, useState } from 'react';

const AverageOfFiveCalculationsTable = ({ index }: { index: number }): ReactElement => {
  const [boxes] = useAtom(boxesAtom);
  const [currentBoxId] = useAtom(currentBoxIdAtom);
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    const box = boxes.find((box) => box.id === currentBoxId);
    if (!box) return;
    setBox(box);
  }, [boxes, currentBoxId]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {box && (
            <>
              <TableRow hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{msToTime(box.times[index]?.time, true)}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>{index}</TableCell>
                <TableCell>{msToTime(box.times[index - 1]?.time, true)}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>{index - 1}</TableCell>
                <TableCell>{msToTime(box.times[index - 2]?.time, true)}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>{index - 2}</TableCell>
                <TableCell>{msToTime(box.times[index - 3]?.time, true)}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>{index - 3}</TableCell>
                <TableCell>{msToTime(box.times[index - 4]?.time, true)}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AverageOfFiveCalculationsTable;
