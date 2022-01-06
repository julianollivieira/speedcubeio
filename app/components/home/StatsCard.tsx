import { Card, CardContent, CardHeader } from '@mui/material';

const StatsCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title="Statistics"
        subheader="Vote for the best new feature"
        sx={{ pb: 0 }}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <p>stats</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
