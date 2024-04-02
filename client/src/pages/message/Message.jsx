import Box from '@mui/material/Box';
import Header from '~/components/header/Header';
import BodyMessage from './BodyMessage';

function Message() {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(min-content, min(30%, 400px)) 1fr',
          },
          gridTemplateRows: '64px 1fr',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Header />
        <BodyMessage />
      </Box>
    </>
  );
}

export default Message;
