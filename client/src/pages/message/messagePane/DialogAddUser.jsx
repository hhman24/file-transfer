import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function AddFriendDialog({ open, handleClose }) {
  const [friendUsername, setFriendUsername] = useState('');

  const handleAddFriend = () => {
    // Logic to add friend here, using friendUsername state
    console.log(`Adding friend: ${friendUsername}`);
    // Reset the friendUsername state
    setFriendUsername('');
    // Close the dialog
    handleClose();
  };

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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddFriend} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddFriendDialog;
