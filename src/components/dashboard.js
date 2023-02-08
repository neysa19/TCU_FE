
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import HistorialPosts from './historialPost';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function MainDashboard() {
    const navigate = useNavigate();
    const [anno, setAnno] = useState('');

    const handleChange = (event) => {
        setAnno(event.target.anno);
        console.log(anno)
    };
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Sept", "Octubre", "Noviembre", "Diciembre"];

    /*  useEffect(() => {
         try {
             axios
                 .post("http://localhost:3010/posts/cola", {
                     usuario: localStorage.getItem('id'),
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
     }, []); */

    return (
        <Container>
            <Paper >
                <Button variant="contained" color="success" sx={{ m: 3 }}>
                    + Salario Neto
                </Button>
                <Button variant="contained" color="success" sx={{ m: 3 }}>
                    + Otros Ingresos
                </Button>
                <Button variant="contained" color="success" sx={{ m: 3 }}>
                    + Ahorros
                </Button>
                <Button variant="contained" color="success" sx={{ m: 3 }}>
                    + Deuda
                </Button>
                <Button variant="contained" color="success" sx={{ m: 3 }}>
                    + Gasto Recurrente
                </Button>
                <FormControl sx={{minWidth:120}}>
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
