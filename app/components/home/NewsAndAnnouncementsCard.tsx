import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Box,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import { Circle as CircleIcon } from '@mui/icons-material';
import { useData } from '@/hooks/useData';
import Link from '@/components/misc/Link';

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
            <ListItem disablePadding key={post.id}>
              <ListItemButton sx={{ px: 1 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'transparent' }}>
                    <CircleIcon sx={{ fontSize: '0.5em', color: '#FFF' }} />
                  </Avatar>
                </ListItemAvatar>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' },
                    width: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body1">{post.subtitle}</Typography>
                  </Box>
                  <Typography variant="body2">
                    {new Date(post.publishedOn * 1000).toLocaleString()}
                  </Typography>
                </Box>
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
