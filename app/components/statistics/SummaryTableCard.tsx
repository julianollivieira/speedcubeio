import React, { ReactElement } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
// import TimeList from '@/classes/TimeList';
import BoxCardSummaryTable from '@/components/boxes/card/BoxCardSummaryTable';
import { Box } from '@/types';

interface Props {
  box: Box | undefined;
}

const SummaryTableCard = ({ box }: Props): ReactElement => {
  return (
    <Card>
      <CardHeader
        avatar={<ListAltIcon />}
        title="Box summary"
        subheader="some text here"
        titleTypographyProps={{ variant: 'subtitle1' }}
      />
      <CardContent>
        <BoxCardSummaryTable box={box} />
      </CardContent>
    </Card>
  );
};

export default SummaryTableCard;