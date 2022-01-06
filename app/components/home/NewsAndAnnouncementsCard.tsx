import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  Box,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import { Newspaper as NewspaperIcon } from '@mui/icons-material';
import { useData } from '@/hooks/useData';
import Link from '@/components/misc/Link';
import { UnixEpochToDaysAgo } from '@/utils/helpers';

const NewsAndAnnouncementsCard = () => {
  const { posts } = useData();

  return (
    <Card
      sx={{
        minWidth: 275,
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardHeader
        title="News and announcements"
        subheader="Stay up-to-date with the latest news"
        sx={{ pb: 0 }}
        titleTypographyProps={{ variant: 'h6' }}
        avatar={
          <Avatar>
            <NewspaperIcon />
          </Avatar>
        }
      />
      <CardContent sx={{ py: 0 }}>
        <List>
          {posts.slice(0, 3).map((post) => (
            <>
              <ListItem disablePadding key={post.id}>
                <ListItemButton sx={{ px: 1 }}>
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
                      <Typography variant="body1" fontWeight="bold">
                        {post.title}
                      </Typography>
                      <Typography variant="body2">{post.subtitle}</Typography>
                    </Box>
                    <Typography variant="caption">
                      {UnixEpochToDaysAgo(post.publishedOn)}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
              {post.id !== posts[posts.slice(0, 3).length - 1].id && (
                <Divider component="li" />
              )}
            </>
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
