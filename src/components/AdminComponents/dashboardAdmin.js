
import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MonthBox from '../monthBox';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
export default function MainDashboard(props) {
    //const navigate = useNavigate();
    const [transactions, setTransactions] = useState([])
    const { open, onClose } = props;


    const transactionRef = useRef(transactions);

    useEffect(() => {
        transactionRef.current = transactions;
    }, [transactions]);

    useEffect(() => {
        try {
            const usuarioId = localStorage.getItem('selectedUser');
            axios
                .get(`http://localhost:3020/users/transactions/${usuarioId}`, {
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        console.log(response.data.data);
                        setTransactions(response.data.data.transactions);
                        console.log(transactions)
                    }
                });
        } catch (err) {
            alert(err);
        }
    }, []);

    const getCasillaFelizTransactions = () => {

        const filteredData = transactions.filter((item) => item.tab === "casilla_feliz");
        return filteredData;
    }
    return (
        <Dialog open={open} onClose={onClose} maxWidth={1200}>
        <DialogTitle>Casilla Feliz</DialogTitle>
        <DialogContent sx={{m:1, width:1200}}>
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
                </Grid> 
                <Box sx={{ m: 1 }}>
                    <Grid container wrap="nowrap" sx={{ overflow: "auto" }} >
                        <Grid item sx={{ minWidth: 300 }} id="1">
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Enero"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }} >
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Febrero"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Marzo"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Abril"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Mayo"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Junio"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Julio"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Agosto"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Setiembre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Octubre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Noviembre"} />
                        </Grid>
                        <Grid item sx={{ minWidth: 300 }}>
                            <MonthBox transactions={getCasillaFelizTransactions()} month={"Diciembre"} />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
        </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Salir</Button>
            </DialogActions>
        </Dialog>
    );
}
