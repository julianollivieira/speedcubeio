import { Post } from '@/types';
import { UnixEpochToDaysAgo } from '@/utils/helpers';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={post.title}
          subheader={post.subtitle}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>{post.content}</CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="body2" sx={{ pr: 2, pb: 1 }}>
            Published {UnixEpochToDaysAgo(post.publishedOn)}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostCard;
