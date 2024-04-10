import * as React from 'react';
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Dictionary from '../dictionary';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
export default function Razones(props) {

    const [razones, setRazones] = useState([]);
    const { open, onClose } = props;


    useEffect(() => {
        try {
            const usuarioId = localStorage.getItem('selectedUser')
            axios
                .get(`http://localhost:3020/users/razones/${usuarioId}`, {
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        setRazones(response.data.data.Razoness);
                    }
                });
        } catch (err) {
            alert(err);
        }

    }, []);

    const definiciones = {
        'Ingreso Familiar': ['Sumatoria de los ingresos disponibles de la familia'],
        'Salario disponible': ['Salario bruto menos las cargas sociales, impuestos sobre la renta y pensiones alimenticias'],
        'Monto mínimo de supervivencia (MMS)': ['Sumatoria de los gastos recurrentes mas las cuotas de los créditos'],
        'Reservas financieras a la vista': ['Suma de efectivo, saldo en cuentas a la vista, monto del FCLy CxC, saldo asociación solidarista.'],
        'Gastos recurrentes': ['Vivienda, alimentación, transporte, servicios, salud y educación.']
    };
    const otros_razones = {
        'Decil poblacional según ingreso': ['Total de ingresos según decil de ingresos ENAHO'],
        'Nivel normativo de ingreso': ['Total de ingresos / Salario mínimo de ley'],
        'Nivel básico de ingreso': ['Total de ingresos / Canasta Básica (INEC)'],
        'Rango de retención de riqueza (anual)': ['Total patrimonio / total de años laborados'],
        'Rango de retención de riqueza (mensual)': ['Total patrimonio /  total de meses laborados']
    };
    const criterios = {
        'Rangos de reserva financiera': ['Menos de un mes = Critico', 'Entre uno y tres meses = Vulnerable', 'Entre tres y seis meses = Estable', 'Mas de seis meses = Sobresaliente'],
        'Rangos del nivel de endeudamiento': ['Menos de un 35% = Saludable', 'Entre 35% y 60% = Vulnerable', 'Entre 60% y 80% = Grave', 'Mas de 90% = Critico']
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth={1200}>
            <DialogTitle>Casilla Feliz</DialogTitle>
            <DialogContent sx={{ m: 1, width: 1200 }}>
                <Container sx={{ mt: 4, mb: 4 }}>
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

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%'
                                }}
                            >
                                <Grid container >
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" sx={{ mt: 1 }}>
                                            Razones de bienestar financiero
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                    </Grid>

                                </Grid>
                                <Box sx={{ width: '100%', mb: 5 }}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nombre</TableCell>
                                                    <TableCell align="center">Descripción</TableCell>
                                                    <TableCell align="center">Calculo</TableCell>
                                                    <TableCell align="center">Observacion</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {razones.map((user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell component="th" scope="row">
                                                            {user.emisor}
                                                        </TableCell>
                                                        <TableCell align="center">{user.emisor}</TableCell>
                                                        <TableCell align="center">{user.emisor}</TableCell>
                                                        <TableCell align="center">{user.emisor}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Typography variant="h6" style={{ textAlign: 'center' }} sx={{ mt: 3 }} >Criterios</Typography>
                                <Dictionary data={criterios} />
                                <Typography variant="h6" style={{ textAlign: 'center' }} sx={{ mt: 3 }} >Definiciones</Typography>
                                <Dictionary data={definiciones} />
                                <Typography variant="h6" style={{ textAlign: 'center' }} sx={{ mt: 3 }}>Otras razones de bienestar financiero</Typography>
                                <Dictionary data={otros_razones} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Salir</Button>
            </DialogActions>
        </Dialog>

    );
}
