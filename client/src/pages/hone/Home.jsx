import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
  backgroundColor: '#b2d8d8' /* pastel blue */,
  backgroundImage: 'url(src/assets/background.jpg)', // Đường dẫn đến hình nền
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '90vh',
  minWidth: '100%',
});

const StyledBox = styled(Box)({
  border: '1px solid #ccc',
  borderRadius: 2,
  boxShadow: 3,
  marginBottom: '2rem',
  minHeight: '100%', // Đảm bảo StyledBox mở rộng để lấp đầy StyledContainer
});

const StyledTypography = styled(Typography)({
  color: 'Black',
  padding: '1rem',
  border: '1px solid #ccc',
  //marginBottom: '2rem',
});
const CustomStyledTypography = styled(Typography)({
  color: 'Black', // Màu chữ
  fontSize: '2rem', // Kích thước chữ
  fontWeight: 'bold', // Độ đậm
  marginBottom: '1rem', // Khoảng cách dưới
});
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="md">
      <StyledBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <CustomStyledTypography variant="h3" component="h1" gutterBottom>
          Welcome to Capstone chat app!
        </CustomStyledTypography>
        <StyledTypography variant="body1" gutterBottom>
          Đây là một trang web nhắn tin với nhau với độ bảo mật cao.
        </StyledTypography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/login');
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Sign up
          </Button>
        </Box>
      </StyledBox>
    </StyledContainer>
  );
};

export default LandingPage;
