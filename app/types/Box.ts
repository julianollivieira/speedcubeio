import Time from '@/types/Time';

export default interface Box {
  id: string;
  name: string;
  icon: string;
  color: string;
  creationTime: string;
  times: Array<Time> | null;
}
