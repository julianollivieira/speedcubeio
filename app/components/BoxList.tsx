import { Typography, Box, Button } from '@mui/material';
import { useBoxes } from '@/hooks/useBoxes';
import { useUser } from '@/hooks/useUser';

const BoxList = () => {
  const { user } = useUser();
  const { boxes, createBox, deleteBox, editBox } = useBoxes();

  const handleClick = () => {
    createBox({
      name: 'testbox',
      icon: '🧀',
      color: '#FF0',
    });
  };

  const handleDelete = (boxId: string) => {
    // deleteBox(boxId);
    editBox(boxId, {
      name: 'GEEDITEN NAMM',
      icon: '',
      color: '',
    });
  };

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography>User: {user?.displayName}</Typography>
        <Button onClick={handleClick} variant="contained">
          Create box
        </Button>
        <ul style={{ width: 500 }}>
          <li>Boxes</li>
          {boxes.map((box) => (
            <li
              key={box.id}
              style={{ border: '1px solid white', paddingTop: 10, paddingBottom: 10 }}
              onClick={() => handleDelete(box.id)}
            >
              {box.name} ({box.id})
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default BoxList;
