import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const setDataLS = (data) =>{
  localStorage.setItem('id',data.data.data.id);
  localStorage.setItem('nombre',data.data.data.nombre);
  localStorage.setItem('apellido',data.data.data.apellido);
  localStorage.setItem('email',data.data.data.email);
  localStorage.setItem('otpHabilitado',data.data.data.otp_habilitado);
}

export default function SignInSide() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try{
        axios
        .post("http://localhost:3010/users/login", {
            email: data.get('email'),
            password: data.get('password'),
        })
        .catch(function (error){
          alert(error.response.data.data);
        })
        .then((response) => {
          if (response.data.message === "OK") {
            setDataLS(response.data);
          }
          if (localStorage.getItem('otpHabilitado') === "false") {
            navigate('/home');
          } else {
            handleOpen();
          }
        });
      }catch(err){
        alert(err);
      }
  };

  const validateOTP = (event) => {
    event.preventDefault();
    const usuarioId = localStorage.getItem('id');
    try {
        axios
            .post(`http://localhost:3010/users/otp/validate/${usuarioId}`, {
                token: token
            })
            .catch(function (error) {
                alert('Código incorrecto');
            })
            .then((res) => {
                const { data } = res;
                if (data.message === "OK") {
                    setOpenModal(false);
                    navigate('/home');
            }});
    } catch (err) {
        alert(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/vector-gratis/solicitud-banca-internet_1284-12674.jpg?w=826&t=st=1674924545~exp=1674925145~hmac=9477d9a530410949a3fa8f2ca7d59eea5704af9b95ec3d0d7e7c574c0e608f51)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                $
            </Avatar>
            <Typography component="h1" variant="h5">
              Bienvenido a SIRU Financiero
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresa
              </Button>
              {localStorage.getItem('otpHabilitado') === "true" ? (
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box variant="rounded"
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: 2,
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center'
                    }}
                  >
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Verificar Código
                    </Typography>
                    <TextField
                      id="token"
                      name="token"
                      onChange={(e) => setToken(e.target.value)}
                      sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          m: 'auto',
                          height: 80,
                          width: 300
                      }}
                    />
                    <Button variant="contained" color="success" onClick={validateOTP}
                      sx={{ m: 'auto', maxWidth: 300 }}>
                      Validar
                    </Button>
                  </Box>
                </Modal>
              ) : ('')}
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"No tienes una cuenta? Registrate."}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}