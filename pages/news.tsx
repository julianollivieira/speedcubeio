import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { useData } from '@/hooks/useData';
import { Grid, Divider } from '@mui/material';
import PageHeader from '@/components/misc/PageHeader';
import { Newspaper as NewspaperIcon } from '@mui/icons-material';
import PostCard from '@/components/news/PostCard';

const NewsPage: NextPage = () => {
  const { posts } = useData();

  return (
    <Layout title="News">
      <PageHeader title="News and announcements" icon={NewspaperIcon} />
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </Grid>
    </Layout>
  );
};

export default NewsPage;
