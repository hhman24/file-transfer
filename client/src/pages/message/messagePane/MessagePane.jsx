import { useState } from 'react';
import Box from '@mui/material/Box';

function MessagePane(props) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState('');

  return (
    <>
      <Box>ga</Box>
    </>
  );
}

export default MessagePane;
