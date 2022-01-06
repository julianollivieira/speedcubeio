import { Card, CardContent, CardHeader, Avatar } from '@mui/material';
import { ShowChart as ShowChartIcon } from '@mui/icons-material';

const StatsCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title="Statistics"
        subheader="Vote for the best new feature"
        sx={{ pb: 0 }}
        titleTypographyProps={{ variant: 'h6' }}
        avatar={
          <Avatar>
            <ShowChartIcon />
          </Avatar>
        }
      />
      <CardContent>
        <p>stats</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
