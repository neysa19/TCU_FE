
import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ListaActivos from './patrimonioListaActivos';
import MonthBox from './monthBoxPatrimonio';
export default function Patrimonio() {
    //const navigate = useNavigate();
    const [transactions, setTransactions] = useState([])
    const [value, setValue] = React.useState(1);


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

    const getPatrimonioTransactions = () => {

        const filteredData = transactions.filter((item) => item.tab === "patrimonio");

        return filteredData;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Paper>
                <Grid container sx={{ mb: 5 }}>
                    <Grid item xs="12" >
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab label="Balance Familiar" />
                                <Tab label="Lista Bienes" />
                            </Tabs>
                        </Box>
                    </Grid>
                </Grid>
                {value === 1 ? <ListaActivos transactions={getPatrimonioTransactions()} /> :
                    <Box sx={{ m: 1 }}>
                        <Grid container wrap="nowrap" sx={{ overflow: "auto" }} >
                            <Grid item sx={{ minWidth: 400 }} id="1">
                                <MonthBox transactions={getPatrimonioTransactions()} />
                            </Grid>
                            <Grid item sx={{ minWidth: 400 }} >
                                <MonthBox transactions={getPatrimonioTransactions()} />
                            </Grid>
                            <Grid item sx={{ minWidth: 400 }}>
                                <MonthBox transactions={getPatrimonioTransactions()} />
                            </Grid>
                            <Grid item sx={{ minWidth: 400 }}>
                                <MonthBox transactions={getPatrimonioTransactions()}/>
                            </Grid>
                            <Grid item sx={{ minWidth: 400 }}>
                                <MonthBox transactions={getPatrimonioTransactions()}/>
                            </Grid>
                        </Grid>
                    </Box>}
            </Paper>
        </Container>

    );
}
