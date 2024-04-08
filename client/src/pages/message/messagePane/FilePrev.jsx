import { useColorScheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import truncateText from '~/utils/truncate';
import { useDispatch } from 'react-redux';
import { resetMetaData } from '~/redux/feature/message/messageSlice';

function FilePrev({ filename = 'hhman test', size = '12.2MB test' }) {
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          mode === 'light' ? theme.devSchema.backgroundBodyLight : theme.devSchema.backgroundBodyDark,
        border: '2px solid',
        borderColor: 'divider',
        px: 1.75,
        py: 1.25,
        borderRadius: '12px',
        position: 'relative',
      }}
    >
      <Avatar
        sx={{
          position: 'absolute',
          right: -5,
          top: -5,
          height: '16px',
          width: '16px',
          fontSize: '12px',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#616161',
          },
        }}
        sizes="small"
        onClick={() => {
          dispatch(resetMetaData());
        }}
      >
        <CloseIcon fontSize="inherit" />
      </Avatar>
      <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
        <Avatar sx={{ bgcolor: 'primary.main' }} sizes="small">
          <InsertDriveFileRoundedIcon />
        </Avatar>
        <div>
          <Typography fontSize={'12px'}>{truncateText(filename, 10)}</Typography>
          <Typography variant="body2" fontSize={'12px'}>
            {size}
          </Typography>
        </div>
      </Stack>
    </Box>
  );
}

export default FilePrev;
