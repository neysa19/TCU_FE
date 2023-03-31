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
import { AddTransactionDialog } from './patrimonioListaDialog';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

export default function ListaActivos(transactions) {

    const [razones, setRazones] = useState([]);
    const [open, setOpen] = useState(false);

    const handleFormSubmit = ({ amount, description, category }) => {
        try {
            axios
                .post("https://calculadora-be.herokuapp.com/users/transactions", {
                    user: localStorage.getItem('usuarioId'),
                    description: description,
                    tab: "patrimonio",
                    amount: amount,
                    category: category,
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    console.log(response);
                    if (response.data.message === "Created") {
                        console.log(response.data.data)
                        toast.success(`Transaccion creada`)
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    }
                });
        } catch (err) {
            alert(err);
        }
    };
    const handleDelete = (id) => {
        console.log("Deleting this: ", id)
      };
    return (
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
                                    Lista de Bienes
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="success" sx={{ width: 180, mb: 2 }} onClick={() => setOpen(true)}>
                                    + Agregar
                                </Button>
                                <AddTransactionDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />
                            </Grid>

                        </Grid>
                        <Box sx={{ width: '100%', mb: 5 }}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell align="center">Categoria</TableCell>
                                            <TableCell align="center">Monto</TableCell>
                                            <TableCell align="center">Depreciacion anual</TableCell>
                                            <TableCell align="center">Depreciacion mensual</TableCell>
                                            <TableCell align="right"> </TableCell> {/* Add a new column for the delete button */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactions.transactions.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell component="th" scope="row">
                                                    {user.description}
                                                </TableCell>
                                                <TableCell align="center">{user.category}</TableCell>
                                                <TableCell align="center">₡ {user.amount}</TableCell>
                                                <TableCell align="center">₡ {((parseInt(user.amount)) * 0.10).toFixed(2)}</TableCell>
                                                <TableCell align="center">₡ {(((parseInt(user.amount)) * 0.10) / 12).toFixed(2)}</TableCell>
                                                <TableCell align="right">
                                                    <Button variant="contained" color="error" onClick={() => handleDelete(user._id)}>Borrar</Button> {/* Render a delete button in each row */}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}
