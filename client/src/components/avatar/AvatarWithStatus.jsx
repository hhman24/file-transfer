import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { stringAvatar, stringToColor } from '~/utils/stringAvatar';

function AvatarWithStatus(props) {
  const { online = false, senderName } = props;

  return (
    <div>
      <Badge
        overlap="circular"
        color={online ? 'success' : ''}
        variant="dot"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            width: '10px',
            height: '10px',
          },
        }}
      >
        <Avatar
          {...stringAvatar(senderName)}
          sx={{
            width: 44,
            height: 44,
            bgcolor: stringToColor(senderName),
          }}
        />
      </Badge>
    </div>
  );
}

export default AvatarWithStatus;
