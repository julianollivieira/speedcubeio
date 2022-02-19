import { Card, CardHeader, CardContent } from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { ReactElement } from 'react';
import {
  BarChart,
  Bar,
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
dayjs.extend(utc);

interface Props {
  box: Box | undefined;
}

const TimeDistributionChartCard = ({ box }: Props): ReactElement => {
  const timeList = useTimeList(box);

  return (
    <Card>
      <CardHeader
        avatar={<ShowChartIcon />}
        title="Time distribution chart"
        subheader="some text here"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={timeList?.getTimeDistributionChartObject()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#151C24" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="amount" fill="#2D9C93" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeDistributionChartCard;
