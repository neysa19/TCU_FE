
import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import Box from '@mui/material/Box';


export default function Hacienda() {

    const [inputValue, setInputValue] = useState('');
    const [dataHacienda, setDataHacienda] = useState({});
    const [showDataGrid, setShowDataGrid] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios
                .get(`https://api.hacienda.go.cr/fe/ae?identificacion=${inputValue}`, {
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then((response) => {
                    console.log(response.data)
                    setDataHacienda(response.data)
                    setShowDataGrid(true)
                });
        } catch (err) {
            alert(err);
        }
        console.log('Submitted value:', inputValue);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <Container>
            <Paper>

                <form onSubmit={handleSubmit} >
                    <Grid container justifyContent="center">
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <TextField
                                label="Cedula física o jurídica"
                                value={inputValue}
                                onChange={handleInputChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Buscar
                            </Button>
                            </Grid>
                        </Grid>
                </form>

                <Grid container sx={{ m: 5 }}>

                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 5 }}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography variant="h5" >
                                Nombre: {dataHacienda.nombre}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>

                    <Grid item xs={6}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography>
                            Identificación: { dataHacienda.tipoIdentificacion === '01' ? 'Física' : 'Jurídica'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 8 }}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography>
                                Régimen: {dataHacienda.regimen?.descripcion}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 5 }}>
                        <Box style={{ textAlign: 'center' }} >
                            <Typography variant="h5">
                                Situacion Tributaria
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography>
                                Moroso: {dataHacienda.situacion?.moroso}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography>
                                Omiso: {dataHacienda.situacion?.omiso}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography>
                                Estado: {dataHacienda.situacion?.estado}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ mb: 10 }}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography>
                                Administracion Tributaria: {dataHacienda.situacion?.administracionTributaria}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography variant="h5">
                                Actividades
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                {showDataGrid ? <TableContainer component={Paper}>
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Tipo</TableCell>
                                <TableCell align="center">Código</TableCell>
                                <TableCell align="center">Descripcion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataHacienda.actividades.map((actividad) => (
                                <TableRow>
                                    <TableCell align="center">{actividad.estado}</TableCell>
                                    <TableCell align="center">{actividad.tipo}</TableCell>
                                    <TableCell align="center">{actividad.codigo}</TableCell>
                                    <TableCell align="center">{actividad.descripcion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : null}

            </Paper>
        </Container>
    );
}
