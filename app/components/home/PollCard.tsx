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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 1,
      }}
    >
      <CardHeader
        title="Current poll"
        subheader="We want to know what you think"
        sx={{ pb: 0 }}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent
        sx={{
          pb: 0,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: poll !== undefined ? 'initial' : 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: 16, textAlign: 'center', mb: 0 }} gutterBottom>
          {poll?.question || 'No poll available at this time, check back later'}
        </Typography>
        {poll && (
          <RadioGroup defaultValue={0}>
            <List sx={{ py: 0 }}>
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
      {poll && (
        <CardActions>
          <Button size="small" variant="contained" fullWidth>
            Submit
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default NewsAndAnnouncementsCard;
