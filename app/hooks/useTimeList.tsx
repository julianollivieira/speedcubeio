import { useEffect, useState } from 'react';
import TimeList from '@/classes/TimeList';
import { Box } from '@/types';

const useTimeList = (box: Box | undefined): TimeList | undefined => {
  const [timeList, setTimeList] = useState<TimeList>();

  useEffect(() => {
    if (box) {
      setTimeList(new TimeList(box));
    }
  }, [box]);

  return timeList;
};

export default useTimeList;
