import { Typography, Box, Button } from '@mui/material';
import { useData } from '@/hooks/useData';

const TimeList = () => {
  const { box, createTime, deleteTime, editTime, setBoxVisibility } = useData();

  const handleClick = () => {
    createTime({
      time: 100,
      puzzle: '3x3x3',
      scramble: 'A B C D E F G',
      comment: 'tset'
    });
  };

  const handleDelete = (timeId: string) => {
    deleteTime(timeId);
  };

  const handleEdit = (timeId: string) => {
    editTime(timeId, {
      time: 5000,
      puzzle: '4x4x4',
      scramble: 'X Y Z',
      comment: ''
    });
  };

  const toggleVisiblity = () => {
    setBoxVisibility(box?.isPrivate ? 'public' : 'private');
  };

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography sx={{ color: box?.color }}>Box: {box?.icon} {box?.name}</Typography>
        <Button onClick={handleClick} variant="contained">
          Create time
        </Button>
        <Button onClick={toggleVisiblity} variant="outlined" sx={{ ml: 2 }}>
          Toggle box visibility
        </Button>
        <ul style={{ width: 500 }}>
          <li>Box</li>
          <li>private: {box?.isPrivate ? 'yes' : 'no'}</li>
          {box?.times ? box?.times.map((time) => (
            <li
              key={time.id}
              style={{ border: '1px solid white', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onContextMenu={() => handleEdit(time.id)}
            >
              {time.time} ({time.id}, {time.puzzle}, {time.scramble}, {time.comment})
              <Button variant="contained" onClick={() => handleDelete(time.id)}>X</Button>
            </li>
          )) : ''}
        </ul>
      </Box>
    </>
  );
};

export default TimeList;
