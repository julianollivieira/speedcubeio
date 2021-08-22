import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/router';

export default (): void => {
  const { currentUser }: { currentUser: any } = useAuth();
  if (process.browser) {
    const router = useRouter();
    console.log(currentUser);
    if (!currentUser) router.push('/login');
  }
};
