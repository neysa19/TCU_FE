import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResetPasswordDialog } from './resetPasswordDialog';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        .post("http://localhost:3020/users/resetPassword", {
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    try {
      const email = formData.get('email');
      const password = formData.get('password');
  
      if (!email || !password) {
        toast.error(`Por favor, ingresa tu correo y contraseña.`);
        return;
      }
  
      const response = await axios.post("http://localhost:3020/users/login", {
        email: email,
        password: password,
      });
  
      if (response.status === 200 && response.data.message === "OK") {
        setDataLS(response.data);
        navigate('/home');
      } else {
        toast.error(`Combinación de usuario y contraseña incorrectos`);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de inicio de sesión:", error);
      toast.error(`Error al iniciar sesión. Por favor, inténtalo de nuevo.`);
    }
  };

  return (
    <Container fluid>
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
        theme="dark"
      />
      <Row className="justify-content-center">
        <Col md={12} className="bg-image d-flex align-items-center justify-content-center">
          <div className="col-md-6 login-form-1">
            <h1>Bienvenido</h1>
            <h3>Educacion Financiera</h3>
            <h2>TCU-408</h2>
            <Form onSubmit={handleSubmit} className="w-15">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo" name='email'/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña"name='password' />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Ingresa
              </Button>
            </Form>
            <div className="d-grid mt-3">
              <Button variant="warning" className="w-100" onClick={() => setOpen(true)}>
                Olvidaste tu contraseña?
              </Button>
              <ResetPasswordDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />
            </div>
            <div className="mt-3 text-center">
              <a href="/register">No tienes una cuenta? Registrate.</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}