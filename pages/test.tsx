import type { NextPage } from 'next';
import BoxList from '@/components/BoxList';

import Layout from '@/components/layout/Layout';

const TestPage: NextPage = () => {
  return (
    <Layout>
      <BoxList />
    </Layout>
  );
};

export default TestPage;
