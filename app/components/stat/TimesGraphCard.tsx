import React, { ReactElement, useState } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';
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
import TimeList from '@/classes/TimeList';

interface Props {
  timeList: TimeList | null;
}

const TimesGraphCard = (props: Props): ReactElement => {
  const { timeList } = { ...props };

  console.log(timeList);

  return (
    <Card>
      <CardHeader
        avatar={<ShowChartIcon />}
        title="Time graph"
        subheader="some text here"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent sx={{ pl: 0 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeList?.getGraphObject()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#151C24" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              labelStyle={{ color: '#000' }}
              wrapperStyle={{ textAlign: 'right', backgroundColor: '#151C24' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line
              type="linear"
              dataKey="time"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="linear"
              dataKey="ao5"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="linear"
              dataKey="ao12"
              stroke="#ff7369"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimesGraphCard;
