import { useColorScheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';

function Inputv1({
  id,
  name,
  type,
  autoFocus = false,
  required = false,
  disabled = false,
  placeholder = '',
  register,
  errors,
}) {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <InputBase
        sx={{
          'label + &': {
            marginTop: 1,
          },
          '& .MuiInputBase-input': {
            borderRadius: 2,
            position: 'relative',
            backgroundColor: mode === 'light' ? '#F3F6F9' : '#1A2027',
            border: '2px solid',
            borderColor: mode === 'light' ? '#E0E3E7' : '#2D3843',
            fontSize: 16,
            padding: '10px 12px',
            transition: (theme) => theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
            '&:focus': {
              borderColor: errors[id] ? 'error.main' : 'primary.main',
            },
          },
        }}
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
        autoFocus={autoFocus}
        disabled={disabled}
        {...register(id, { required })}
        error={!!errors[id]}
      />
    </>
  );
}

export default Inputv1;
