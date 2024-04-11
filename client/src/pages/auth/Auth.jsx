import { useColorScheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Backdrop from '@mui/material/Backdrop';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GoogleIcon from '~/components/Svg/GoogleIcon';
import ModeToggle from '~/components/toggle/ModeToggle';
import Inputv1 from '~/components/input/Inputv1';
import * as yup from 'yup';
import { grey } from '@mui/material/colors';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '~/redux/feature/auth/authSlice';
import { generateKey } from '~/utils/generateKey';
import { useRef } from 'react';

const schema = yup.object().shape({
  email: yup.string().required('email is required').email(),
  privateKey: yup.string().required('No password provided.'),
});

function Auth() {
  const { mode, setMode } = useColorScheme();
  const { error, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileRef = useRef(null);
  const selectFile = () => fileRef.current?.click();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      privateKey: '',
      rememberMe: false,
    },
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setValue('privateKey', reader.result);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      // encrypt timestamp before send and decode private key
      const decodePrivateKey = atob(data.privateKey);
      const signMsg = await generateKey.signMessage(decodePrivateKey);

      await dispatch(loginUser({ email: data.email, message: signMsg.time, signature: signMsg.signature }))
        .unwrap()
        .then(() => {
          navigate('/message');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            transition: 'width var(--Transition-duration)',
            transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
            position: 'relative',
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
                  gap: 2,
                },
                ['& .MuiFormLabel-asterisk']: {
                  visibility: 'hidden',
                },
              }}
            >
              <Stack gap={2} sx={{ mb: 2 }}>
                <Stack gap={1}>
                  <Typography variant="h4" fontWeight={400}>
                    Sign in
                  </Typography>
                  <Typography variant="body2">
                    New to Chatting ? <Link to={'/auth-reg'}>Sign up !</Link>
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

              <Divider
              // sx={(theme) => ({
              //   [theme.getColorSchemeSelector('light')]: {
              //     color: { xs: '#FFF', md: 'text.tertiary' }
              //   }
              // })}
              >
                or
              </Divider>

              <Stack sx={{ mt: 2 }}>
                <Collapse in={error ? true : false}>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                </Collapse>
                <form>
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
                    <FormLabel
                      sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}
                      error={!!errors['privateKey']}
                    >
                      Private Key
                      <Tooltip
                        title="Import Private Key"
                        placement="right-end"
                        slotProps={{
                          popper: {
                            sx: {
                              [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                                {
                                  marginLeft: '0px',
                                },
                            },
                          },
                        }}
                      >
                        <IconButton
                          variant="outlined"
                          color="neutral"
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent',
                              color: 'primary.main',
                            },
                          }}
                          onClick={selectFile}
                        >
                          <UploadFileIcon
                            sx={{
                              fontSize: '18px',
                              '&:hover': {
                                color: 'inherit',
                              },
                            }}
                          />

                          <input
                            ref={fileRef}
                            type="file"
                            accept="text/plain"
                            onChange={(e) => handleFileChange(e)}
                            style={{
                              clip: 'rect(0 0 0 0)',
                              clipPath: 'inset(50%)',
                              height: 1,
                              overflow: 'hidden',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              whiteSpace: 'nowrap',
                              width: 1,
                              display: 'none',
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </FormLabel>

                    <Controller
                      name="privateKey"
                      control={control}
                      render={() => (
                        <>
                          <Inputv1
                            name={'privateKey'}
                            type={'password'}
                            id={'privateKey'}
                            register={register}
                            errors={errors}
                          />
                        </>
                      )}
                    />
                    <FormHelperText error>{errors['privateKey'] ? errors['privateKey']?.message : ' '}</FormHelperText>
                  </FormControl>

                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => <Checkbox {...field} />}
                          />
                        }
                        label="Remember me"
                      />
                      <Link href="/auth-forgot-password">Forgot your password?</Link>
                    </Box>
                    <Button type="submit" fullWidth variant="contained" onClick={handleSubmit(onSubmit)}>
                      Sign in
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>

            {/* footer */}
            <Box component="footer" sx={{ mb: 1 }}>
              <Typography variant="body2" textAlign="center">
                © Your company {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: '100%',
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: '23% 0% 0% 24% / 27% 10% 10% 30%',
            left: { xs: 0, md: '50vw' },
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
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </>
  );
}

export default Auth;
