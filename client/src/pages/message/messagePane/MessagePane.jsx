import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function MessagePane(props) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Box
        width={isOpen ? '70%' : '100%'}
        sx={{
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: (theme) => theme.transitions.create(['width']),
        }}
      >
        <Button onClick={() => setIsOpen(!isOpen)}>Open</Button>
        ga
      </Box>
      <Box
        width={isOpen ? '30%' : '0'}
        sx={{
          transition: (theme) => theme.transitions.create(['width']),
        }}
      >
        ga
      </Box>
    </>
  );
}

export default MessagePane;
