import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Box } from '@/types';
import { ReactElement } from 'react';
import { msToTime } from '@/utils/helpers';
import useTimeList from '@/hooks/useTimeList';

interface Props {
  box: Box | undefined;
}

const ColoredTableCell = ({ value }: { value: number | null | undefined }) => {
  return value !== null && value !== undefined ? (
    <TableCell
      sx={{
        color: value > 0 ? '#D16D6D' : value < 0 ? '#79D177' : 'text.primary',
      }}
    >
      {msToTime(value, true, true)}
    </TableCell>
  ) : (
    <TableCell>-</TableCell>
  );
};

const LastDifferenceTableCard = ({ box }: Props): ReactElement => {
  const timeList = useTimeList(box);
  return (
    <Card>
      <CardHeader
        avatar={<ListAltIcon />}
        title="Difference between last and previous/best/worst"
        subheader="some text here"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent>
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
                <TableCell>Previous</TableCell>
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenLastAndPreviousTime()}
                />
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenLastAndPreviousAverageOf5()}
                />
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenLastAndPreviousAverageOf12()}
                />
              </TableRow>
              <TableRow>
                <TableCell>Best</TableCell>
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenBestAndLastTime()}
                />
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenBestAndLastAverageOf5()}
                />
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenBestAndLastAverageOf12()}
                />
              </TableRow>
              <TableRow>
                <TableCell>Worst</TableCell>
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenWorstAndLastTime()}
                />
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenWorstAndLastAverageOf5()}
                />
                <ColoredTableCell
                  value={timeList?.getDifferenceBetweenWorstAndLastAverageOf12()}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default LastDifferenceTableCard;
