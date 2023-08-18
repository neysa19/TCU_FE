
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Patrimonio() {
    const [transactions, setTransactions] = useState([])
    const [inputValues, setInputValues] = useState({
        deudas: '',
        ingresos: '',
        patrimonioPen: '',
        patrimonioUlt: '',
        ahorros: '',
        asociacionEmp: '',
        asociacionPat: '',
    });
    const handleInputChange = (event) => {
        console.log("Change")
        const { name, value } = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        try {
            const usuarioId = localStorage.getItem('usuarioId')
            axios
                .get(`https://calculadora-be.herokuapp.com/users/transactions/${usuarioId}`, {
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        setTransactions(response.data.data.transactions);
                        for (const transaction of transactions) {
                            if (transaction.tab === "patrimonio") {
                                setInputValues((prevValues) => ({
                                    ...prevValues,
                                    [transaction.description]: transaction.amount,
                                }));
                            }
                        }

                    }
                });
        } catch (err) {
            alert(err);
        }
    }, [transactions]);

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            for (const inputName in inputValues) {
                if (inputValues.hasOwnProperty(inputName)) {
                    if (inputValues[inputName] !== "") {
                        axios
                            .post("https://calculadora-be.herokuapp.com/users/transactions", {
                                user: localStorage.getItem('usuarioId'),
                                description: inputName,
                                tab: "patrimonio",
                                amount: inputValues[inputName],
                                category: "razones"
                            })
                            .catch(function (error) {
                                console.log(error.response.data.data);
                            })
                            .then((response) => {
                                console.log(response);
                            });
                    }
                }
            }
            toast.success(`Datos guardados`)
        } catch (err) {
            alert(err);
        }

    };

    const downloadExcelFile = () => {
        const fileUrl = '/files/Patrimonio.xlsx'; // Relative path to the Excel file
        window.open(fileUrl, '_blank'); // Opens the file in a new tab or window
    };

    return (
        <Container>
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
            <Paper>
                <Box sx={{ m: 1 }}>
                    <Grid container>
                        <Grid item sx={{ minWidth: 400, display: 'flex', justifyContent: 'center' }} xs={12}>
                            <img src="https://icon-library.com/images/animated-gif-icon/animated-gif-icon-6.jpg" alt="Download GIF" style={{ height: '100px', marginRight: '1px', maxHeight: '100%' }} />
                            <Button variant="contained" color="info" sx={{ width: 260, m: 2 }} onClick={downloadExcelFile}>
                                Descargar hoja de patrimonio
                            </Button>
                            <img src="https://icon-library.com/images/animated-gif-icon/animated-gif-icon-6.jpg" alt="Download GIF" style={{ height: '100px', marginLeft: '1px', maxHeight: '100%' }} />

                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color='#6d6e6d' sx={{ textAlign: 'center', marginTop: 2 }}>Total Deudas de su ultimo mes con datos en Casilla Feliz</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="Deudas"
                                name="deudas"
                                label="Total Deudas"
                                value={inputValues.deudas}
                                required
                                onChange={handleInputChange}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    height: 60,
                                    width: 200
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ margin: 2 }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color='#6d6e6d' sx={{ textAlign: 'center', marginTop: 2 }}>Total Ingresos de su ultimo mes con datos en Casilla Feliz</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="ingresos"
                                name="ingresos"
                                label="Total Ingresos"
                                value={inputValues.ingresos}
                                required
                                onChange={handleInputChange}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    height: 60,
                                    width: 200
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ margin: 2 }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color='#6d6e6d' sx={{ textAlign: 'center', marginTop: 2 }}>Monto Patrimonio de su penultimo mes con datos</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="patrimonioPen"
                                name="patrimonioPen"
                                label="Total Patrimonio Penultimo mes"
                                value={inputValues.patrimonioPen}
                                required
                                onChange={handleInputChange}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    height: 60,
                                    width: 200
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ margin: 2 }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color='#6d6e6d' sx={{ textAlign: 'center', marginTop: 2 }}>Monto Patrimonio de ultimo mes con datos</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="patrimonioUlt"
                                name="patrimonioUlt"
                                label="Total Patrimonio Ultimo mes"
                                value={inputValues.patrimonioUlt}
                                required
                                onChange={handleInputChange}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    height: 60,
                                    width: 200
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ margin: 2 }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color='#6d6e6d' sx={{ textAlign: 'center', marginTop: 2 }}>Total Ahorros de su ultimo mes con datos en Hoja de Patrimonio</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="ahorros"
                                name="ahorros"
                                label="Total Ahorros"
                                value={inputValues.ahorros}
                                required
                                onChange={handleInputChange}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    height: 60,
                                    width: 200
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ margin: 2 }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color='#6d6e6d' sx={{ textAlign: 'center', marginTop: 2 }}>Total Asociacion Sol (empleado) de su ultimo mes con datos en Hoja de Patrimonio</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="asociacionEmp"
                                name="asociacionEmp"
                                label="Total Asociacion Solidarista Empleado"
                                value={inputValues.asociacionEmp}
                                required
                                onChange={handleInputChange}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    height: 60,
                                    width: 200
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ margin: 2 }} />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color='#6d6e6d' sx={{ textAlign: 'center', marginTop: 2, marginBottom: 4 }}>Total Asociacion Sol (patrono) de su ultimo mes con datos en Hoja de Patrimonio</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="asociacionPat"
                                name="asociacionPat"
                                label="Total Asociacion Solidarista Patrono"
                                value={inputValues.asociacionPat}
                                required
                                onChange={handleInputChange}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    m: 'auto',
                                    height: 60,
                                    width: 200
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                            <Button variant="contained" color="success" sx={{ width: 200, mr: 5, mb: 2 }} onClick={handleSubmit}>
                                Guardar Datos
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>

    );
}
