import React, { useState, useEffect } from 'react';
import QRCode from "qrcode";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const theme = createTheme();

export default function UserSecurity() {
    const navigate = useNavigate();
    const usuarioId = localStorage.getItem('id');
    const [otpEnabled, setotpEnabled] = useState(false);
    const [token, setToken] = useState("");
    const [qrcodeUrl, setqrCodeUrl] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [secret, setSecret] = useState({
        otpauth_url: "",
        base32: ""
    });

    useEffect(() => {
        axios
            .get(`http://localhost:3010/users//${usuarioId}`, {
                headers: {
                }   
            })
            .then((res) => {
                const { data } = res;
                setotpEnabled(data.data.otp_habilitado);
            });
    }, [usuarioId]);

    const handleOpen = (event) => {
        event.preventDefault();   
        try {
            axios
                .post(`http://localhost:3010/users/otp/generate/${usuarioId}`)
                .catch(function (error) {
                    alert(error.response.data.data);
                })
                .then((res) => {
                    const { data } = res;
                    if (data.message === "OK") {
                        setSecret({
                            otpauth_url: data.otpauth_url,
                            base32: data.base32
                        });
                }});
        } catch (err) {
            alert(err);
        }
        setOpenModal(true);
    };

    useEffect(() => {
        QRCode.toDataURL(secret.otpauth_url).then(setqrCodeUrl);
      }, [secret]);

    const handleClose = (event) => {
        event.preventDefault();  
        try {
            axios
                .post(`http://localhost:3010/users/otp/verify/${usuarioId}`, {
                    token: token
                })
                .catch(function (error) {
                    alert(error.response.data.data);
                    setOpenModal(false);
                })
                .then((res) => {
                    const { data } = res;
                    if (data.message === "OK") {
                        setotpEnabled(true);
                        alert("Code Verified");
                        setOpenModal(false);
                        navigate(`/users/${usuarioId}`);
                }});
        } catch (err) {
            alert(err);
        }
    };

    const disableOTP = (event) => {
        event.preventDefault();  
        try {
            axios
                .post(`http://localhost:3010/users/otp/disable/${usuarioId}`)
                .catch(function (error) {
                    alert(error.response.data.data);
                    setOpenModal(false);
                })
                .then((res) => {
                    const { data } = res;
                    if (data.message === "OK") {
                        setotpEnabled(false);
                        alert("OTP Disabled");
                        navigate(`/users/${usuarioId}`);
                }});
        } catch (err) {
            alert(err);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ pt: 4, pb: 4, pl: 1, pr: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant="h4"
                                    color="inherit"
                                    noWrap
                                    align="center"
                                    sx={{ flexGrow: 1, height: 80 }}
                                >
                                    Autenticación de dos pasos
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="inherit"
                                    align="center"
                                    sx={{ flexGrow: 1, height: 80 }}
                                >
                                    La autenticación de dos pasos agrega una capa de seguridad adicional de seguridad a su cuenta al requerir más que solo una contraseña para iniciar sesión.
                                </Typography>
                                {otpEnabled ? (
                                    <Button variant="contained" color="success" onClick={disableOTP}
                                        sx={{ m: 'auto', maxWidth: 400 }}>
                                        Desactivar autenticación de dos pasos
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="success" onClick={handleOpen}
                                        sx={{ m: 'auto', maxWidth: 400 }}>
                                        Activar autenticación de dos pasos
                                    </Button>
                                )}
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
                                            Scanear código QR
                                        </Typography>
                                        <img src={`${qrcodeUrl}`} alt="qrCodeUrl" style={{ width: 200 }} />
                                        <Typography variant="h6" sx={{ m: 1 }}>
                                            Código de verificación
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
                                        <Button variant="contained" color="success" onClick={handleClose}
                                            sx={{ m: 'auto', maxWidth: 300 }}>
                                            Activar
                                        </Button>
                                    </Box>
                                </Modal>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
