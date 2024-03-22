import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

function AddFriendDialog({ open, handleClose }) {
  const [friendUsername, setFriendUsername] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', avatar: 'https://via.placeholder.com/50' },
    { id: 2, username: 'user2', avatar: 'https://via.placeholder.com/50' },
    { id: 3, username: 'user3', avatar: 'https://via.placeholder.com/50' },
    { id: 4, username: 'user4', avatar: 'https://via.placeholder.com/50' },
    // Add more users as needed
  ]);

  const handleAddFriend = (username) => {
    console.log(`Adding friend: ${username}`);
    setFriendUsername('');
    handleClose();
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the username of the friend you want to add:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          id="search"
          label="Search"
          type="text"
          fullWidth
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <List>
          {filteredUsers.map(user => (
            <ListItem key={user.id} button>
              <ListItemAvatar>
                <Avatar alt={user.username} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.username} />
              <Button onClick={() => handleAddFriend(user.username)}>Add</Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddFriendDialog;
