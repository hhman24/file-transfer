import { useState } from 'react';
import Box from '@mui/material/Box';
import HeaderMessagePane from './HeaderMessagePane';

function MessagePane(props) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState('');
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Box
        width={'100%'}
        sx={{
          borderRight: '1px solid',
          borderColor: 'divider',
          // width: { xs: '100%', sm: '70%' },
          transition: 'transform 0.4s, width 0.4s',
        }}
      >
        <HeaderMessagePane sender={chat.sender} />
      </Box>
      {/* <Box
        width={isOpen ? '30%' : '0'}
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesSettingPane-slideIn, 0) + 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          width: { xs: '100%', sm: '30%' },
          top: 0,
          right: 0,
          zIndex: 9999,
          mt: '58px',
        }}
      >
        ga
      </Box> */}
    </>
  );
}

export default MessagePane;
