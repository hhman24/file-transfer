import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

function AvatarWithStatus(props) {
  const { online = false, ...other } = props;

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
          {...other}
          sx={{
            width: 44,
            height: 44,
          }}
        />
      </Badge>
    </div>
  );
}

export default AvatarWithStatus;
