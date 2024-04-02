import { forwardRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getListNotFriend } from '~/redux/feature/friend/friendSlice';
import AvatarWithStatus from '../avatar/AvatarWithStatus';
import { socket } from '~/utils/socket';
import { EVENT } from '~/utils/constants';
// import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../redux/slices/app';
// import { FriendElement, FriendRequestElement, UserElement } from '../../components/UserElement';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersList = () => {
  const dispatch = useDispatch();

  const { listNotFriend } = useSelector((state) => state.friends);
  const { userInfo } = useSelector((state) => state.auth.loginState);

  useEffect(() => {
    dispatch(getListNotFriend());
  }, [dispatch]);

  return (
    <>
      {listNotFriend.map((f, idx) => {
        return (
          <Stack direction="row" alignItems={'center'} justifyContent="space-between" key={idx}>
            <Stack direction="row" alignItems={'center'} spacing={2}>
              <AvatarWithStatus online={f.online} senderName={f.username} />
              <Stack spacing={0.3}>
                <Typography variant="subtitle2">{f.username}</Typography>
              </Stack>
            </Stack>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              {!f.conversation ? (
                <Button
                  onClick={() => {
                    socket.emit(EVENT.SEND_FRIEND_REQUEST, { to: f._id, from: userInfo._id }, () => {
                      alert('request sent');
                    });
                  }}
                >
                  + Add Friend
                </Button>
              ) : (
                <Button
                  disabled={f.conversation.userA === userInfo._id}
                  onClick={() => {
                    if (f.conversation.userA === userInfo._id) return;
                    socket.emit(EVENT.ACCEPT_FRIEND_REQUEST, { to: f._id, from: userInfo._id }, () => {
                      alert('request sent');
                    });
                  }}
                >
                  {f.conversation.userA === userInfo._id ? 'Pending' : 'Accept'}
                </Button>
              )}
            </Stack>
          </Stack>
        );
      })}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  // const [value, setValue] = useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4, zIndex: 10000 }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>{'USERS'}</DialogTitle>
      {/* <Stack p={2} sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
        </Tabs>
      </Stack> */}
      <DialogContent>
        <Stack sx={{ height: '100%' }}>
          <Stack spacing={2.4}>
            <UsersList />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
