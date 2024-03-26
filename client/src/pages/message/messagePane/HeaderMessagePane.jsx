import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import CircleIcon from '@mui/icons-material/Circle';
import { toggleMessagesPane } from '~/utils/toggleMessagePane';
import { stringAvatar, stringToColor } from '~/utils/stringAvatar';

function HeaderMessagePane(props) {
  const { sender } = props;
  const { mode, setMode } = useColorScheme();

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: (theme) =>
          mode === 'light' ? theme.devSchema.backgroundBodyLight : theme.devSchema.backgroundBodyDark,
      }}
      py={{ xs: 1, md: 1 }}
      px={{ xs: 1, md: 2 }}
    >
      <Stack direction={'row'} spacing={{ xs: 1, md: 2 }} alignItems={'center'}>
        <IconButton
          variant="plain"
          color="neutral"
          size="small"
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
          }}
          onClick={() => toggleMessagesPane()}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Avatar
          alt="avtar"
          {...stringAvatar(sender?.username || 'Minh An test')}
          sx={{
            height: 64,
            width: 64,
            bgcolor: stringToColor(sender?.username || 'Minh An test'),
          }}
        />
        <div>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="subtitile2" fontSize={'20px'} fontWeight={500} noWrap>
              {sender?.username || 'Minh An test'}
            </Typography>
            {sender?.online ? (
              <Chip
                icon={<CircleIcon color="success" />}
                label="Online"
                variant="outlined"
                sx={{
                  lineHeight: 'none',
                  height: '16px',
                  borderRadius: '4px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '8px',
                  },
                  '& .MuiChip-label': {
                    fontSize: '12px',
                  },
                }}
              />
            ) : undefined}
          </Box>
          <Typography variant="body2" fontWeight={300} fontSize={'16px'} color="text.tertiary">
            {sender?.email || 'Minh An test'}
          </Typography>
        </div>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <Button
          startIcon={<PhoneInTalkRoundedIcon />}
          size="small"
          variant="outlined"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          Call
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          View Profile
        </Button>
        <IconButton size="small" variant="plain" color="neutral">
          <MoreVertRoundedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default HeaderMessagePane;
