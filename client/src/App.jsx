import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Auth from '~/pages/auth/Auth';
import Register from '~/pages/auth/Register';
import Message from './pages/message/Message';

function App() {
  return (
    <>
      {/* <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      </Container> */}

      {/* <Auth /> */}
      {/* <Register /> */}
      <Message />
    </>
  );
}

export default App;
