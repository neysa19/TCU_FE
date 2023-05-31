
import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AddTransactionDialog } from './presupuestoDialog';
import Box from '@mui/material/Box';
import MonthBoxPresupuesto from './monthBoxPresupuesto';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Presupuesto() {
    //const navigate = useNavigate();
    const [transactions, setTransactions] = useState([])


    const transactionRef = useRef(transactions);

    useEffect(() => {
        transactionRef.current = transactions;
    }, [transactions]);

    useEffect(() => {
        try {
            const usuarioId = localStorage.getItem('usuarioId')
            axios
                .get(`http://localhost:3020/users/transactions/${usuarioId}`, {
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        setTransactions(response.data.data.transactions);

                    }
                });
        } catch (err) {
            alert(err);
        }
    }, []);

    const [open, setOpen] = useState(false);

    const handleFormSubmit = ({ amount, description, category, month }) => {
        try {
            axios
                .post("http://localhost:3020/users/transactions", {
                    user: localStorage.getItem('usuarioId'),
                    description: description,
                    tab: "presupuesto",
                    amount: amount,
                    category: category,
                    month: month
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
    const getPresupuestoTransactions = () => {

        const filteredData = transactions.filter((item) => item.tab === "presupuesto");

        return filteredData;
    }
    const getPonderadoSalario = () => {
        const transactions = getPresupuestoTransactions();
        const filteredData = transactions.filter((item) => item.description === "Salario");
        let sum = 0;
        let ponderado = 0;
        for (let i = 0; i < filteredData.length; i++) {
            sum += filteredData[i].amount;
        }

        ponderado = sum / filteredData.length;

        return ponderado;
    };

    return (
        <Container>
            <Paper>
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
                <Grid container sx={{ mb: 5 }}>
                    <Grid item xs="5" >
                        <Box sx={{ border: 1, ml:4, mt:2 }} >
                        <Typography variant="h5" sx={{ ml: 11, mt: 2, mb:2 }}>
                            Salario promedio: {getPonderadoSalario()}
                        </Typography>
                        </Box>

                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" sx={{ ml: 15, mt: 3, mr: 2 }} onClick={() => setOpen(true)}>
                            + Agregar Transaccion
                        </Button>
                    </Grid>

                    <AddTransactionDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />

                </Grid>
                <Box sx={{ m: 1 }}>
                    <Grid container wrap="nowrap" sx={{ overflow: "auto" }} >
                        <Grid item sx={{ minWidth: 300 }} id="1">
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Enero"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }} >
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Febrero"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Marzo"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Abril"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Mayo"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Junio"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Julio"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Agosto"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Setiembre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Octubre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Noviembre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBoxPresupuesto transactions={getPresupuestoTransactions()} month={"Diciembre"} />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>

    );
}
