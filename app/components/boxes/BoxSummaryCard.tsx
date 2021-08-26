import React, { ReactElement } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import BoxSummaryTable from '@/components/boxes/BoxSummaryTable';
import ListAltIcon from '@material-ui/icons/ListAlt';
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
