import React, { ReactElement } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import BoxSummaryTable from '@/components/boxes/BoxSummaryTable';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TimeList from '@/classes/TimeList';

interface Props {
  timeList: TimeList | null;
}

const BoxSummaryCard = (props: Props): ReactElement => {
  const { timeList } = { ...props };
  return (
    <Card>
      <CardHeader
        avatar={<ListAltIcon />}
        title="Box summary"
        subheader="some text here"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent>
        <BoxSummaryTable timeList={timeList} showWorst />
      </CardContent>
    </Card>
  );
};

export default BoxSummaryCard;
