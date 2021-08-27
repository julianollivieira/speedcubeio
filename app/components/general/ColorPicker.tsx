import { ReactElement, useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import { CirclePicker } from 'react-color';

const ColorPicker = (props: any): ReactElement => {
  const { handleColorPickerChange, onChange, ...other } = props;
  const [color, setColor] = useState<string>(props.value);

  const handlePickerColorChange = (color: any) => {
    props.handleColorPickerChange(color);
    setColor(color.hex);
  };

  return (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        onChange={(event) => {
          setColor(event.target.value);
          props.onChange(event);
        }}
        fullWidth
        sx={{ mb: 2 }}
        {...other}
      />
      <Box
        sx={{
          width: 1,
          height: 25,
          bgcolor: color,
          mb: 2,
          borderRadius: 1,
          boxShadow: `${color} 0px 0px 5px`,
        }}
      />
      <CirclePicker color={color} onChangeComplete={handlePickerColorChange} />
    </Box>
  );
};

export default ColorPicker;
