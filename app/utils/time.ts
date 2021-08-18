import dayjs from 'dayjs';

export const getDaypart = () => {
  const hour = dayjs().hour();
  return hour < 6
    ? 'night'
    : hour < 12
    ? 'morning'
    : hour < 18
    ? 'afternoon'
    : hour < 24
    ? 'evening'
    : '';
};
