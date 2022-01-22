import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Grid, Divider } from '@mui/material';
import PageHeader from '@/components/misc/PageHeader';
import { Newspaper as NewspaperIcon } from '@mui/icons-material';
import PostCard from '@/components/news/PostCard';
import { useAtom } from 'jotai';
import { postsAtom } from '@/store';
import getPosts from '@/services/posts/getPosts';
import { useEffect } from 'react';

const NewsPage: NextPage = () => {
  const [posts, setPosts] = useAtom(postsAtom);

  useEffect(() => {
    getPosts().then((newPosts) => {
      setPosts(newPosts);
    });
  }, []);

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
