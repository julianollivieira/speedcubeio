import { Card, CardHeader, CardContent } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { ReactElement } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box } from '@/types';
import useTimeList from '@/hooks/useTimeList';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { msToTime } from '@/utils/helpers';
dayjs.extend(utc);

interface Props {
  box: Box | undefined;
}

const TimeGraphCard = ({ box }: Props): ReactElement => {
  const timeList = useTimeList(box);

  return (
    <Card>
      <CardHeader
        avatar={<ShowChartIcon />}
        title="Time graph"
        subheader="some text here"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeList?.getTimeGraphObject()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#151C24" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(ms: number) => msToTime(ms)}></YAxis>
            <Tooltip
              labelStyle={{ color: '#000' }}
              wrapperStyle={{ textAlign: 'right', backgroundColor: '#151C24' }}
              formatter={(ms: number) => msToTime(ms)}
              labelFormatter={(label: string) => `Time #${label}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line
              type="linear"
              dataKey="time"
              stroke="#2D9C93"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line type="linear" dataKey="ao5" stroke="#F94851" strokeWidth={2} />
            <Line type="linear" dataKey="ao12" stroke="#FEBE49" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeGraphCard;
