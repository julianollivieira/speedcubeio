import { getFirestore, collection, getDocs } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { Post } from '@/types';

const db = getFirestore(app);

const getPosts = async (): Promise<Post[]> => {
  const postsCollection = collection(db, 'posts');
  const postsSnapshot = await getDocs(postsCollection);
  const postObjects = postsSnapshot.docs.map(
    (postDoc) =>
      ({
        id: postDoc.id,
        ...postDoc.data(),
      } as Post)
  );
  const sortedPosts = postObjects.sort((a, b) => b.publishedOn - a.publishedOn);
  return sortedPosts;
};

export default getPosts;
