import React, { useState, useEffect } from 'react';
import QRCode from "qrcode";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MainDashboard from '../AdminComponents/dashboardAdmin';
import Patrimonio from '../AdminComponents/patrimonioAdmin';

export default function UserAdminView() {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [openCasilla, setOpenCasilla] = useState(false);
    const [renderCasilla, setRenderCasilla] = useState(false);
    const [openPatrimonio, setOpenPatrimonio] = useState(false);
    const [renderPatrimonio, setRenderPatrimonio] = useState(false);
    const [openDeuda, setOpenDeuda] = useState(false);
    const [renderDeuda, setRenderDeuda] = useState(false);
    const [openPresupuesto, setOpenPresupuesto] = useState(false);
    const [renderPresupuesto, setRenderPresupuesto] = useState(false);
    const [openRazones, setOpenRazones] = useState(false);
    const [renderRazones, setRenderRazones] = useState(false);
    useEffect(() => {
        try {
            axios
                .get("https://calculadora-be.herokuapp.com/users", {
                })
                .catch(function (error) {
                    alert(error.response.message);
                })
                .then((response) => {
                    setUsersData(response.data.data.users)
                });
        } catch (err) {
            alert(err);
        }
    }, []);

    const handleCasillaClick = (id) => {
        console.log("Selected user: ", id);
        localStorage.setItem("selectedUser", id);
        setRenderCasilla(true);
        setOpenCasilla(true);
    };
    const handleCasillaClose = () => {
        setRenderCasilla(false);
        localStorage.setItem("selectedUser", '');
        setOpenCasilla(false);
    };
    const handlePatrimonioClick = (id) => {
        console.log("Selected user: ", id);
        localStorage.setItem("selectedUser", id);
        setRenderPatrimonio(true);
        setOpenPatrimonio(true);
    };
    const handlePatrimonioClose = () => {
        setRenderPatrimonio(false);
        localStorage.setItem("selectedUser", '');
        setOpenPatrimonio(false);
    };

    return (
        <Box sx={{ width: '100%', mb: 5 }}>
            {renderCasilla ?
                <MainDashboard open={openCasilla} onClose={() => handleCasillaClose()} /> : null
            }
            {renderPatrimonio ?
                <Patrimonio open={openPatrimonio} onClose={() => handlePatrimonioClose()} /> : null
            }
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Correo</TableCell>
                            <TableCell align="center">Casilla Feliz</TableCell>
                            <TableCell align="center">Patrimonio</TableCell>
                            <TableCell align="center">Presupuesto</TableCell>
                            <TableCell align="center">Plan de deuda</TableCell>
                            <TableCell align="center">Razones</TableCell>
                            <TableCell align="right"> </TableCell> {/* Add a new column for the delete button */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete" onClick={() => handleCasillaClick(user._id)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete" onClick={() => handlePatrimonioClick(user._id)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="delete">
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
