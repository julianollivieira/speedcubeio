import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useData } from '@/hooks/useData';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';

const NewsPage: NextPage = () => {
  const { posts } = useData();

  return (
    <Layout title="News">
      <Grid container spacing={2} sx={{ pt: 3 }}>
        {posts.map((post) => (
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
                  Published on {new Date(post.publishedOn * 1000).toLocaleString()}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default NewsPage;
