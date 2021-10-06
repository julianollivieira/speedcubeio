import { Typography, Box, Button } from '@mui/material';
import { useData } from '@/hooks/useData';

const BoxList = () => {
  const { boxes, createBox, deleteBox, editBox, changeBox } = useData();

  const handleChangeActiveBox = (boxId: string) => {
    changeBox(boxId);
  };

  const handleClick = () => {
    createBox({
      name: 'testbox',
      icon: '🧀',
      color: '#FF0',
    });
  };

  const handleDelete = (boxId: string) => {
    deleteBox(boxId);
  };

  const handleEdit = (boxId: string) => {
    editBox(boxId, {
      name: 'GEEDITEN NAMM',
      icon: '',
      color: '',
    });
  };

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography>Boxes count: {boxes.length}</Typography>
        <Button onClick={handleClick} variant="contained">
          Create box
        </Button>
        <ul style={{ width: 500 }}>
          {boxes.map((box) => (
            <li
              key={box.id}
              style={{
                border: '1px solid white',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onContextMenu={() => handleEdit(box.id)}
              onClick={() => handleChangeActiveBox(box.id)}
            >
              {box.name} ({box.id})
              <Button variant="contained" onClick={() => handleDelete(box.id)}>
                X
              </Button>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default BoxList;
