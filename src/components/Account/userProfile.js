import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import jwt_decode from "jwt-decode";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function UserProfile() {
    const navigate = useNavigate();
    const usuarioId = localStorage.getItem('id');
    const [firstName, setFirstName] = useState("");
    const [civil, setCivil] = useState("");
    const [condicionesLaborales, setCondicionesLaborales] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [cedula, setCedula] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [gradoAcademico, setGradoAcademico] = useState("");
    const [birthday, setBirthday] = useState("");
    const [genero, setGenero] = useState("");
    const [familiaCantidad, setFamiliaCantidad] = useState("");
    const [familiaIngresoBruto, setFamiliaIngresoBruto] = useState("");
    const [familiaIngresoNeto, setFamiliaIngresoNeto] = useState("");
    const [familiaIngresoAdicional, setFamiliaIngresoAdicional] = useState("");
    const [familiaDependencia, setFamiliaDependencia] = useState("");
    const [saludDiscapacidad, setSaludDiscapacidad] = useState("");
    const [saludCronica, setSaludCronica] = useState("");
    const [saludTerminal, setSaludTerminal] = useState("");
    const [saludDetalles, setSaludDetalles] = useState("");
    const [objCorto, setObjCorto] = useState("");
    const [objLargo, setObjLargo] = useState("");
    const [objMediano, setObjMediano] = useState("");
    const [objDiagnostico, setObjDiagnostico] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        console.log(decoded);
        setFirstName(decoded.user.name);
        setLastName(decoded.user.first_last_name);
        setEmail(decoded.user.email);
        setCivil();
        setCondicionesLaborales();

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios
                .put(`http://localhost:3010/users/${usuarioId}`, {
                    nombre: firstName,
                    apellido: lastName,
                    email: email
                })
                .catch(function (error) {
                    alert(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        alert("User Updated")
                        navigate('/user');
                    }
                });
        } catch (err) {
            alert(err);
        }
    };
    const estados_civiles = [
        { label: 'Soltero' },
        { label: 'Casado' },
        { label: 'Union Libre' },
        { label: 'Viudo' }]
    const condiciones_laborales = [
        { label: 'Asalariado' },
        { label: 'Independiente' },
        { label: 'Informal' },
        { label: 'Desempleado' }]

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <Grid container id="1" sx={{ display: 'flex grow' }}>
                    <Grid item xs={3} sx={{ marginRight: 1 }} >

                        <Box component="form" noValidate onSubmit={handleSubmit}
                            sx={{
                                marginTop: 4,
                                display: 'flex grow',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            variant="h4"
                                            color="inherit"
                                            noWrap
                                            align="center"
                                            sx={{ flexGrow: 1, height: 80 }}
                                        >
                                            Perfil General
                                        </Typography>
                                        <Grid item>
                                            <TextField
                                                id="firstName"
                                                name="firstName"
                                                label="Nombre"
                                                value={firstName}
                                                required
                                                onChange={(e) => setFirstName(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 200
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="lastName"
                                                name="lastName"
                                                label="Apellido"
                                                value={lastName}
                                                required
                                                onChange={(e) => setLastName(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 200
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="age"
                                                name="age"
                                                label="Edad"
                                                value={birthday}
                                                required
                                                onChange={(e) => setBirthday(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 200
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                onChange={(event, value) => setCivil(value.label)}
                                                disablePortal
                                                id="civil"
                                                options={estados_civiles}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 200
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Estado Civil" />}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="country"
                                                name="country"
                                                label="Nacionalidad"
                                                value={nacionalidad}
                                                required
                                                onChange={(e) => setNacionalidad(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 200
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                onChange={(event, value) => setCondicionesLaborales(value.label)}
                                                disablePortal
                                                id="condiciones_laborales"
                                                options={condiciones_laborales}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 200
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Condicion Laboral" />}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="school"
                                                name="school"
                                                label="Grado Academico"
                                                value={gradoAcademico}
                                                required
                                                onChange={(e) => setGradoAcademico(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 200
                                                }}
                                            />
                                        </Grid>
                                        <Stack direction="row" spacing={5}
                                            sx={{
                                                m: 'auto',
                                                width: 200
                                            }}>
                                            <Button type="submit" variant="contained" color="success">
                                                Guardar
                                            </Button>
                                            <Link href="/home" variant="body2"
                                                sx={{
                                                    pt: 1,
                                                }}
                                            >
                                                Cancelar
                                            </Link>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ marginRight: 1 }}>

                        <Box component="form" noValidate onSubmit={handleSubmit}
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            variant="h4"
                                            color="inherit"
                                            noWrap
                                            align="center"
                                            sx={{ flexGrow: 1, height: 80 }}
                                        >
                                            Perfil Familiar
                                        </Typography>
                                        <Grid item>
                                            <TextField
                                                id="cantidad_personas"
                                                name="cantidad_personas"
                                                label="Cantidad de Personas en la familia"
                                                value={familiaCantidad}
                                                required
                                                onChange={(e) => setFamiliaCantidad(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="ingreso_bruto"
                                                name="ingreso_bruto"
                                                label="Ingreso Bruto Mensual"
                                                value={familiaIngresoBruto}
                                                required
                                                onChange={(e) => setFamiliaIngresoBruto(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="ingreso_neto"
                                                name="ingreso_neto"
                                                label="Ingreso Neto Mensual"
                                                value={familiaIngresoNeto}
                                                required
                                                onChange={(e) => setFamiliaIngresoNeto(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="ingreso_adicional"
                                                name="ingreso_adicional"
                                                label="Ingresos adicionales"
                                                value={familiaIngresoAdicional}
                                                required
                                                onChange={(e) => setFamiliaIngresoAdicional(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                onChange={(event, value) => setFamiliaDependencia(value.label)}
                                                disablePortal
                                                id="dependencia_economica"
                                                options={[{ label: "Si" }, { label: "No" }]}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Posee personas con dependencia economica" />}
                                            />
                                        </Grid>
                                        <Stack direction="row" spacing={5}
                                            sx={{
                                                m: 'auto',
                                                width: 200
                                            }}>
                                            <Button type="submit" variant="contained" color="success">
                                                Guardar
                                            </Button>
                                            <Link href="/home" variant="body2"
                                                sx={{
                                                    pt: 1,
                                                }}
                                            >
                                                Cancelar
                                            </Link>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sx={{ marginRight: 1 }}>

                        <Box component="form" noValidate onSubmit={handleSubmit}
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            variant="h4"
                                            color="inherit"
                                            noWrap
                                            align="center"
                                            sx={{ flexGrow: 1, height: 40 }}
                                        >
                                            Perfil de
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            color="inherit"
                                            noWrap
                                            align="center"
                                            sx={{ flexGrow: 1, height: 50 }}
                                        >
                                            Salud
                                        </Typography>
                                        <Grid item>
                                            <Autocomplete
                                                onChange={(event, value) => setSaludDiscapacidad(value.label)}
                                                disablePortal
                                                id="discapacidad"
                                                options={[{ label: "Si" }, { label: "No" }]}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                                renderInput={(params) => <TextField {...params} label="¿Presenta discapacidades?" />}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                onChange={(event, value) => setSaludCronica(value.label)}
                                                disablePortal
                                                id="cronicas"
                                                options={[{ label: "Si" }, { label: "No" }]}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                                renderInput={(params) => <TextField {...params} label="¿Presenta enfermedades cronicas?" />}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                onChange={(event, value) => setSaludTerminal(value.label)}
                                                disablePortal
                                                id="terminal"
                                                options={[{ label: "Si" }, { label: "No" }]}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 80,
                                                    width: 300
                                                }}
                                                renderInput={(params) => <TextField {...params} label="¿Presenta enfermedad terminal?" />}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="detalle_salud"
                                                name="detalle_salud"
                                                label="Detalle la condicion de salud"
                                                multiline
                                                rows={4}
                                                value={saludDetalles}
                                                required
                                                onChange={(e) => setSaludDetalles(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 150,
                                                    width: 300
                                                }}
                                            />
                                        </Grid>
                                        <Stack direction="row" spacing={5}
                                            sx={{
                                                m: 'auto',
                                                width: 200
                                            }}>
                                            <Button type="submit" variant="contained" color="success">
                                                Guardar
                                            </Button>
                                            <Link href="/home" variant="body2"
                                                sx={{
                                                    pt: 1,
                                                }}
                                            >
                                                Cancelar
                                            </Link>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>

                        <Box component="form" noValidate onSubmit={handleSubmit}
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            variant="h4"
                                            color="inherit"
                                            noWrap
                                            align="center"
                                            sx={{ flexGrow: 1, height: 80 }}
                                        >
                                            Perfil financiero y objetivos
                                        </Typography>
                                        <Grid item>
                                            <TextField
                                                id="corto_plazo"
                                                name="corto_plazo"
                                                label="Objetivos financieros a corto plazo"
                                                multiline
                                                rows={4}
                                                value={objCorto}
                                                required
                                                onChange={(e) => setObjCorto(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 150,
                                                    width: 600
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="mediano_plazo"
                                                name="mediano_plazo"
                                                label="Objetivos financieros a mediano plazo"
                                                multiline
                                                rows={4}
                                                value={objMediano}
                                                required
                                                onChange={(e) => setObjMediano(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 150,
                                                    width: 600
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="largo_plazo"
                                                name="largo_plazo"
                                                label="Objetivos financieros a largo plazo"
                                                multiline
                                                rows={4}
                                                value={objLargo}
                                                required
                                                onChange={(e) => setObjLargo(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 150,
                                                    width: 600
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                id="diagnostico_cualitativo"
                                                name="diagnostico_cualitativo"
                                                label="Diagnostico cualitativo de Bienestar Financiero"
                                                multiline
                                                rows={4}
                                                value={objDiagnostico}
                                                required
                                                onChange={(e) => setObjDiagnostico(e.target.value)}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 'auto',
                                                    height: 150,
                                                    width: 600
                                                }}
                                            />
                                        </Grid>
                                        <Stack direction="row" spacing={5}
                                            sx={{
                                                m: 'auto',
                                                width: 200
                                            }}>
                                            <Button type="submit" variant="contained" color="success">
                                                Guardar
                                            </Button>
                                            <Link href="/home" variant="body2"
                                                sx={{
                                                    pt: 1,
                                                }}
                                            >
                                                Cancelar
                                            </Link>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
