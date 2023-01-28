import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';

const columns = [
    { id: '1', label: 'Lunes'},
    { id: '2', label: 'Martes'},
    { id: '3', label: 'Miércoles'},
    { id: '4', label: 'Jueves'},
    { id: '5', label: 'Viernes'},
    { id: '6', label: 'Sábado'},
    { id: '7', label: 'Domingo'}
];

export default function Schedules() {
    const [day, setDay] = React.useState('');
    const [time, setTime] = React.useState('');

    const handleChangeDay = (event) => {
        setDay(event.target.value);
    };

    const handleChangeTime = (newValue) => {
        setTime(newValue);
      };

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const usuario = localStorage.getItem('id')
        axios
            .get(`http://localhost:3010/schedules/${usuario}`, {
                headers: {
                }
            })
            .then((res) => {
                const { data } = res;
                setSchedules(data.data);
            });
    }, []);

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 350, width: '100%', alignItems: 'center' }}>
                        <Typography
                            variant="h4"
                            color="inherit"
                            noWrap
                            align="center"
                            sx={{ flexGrow: 1, height: 10 }}
                        >
                            Horario
                        </Typography>
                        <Box component="form"
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                width: 300
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Día</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={day}
                                        label="Day"
                                        onChange={handleChangeDay}
                                        >
                                            <MenuItem value={1}>Lunes</MenuItem>
                                            <MenuItem value={2}>Martes</MenuItem>
                                            <MenuItem value={3}>Miércoles</MenuItem>
                                            <MenuItem value={4}>Jueves</MenuItem>
                                            <MenuItem value={5}>Viernes</MenuItem>
                                            <MenuItem value={6}>Sábado</MenuItem>
                                            <MenuItem value={0}>Domingo</MenuItem>
                                        </Select>
                                        <Button type="submit" variant="contained" color="success"
                                            sx={{
                                                m: 4
                                            }}
                                        >
                                            Agregar
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                        <Paper sx={{ width: '100%' }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={'center'}
                                                style={{ top: 57, minWidth: 140 }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {schedules.map((schedule) => {
                                        return (
                                            <TableRow
                                                key={schedule.day_of_week}
                                            >
                                                {columns.map((column) => {
                                                    console.log(schedule.day_of_week);
                                                    console.log(column.id);
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={'center'}
                                                        >
                                                            {schedule.day_of_week === column.id ? schedule.time_of_day : ''}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
