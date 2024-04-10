
import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

export default function Patrimonio(props) {
    //const navigate = useNavigate();
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
    const [value, setValue] = React.useState(1);
    const { open, onClose } = props;

    const transactionRef = useRef(transactions);

    useEffect(() => {
        transactionRef.current = transactions;
    }, [transactions]);

    useEffect(() => {
        try {
            const usuarioId = localStorage.getItem('selectedUser')
            axios
                .get(`http://localhost:3020/users/transactions/${usuarioId}`, {
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

    return (
        <Dialog open={open} onClose={onClose} maxWidth={1200}>
            <DialogTitle>Patrimonio</DialogTitle>
            <DialogContent sx={{ m: 1, width: 1200 }}>
                <Container>
                    <Paper>
                        <Box sx={{ m: 1 }}>
                            <Grid container>
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

                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            m: 'auto',
                                            height: 60,
                                            width: 200
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Salir</Button>
            </DialogActions>
        </Dialog >

    );
}
