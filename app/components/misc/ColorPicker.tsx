import { useState, ReactElement } from 'react';
import { Box, TextField } from '@mui/material';
import { CirclePicker, ColorChangeHandler } from 'react-color';

interface Props {
  name: string;
  id: string;
  label: string;
  value: string;
  onChange: (event: any) => void;
  error?: boolean;
  helperText?: string | false;
  handlePickerColorChange: ColorChangeHandler;
}

const ColorPicker = ({
  name,
  id,
  label,
  value,
  onChange,
  error,
  helperText,
  handlePickerColorChange,
}: Props): ReactElement => {
  const [color, setColor] = useState<string>(value);

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
        name={name}
        id={id}
        label={label}
        value={value}
        onChange={(event) => {
          setColor(event.target.value);
          onChange(event);
        }}
        error={error}
        helperText={helperText}
        fullWidth
        sx={{ mb: 2 }}
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
      <CirclePicker
        color={color}
        onChangeComplete={(color, event) => {
          handlePickerColorChange(color, event);
          setColor(color.hex);
        }}
      />
    </Box>
  );
};

export default ColorPicker;
