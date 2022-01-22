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
import Link from '@/components/misc/Link';
import { UnixEpochToDaysAgo } from '@/utils/helpers';
import { useAtom } from 'jotai';
import { postAtom } from '@/store';
import getPosts from '@/services/posts/getPosts';
import { useEffect, Fragment } from 'react';

const NewsAndAnnouncementsCard = () => {
  const [posts, setPosts] = useAtom(postAtom);

  useEffect(() => {
    getPosts().then((newPosts) => {
      setPosts(newPosts);
    });
  }, []);

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
        titleTypographyProps={{ variant: 'h6' }}
        avatar={
          <Avatar>
            <NewspaperIcon />
          </Avatar>
        }
      />
      <Divider variant="middle" />
      <CardContent sx={{ py: 0 }}>
        {posts.length > 0 ? (
          <List>
            {posts.slice(0, 3).map((post) => (
              <Fragment key={post.id}>
                <ListItem disablePadding>
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
              </Fragment>
            ))}
          </List>
        ) : (
          <Typography sx={{ pt: 3, fontSize: 14, textAlign: 'center', color: '#AAA' }}>
            No posts yet, check back later
          </Typography>
        )}
      </CardContent>
      {posts && (
        <CardActions>
          <Link href="/news" passHref sx={{ textDecoration: 'none', width: 1 }}>
            <Button color="primary" variant="outlined" fullWidth>
              View all
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};

export default NewsAndAnnouncementsCard;
