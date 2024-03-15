import Box from '@mui/material/Box';
import Header from '~/components/header/Header';
import BodyMessage from './BodyMessage';

function Message() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(64px, 300px) minmax(450px, 1fr)',
          md: 'minmax(200px, 400px) minmax(500px, 1fr) minmax(160px, 350px) ',
        },
        gridTemplateRows: '64px 1fr',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Header />
      <BodyMessage />
    </Box>
  );
}

export default Message;
