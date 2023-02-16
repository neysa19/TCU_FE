
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MyFormDialog from './casillaFelizDialog';


export default function MainDashboard() {
    const navigate = useNavigate();
    const [anno, setAnno] = useState('');
    const [transactions, setTransactions] = useState([])
    const handleChange = (event) => {
        setAnno(event.target.anno);
        console.log(anno)
    };
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Sept", "Octubre", "Noviembre", "Diciembre"];

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
                        setTransactions(response.data.data.data.transactions);
                    }
                });
        } catch (err) {
            alert(err);
        }
    }, []);

    const [open, setOpen] = useState(false);

    const handleFormSubmit = (formValues) => {
      console.log(formValues); // Do something with the form data
      try {
        axios
            .post("http://localhost:3020/users/transactions", {
                user: localStorage.getItem('usuarioId'),
                description: formValues.descripcion,
                tab:"casilla_feliz",
                amount: formValues.monto,
                category: formValues.category
            })
            .catch(function (error) {
                console.log(error.response.data.data);
            })
            .then((response) => {
                if (response.data.message === "OK") {
                    console.log(response.data.data)
                }
            });
    } catch (err) {
        alert(err);
    }
    };
    const getSalariosByMonth = () => {

    };
    return (
        <Container>
            <Paper >
                <Button variant="contained" color="success" sx={{ m: 3 }} onClick={() => setOpen(true)}>
                    + Agregar Transaccion
                </Button>
                <MyFormDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-controlled-open-select-label">Año</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={anno}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Grid container sx={{ mt: 3 }}>
                    {monthNames.map((monthName) => (
                        <Grid item xs={1} sx={{ border: 1 }} key={monthName}>
                            {monthName}
                        </Grid>

                    ))}
                </Grid>
            </Paper>
        </Container>

    );
}
