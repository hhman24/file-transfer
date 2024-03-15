import { useColorScheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import { grey } from '@mui/material/colors';
import GoogleIcon from '~/components/Svg/GoogleIcon';
import ModeToggle from '~/components/toggle/ModeToggle';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';
import Inputv1 from '~/components/input/Inputv1';

const schema = yup.object().shape({
  email: yup.string().required('email is required').email(),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^[a-zA-Z0-9]{8,30}$/, 'Password can only contain Latin letters, numbers.'),
  username: yup.string().max(10, 'User name is so long').required('User name is required'),
});

function Register() {
  const { mode, setMode } = useColorScheme();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <Box
          sx={{
            height: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            right: { xs: 0, md: '50vw' },
            borderRadius: '0% 39% 36% 0% / 0% 48% 50% 10% ',
            transition: 'background-image var(--Transition-duration), left var(--Transition-duration) !important',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            backgroundColor: 'background.level1',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              mode == 'dark'
                ? 'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)'
                : 'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          }}
        ></Box>

        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            transition: 'width var(--Transition-duration)',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            left: { xs: 0, md: '50vw' },
            zIndex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            backdropFilter: 'blur(12px)',
            backgroundColor: (theme) =>
              mode === 'dark' ? theme.devSchema.darkBgBoxColor : theme.devSchema.lightBgBoxColor,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100dvh',
              width: '100%',
              px: 2,
            }}
          >
            {/* header */}
            <Box
              component="header"
              sx={{
                py: 3,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Box>
                  <SendIcon
                    color="primary"
                    sx={{
                      margin: '0 0 2px 0',
                      transform: 'rotate(-25deg)',
                      fontSize: 'xx-large',
                    }}
                  />
                </Box>
                <Typography fontSize="24px" fontWeight="500">
                  Capstone 2024 Chat
                </Typography>
              </Box>
              {/* <ColorSchemaToggle /> */}
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <ModeToggle />
              </Box>
            </Box>

            {/* body */}
            <Box
              component="main"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                width: 400,
                mx: 'auto',
                my: 'auto',
                py: 2,
                pb: 5,
                borderRadius: 'sm',
                '& form': {
                  display: 'flex',
                  flexDirection: 'column',
                },
                ['& .MuiFormLabel-asterisk']: {
                  visibility: 'hidden',
                },
              }}
            >
              <Stack gap={2}>
                <Stack gap={1}>
                  <Typography variant="h4" fontWeight={400}>
                    Create New Account
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    display: 'flex',
                    gap: 2,
                    color: mode === 'dark' ? 'whitesmoke' : 'black',
                    backgroundColor: mode === 'dark' ? grey[900] : grey[200],
                    '&:hover': {
                      backgroundColor: mode === 'dark' ? grey[800] : grey[300],
                      boxShadow: 'none',
                    },
                    boxShadow: 'none',
                  }}
                  fullWidth
                  variant="contained"
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>
              </Stack>

              <Divider>or</Divider>

              <Stack gap={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl required>
                    <FormLabel sx={{ fontWeight: 500 }} error={!!errors['username']}>
                      User Name
                    </FormLabel>
                    <Controller
                      name="username"
                      control={control}
                      render={() => (
                        <>
                          <Inputv1
                            name={'username'}
                            type={''}
                            id={'username'}
                            autoFocus={true}
                            register={register}
                            errors={errors}
                          />
                        </>
                      )}
                    />
                    <FormHelperText error>{errors['username'] ? errors['username']?.message : ' '}</FormHelperText>
                  </FormControl>

                  <FormControl required>
                    <FormLabel sx={{ fontWeight: 500 }} error={!!errors['email']}>
                      Email
                    </FormLabel>
                    <Controller
                      name="email"
                      control={control}
                      render={() => (
                        <>
                          <Inputv1
                            name={'email'}
                            type={''}
                            id={'email'}
                            autoFocus={true}
                            register={register}
                            errors={errors}
                          />
                        </>
                      )}
                    />
                    <FormHelperText error>{errors['email'] ? errors['email']?.message : ' '}</FormHelperText>
                  </FormControl>

                  <FormControl required>
                    <FormLabel sx={{ fontWeight: 500 }} error={!!errors['password']}>
                      Password
                    </FormLabel>
                    <Controller
                      name="password"
                      control={control}
                      render={() => (
                        <>
                          <Inputv1
                            name={'password'}
                            type={'password'}
                            id={'password'}
                            autoFocus={true}
                            register={register}
                            errors={errors}
                          />
                        </>
                      )}
                    />
                    <FormHelperText error>{errors['password'] ? errors['password']?.message : ' '}</FormHelperText>
                  </FormControl>

                  <Stack gap={2} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Link href="/auth-forgot-password">Forgot your password?</Link>
                    </Box>
                    <Button type="submit" fullWidth variant="contained">
                      Sign in
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>

            {/* footer */}
            <Box component="footer" sx={{ mb: 3 }}>
              <Typography variant="body2" textAlign="center">
                © Your company {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Register;
