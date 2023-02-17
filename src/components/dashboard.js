
import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AddTransactionDialog } from './casillaFelizDialog';
import Box from '@mui/material/Box';
import MonthBox from './monthBox';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainDashboard() {
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
                    tab: "casilla_feliz",
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
                <Grid container>
                    <Grid item>
                        <Typography variant="h6" sx={{ display: "flex", m: 3 }}>
                            Leyenda para casilla feliz:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ width: 15, height: 18, bgcolor: "green", mt: 4, mr: 1 }}></Box>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ display: "flex", mt: 4, mr: 2 }}>
                            Buen estado
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ width: 15, height: 18, bgcolor: "yellow", mt: 4, mr: 1 }}></Box>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ display: "flex", mt: 4, mr: 2 }}>
                            Estado regular
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ width: 15, height: 18, bgcolor: "red", mt: 4, mr: 1 }}></Box>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ display: "flex", mt: 4 }}>
                            Mal estado
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" sx={{ ml: 15, mt: 2, mr: 2 }} onClick={() => setOpen(true)}>
                            + Agregar Transaccion
                        </Button>
                    </Grid>
                    <AddTransactionDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />

                </Grid>
                <Box sx={{ m: 1 }}>
                    <Grid container wrap="nowrap" sx={{ overflow: "auto" }} >
                        <Grid item sx={{ minWidth: 300 }} id="1">
                            <MonthBox transactions={transactions} month={"Enero"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }} >
                            <MonthBox transactions={transactions} month={"Febrero"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Marzo"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Abril"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Mayo"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Junio"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Julio"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Agosto"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Setiembre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Octubre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Noviembre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={transactions} month={"Diciembre"} />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>

    );
}
