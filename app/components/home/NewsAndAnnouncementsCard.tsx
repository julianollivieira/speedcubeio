import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import { Newspaper as NewspaperIcon } from '@mui/icons-material';
import { useData } from '@/hooks/useData';
import Link from '@/components/misc/Link';
import Router from 'next/router';

const NewsAndAnnouncementsCard = () => {
  const { posts } = useData();

  console.log(posts);

  return (
    <Card
      sx={{
        minWidth: 275,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardHeader
        title="News and announcements"
        subheader="September 14, 2016"
        sx={{ pb: 0 }}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent sx={{ py: 0 }}>
        <List>
          {posts.slice(0, 3).map((post) => (
            <ListItem
              disablePadding
              key={post.id}
              secondaryAction={
                <Typography variant="body2">
                  {new Date(post.publishedOn * 1000).toLocaleString()}
                </Typography>
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <NewspaperIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={post.title} secondary={post.subtitle} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Link href="/news" passHref sx={{ textDecoration: 'none', width: 1 }}>
          <Button color="primary" variant="outlined" fullWidth>
            View all
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default NewsAndAnnouncementsCard;
