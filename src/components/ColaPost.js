import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const columns = [
    { id: 'id', label: 'Id', minWidth: 50 },
    { id: 'plataforma', label: 'Plataforma', minWidth: 75 },
    {
        id: 'texto',
        label: 'Texto',
        minWidth: 75,
        align: 'right',
    },
    {
        id: 'fecha_creacion',
        label: 'Fecha de Creacion',
        minWidth: 140,
        align: 'right',
    },
    {
        id: 'fecha_publicacion',
        label: 'Fecha de Publicacion',
        minWidth: 140,
        align: 'right',
    },

    { id: 'borrar', label: 'Acciones' }
];



export default function ColaPost() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
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
                        setPosts(response.data.data)
                    }
                });
        } catch (err) {
            alert(err);
        }
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClick = value => () => {
        console.log(value);
        //Borrar post
        try {
            axios
                .post("http://localhost:3010/posts/borrarCola", {
                    id: value,
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        console.log(response.data.data)
                        toast.info('Post Borrado');

                    }
                });
        } catch (err) {
            alert(err);
        }
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
                            height: 550,
                            width: '100%'
                        }}
                    >
                        <Paper sx={{ width: '100%' }}></Paper>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="right">Plataforma</TableCell>
                                        <TableCell align="right">Texto</TableCell>
                                        <TableCell align="right">Creado</TableCell>
                                        <TableCell align="right">Posteado</TableCell>
                                        <TableCell align="right">Acciones</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {posts.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.plataforma}</TableCell>
                                            <TableCell align="right">{row.texto}</TableCell>
                                            <TableCell align="right">{row.fecha_creacion}</TableCell>
                                            <TableCell align="right">{row.fecha_publicacion}</TableCell>
                                            <TableCell align="right" onClick={handleClick(row.id)}><DeleteForeverIcon /></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
}
