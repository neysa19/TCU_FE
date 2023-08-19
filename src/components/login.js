import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResetPasswordDialog } from './resetPasswordDialog';

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

const setDataLS = (data) => {
  localStorage.setItem('token', data.data.token);
  const decoded = jwt_decode(data.data.token);
  const usuarioId = decoded.user._id;
  localStorage.setItem('usuarioId', usuarioId);
  localStorage.setItem('rol', decoded.user.rol)

}

export default function SignInSide() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleFormSubmit = ({ correo }) => {
    try {
      axios
        .post("https://calculadora-be.herokuapp.com/users/resetPassword", {
          email: correo
        })
        .catch(function (error) {
          console.log(error.response.data.data);
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.message);
          if (response.data.message === "OK") {
            toast.success(`Correo enviado a: ${correo}`)
          }
        });
    } catch (err) {
      alert(err);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      axios
        .post("https://calculadora-be.herokuapp.com/users/login", {
          email: data.get('email'),
          password: data.get('password'),
        })
        .catch(function (error) {
          toast.error(`Combinacion de Usuario y contraseña incorrectos`);
        })
        .then((response) => {
          if (response.data.message === "OK") {
            setDataLS(response.data);
            navigate('/home');
          }
        });
    } catch (err) {
      alert(err);
    }
  };

  return (

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
              Bienvenido a TCU-408 Educacion Financiera
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
              <Grid container>
              <Grid item>
                  <Button variant="contained" color="warning" sx={{ width: 300, mb: 2 }} onClick={() => setOpen(true)}>
                    Olvidaste tu contraseña?
                  </Button>
                  <ResetPasswordDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />
                </Grid>
                <Grid item xs="12">
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