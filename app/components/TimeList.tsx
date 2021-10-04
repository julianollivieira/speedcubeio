import { Typography, Box, Button } from '@mui/material';
import { useBoxes } from '@/hooks/useBoxes';
import { useUser } from '@/hooks/useUser';

const BoxList = () => {
  const { user } = useUser();
  const { times, createTime, deleteTime, editTime } = useBoxes();

  const handleClick = () => {
    createTime({
      name: 'testbox',
      icon: '🧀',
      color: '#FF0',
    });
  };

  const handleDelete = (boxId: string) => {
    createTime(boxId);
  };

  const handleEdit = (boxId: string) => {
    createTime(boxId, {
      name: 'GEEDITEN NAMM',
      icon: '',
      color: '',
    });
  };

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography>Box: {user?.displayName}</Typography>
        <Button onClick={handleClick} variant="contained">
          Create time
        </Button>
        <ul style={{ width: 500 }}>
          <li>Times</li>
          {times.map((time) => (
            <li
              key={time.id}
              style={{ border: '1px solid white', paddingTop: 10, paddingBottom: 10 }}
              onClick={() => handleEdit(time.id)}
              onContextMenu={() => handleDelete(time.id)}
            >
              {time.time} ({time.id})
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default BoxList;
