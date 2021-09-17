import React, { ReactElement } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import TimeList from '@/classes/TimeList';

interface Props {
  timeList: TimeList | null;
}

const TimesGraphCard = (props: Props): ReactElement => {
  const { timeList } = { ...props };

  return (
    <Card>
      <CardHeader
        avatar={<PieChartIcon />}
        title="Puzzles"
        subheader="some text here"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent sx={{ pl: 0 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={400}>
            <Pie
              data={timeList?.getPuzzlesPieChartObject()}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimesGraphCard;
