import { Box, Button } from '@mui/material';
import { connect } from 'react-redux';
import { RootState } from '@/store';
import { BoxSliceState, createBox } from '@/features/boxSlice';

const BoxList = ({ boxes }: { boxes: BoxSliceState }) => {
  const handleClick = () => {
    // if (user) {
    //   dispatch(
    //     createBox({
    //       user: user,
    //       box: {
    //         name: 'New box',
    //         icon: '😂',
    //         color: '#FFF',
    //       },
    //     })
    //   );
    // }
  };

  console.log('📦', boxes);

  return (
    <>
      <Box sx={{ px: 2, py: 2 }}>
        <Button onClick={handleClick} variant="contained">
          Create box
        </Button>
      </Box>
      <ul>
        <li>Boxes</li>
        {boxes?.boxes?.map((box) => (
          <li key={box.id}>{box.name}</li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  boxes: state.boxes,
});

// const mapDispatchToProps = (dispatch) => ({
//   createBox: () => dispatch(createBox()),
// });

export default connect(mapStateToProps)(BoxList);
