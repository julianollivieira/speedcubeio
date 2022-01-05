import { useData } from '@/hooks/useData';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CardHeader,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  CardActions,
  Button,
} from '@mui/material';

const NewsAndAnnouncementsCard = () => {
  const { currentPoll } = useData();

  const poll = currentPoll();

  return (
    <Card
      sx={{
        minWidth: 275,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardHeader
        title="Poll"
        subheader="We want to know what you think"
        sx={{ pb: 0 }}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {poll?.question || 'No polls available'}
        </Typography>
        {poll && (
          <RadioGroup defaultValue={0}>
            <List sx={{ pb: 0 }}>
              {poll?.options.map((option, index) => (
                <ListItem
                  disablePadding
                  key={option}
                  sx={{ py: 1 }}
                  secondaryAction={
                    <FormControlLabel
                      label=""
                      value={index}
                      sx={{ m: 0 }}
                      control={<Radio edge="end" />}
                    />
                  }
                >
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </RadioGroup>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" fullWidth>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsAndAnnouncementsCard;
