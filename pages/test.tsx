import type { NextPage } from 'next';
import { ReactElement } from 'react';
import firebase from '@/utils/firebase';

console.log(firebase);

const Test: NextPage = (): ReactElement => {
  return <p>test</p>;
};

export default Test;
