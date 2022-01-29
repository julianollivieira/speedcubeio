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
  Avatar,
  Divider,
} from '@mui/material';
import { Poll as PollIcon } from '@mui/icons-material';
import { pollsAtom } from '@/store';
import { useAtom } from 'jotai';
import getPolls from '@/services/polls/getPolls';
import { useEffect, useState } from 'react';
import type { Poll } from '@/types';

const NewsAndAnnouncementsCard = () => {
  const [polls, setPolls] = useAtom(pollsAtom);
  const [activePoll, setActivePoll] = useState<Poll | undefined>(undefined);

  useEffect(() => {
    getPolls().then((newPolls) => {
      setPolls(newPolls);
    });
  }, []);

  useEffect(() => {
    setActivePoll(polls?.find((poll) => poll.active));
  }, [polls]);

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
        titleTypographyProps={{ variant: 'h6' }}
        avatar={
          <Avatar>
            <PollIcon />
          </Avatar>
        }
      />
      <Divider variant="middle" />
      <CardContent
        sx={{
          pb: 0,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: activePoll !== undefined ? 'initial' : 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: 14, textAlign: 'center', color: '#AAA' }}>
          {activePoll?.question || 'No poll available at this time, check back later'}
        </Typography>
        {activePoll && (
          <RadioGroup defaultValue={0}>
            <List sx={{ py: 0 }}>
              {activePoll?.options.map((option, index) => (
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
      {activePoll && (
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
