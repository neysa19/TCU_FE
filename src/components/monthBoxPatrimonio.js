
import React from 'react';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function MonthBox({ transactions }) {

    const getActivosCirculantes = () => {
        const filteredData = transactions.filter((item) => item.category === "Activo Circulante");
        return filteredData;
    }
    const getTotalActivosCirculantes = () => {
        let activos = getActivosCirculantes()
        let sum = 0;
        for (let i = 0; i < activos.length; i++) {
            sum += activos[i].amount;
        }

        return sum;
    }
    const getActivosLargoPlazo = () => {
        const filteredData = transactions.filter((item) => item.category === "Activo Largo Plazo");
        return filteredData;
    }
    const getTotalEquipos = () => {
        const filteredData = transactions.filter((item) => item.category === "Equipo");
        let sum = 0;
        for (let i = 0; i < filteredData.length; i++) {
            sum += filteredData[i].amount;
        }
        return sum;
    }
    const getTotalActivosLargoPlazo = () => {
        let activos = getActivosLargoPlazo();
        let equipos = getTotalEquipos();
        let sum = 0;
        for (let i = 0; i < activos.length; i++) {
            sum += activos[i].amount;
        }

        return sum + equipos;
    }
    const getTotalActivos = () => {
        let activos_corto = getTotalActivosCirculantes();
        let activos_largo = getTotalActivosLargoPlazo();

        return activos_corto + activos_largo;
    }

    const getPasivosLargoPlazo = () => {
        const filteredData = transactions.filter((item) => item.category === "Pasivo Largo Plazo");
        return filteredData;
    }

    const getTotalPasivosLargoPlazo = () => {
        let pasivos = getPasivosLargoPlazo();
        let sum = 0;
        for (let i = 0; i < pasivos.length; i++) {
            sum += pasivos[i].amount;
        }

        return sum;
    }
    const getPasivosCortoPlazo = () => {
        const filteredData = transactions.filter((item) => item.category === "Pasivo Corto Plazo");
        return filteredData;
    }

    const getTotalPasivosCortoPlazo = () => {
        let pasivos = getPasivosCortoPlazo();
        let sum = 0;
        for (let i = 0; i < pasivos.length; i++) {
            sum += pasivos[i].amount;
        }

        return sum;
    }
    const getTotalPasivos = () => {
        let pasivos_corto = getTotalPasivosCortoPlazo();
        let pasivos_largo = getTotalPasivosLargoPlazo();

        return pasivos_corto + pasivos_largo;
    }
    const getPatrimonio = () => {
        let total = 0;
        let pasivos = getTotalPasivos()
        let activos = getTotalActivos();
        total = activos - pasivos;
        return total;

    }
    const getPatrimonioColor = () => {
        let total = getPatrimonio();
        let color;
        if (total < 0) {
            color = "red";
        } else if (total > 0) {
            color = "green";
        } else {
            color = "yellow";
        }
        return color;

    }

    return (
        <Container>
            <Box>
                <Box sx={{ border: 1, }} style={{ textAlign: 'center' }}>
                    <Box sx={{ borderTop: 1 ,}} >
                        <Box sx={{ bgcolor: "gray" , }} >
                            <Typography variant="h6" >
                                Activos
                            </Typography>

                        </Box>
                        {getActivosCirculantes().map((ahorro) =>
                            <Typography sx={{ m: 1 }}>
                                {ahorro.description}: {ahorro.amount}
                            </Typography>)}
                    </Box>
                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lighgray" }}>

                            <Typography variant="h6"  >
                                Total Activos Circulantes
                            </Typography>
                        </Box>
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            {getTotalActivosCirculantes()}
                        </Typography>
                    </Box>
                    <Box sx={{ borderTop: 1 }} >
                        <Typography sx={{ m: 1 }}>
                            Equipo: {getTotalEquipos()}
                        </Typography>
                        {getActivosLargoPlazo().map((ahorro) =>
                            <Typography sx={{ m: 1 }}>
                                {ahorro.description}: {ahorro.amount}
                            </Typography>)}
                    </Box>
                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lighgray" }}>

                            <Typography variant="h6"  >
                                Total Activos Largo Plazo
                            </Typography>
                        </Box>
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            {getTotalActivosLargoPlazo()}
                        </Typography>
                    </Box>
                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lighgray" }}>

                            <Typography variant="h6"  >
                                Total Activos
                            </Typography>
                        </Box>
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            {getTotalActivos()}
                        </Typography>
                    </Box>
                    <Box sx={{ borderTop: 1 }} >
                        <Box sx={{ bgcolor: "gray" }} >
                            <Typography variant="h6" >
                                Pasivos
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ borderTop: 1 }}>
                        {getPasivosCortoPlazo().map((ahorro) =>
                            <Typography sx={{ m: 1 }}>
                                {ahorro.description}: {ahorro.amount}
                            </Typography>)}
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            Total de pasivos corto plazo:
                            {getTotalPasivosCortoPlazo()}
                        </Typography>
                    </Box>

                    <Box sx={{ borderTop: 1 }}>
                        {getPasivosLargoPlazo().map((deuda) =>
                            <Typography sx={{ m: 1 }}>
                                {deuda.description}: {deuda.amount}
                            </Typography>)}
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            Total de pasivos largo plazo:
                            {getTotalPasivosLargoPlazo()}
                        </Typography>
                    </Box>

                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lighgray" }}>

                            <Typography variant="h6"  >
                                Total Pasivos
                            </Typography>
                        </Box>
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            {getTotalPasivos()}
                        </Typography>
                    </Box>
                    <Box sx={{ border: 1, bgcolor: getPatrimonioColor(), }}>
                        <Box sx={{ bgcolor: getPatrimonioColor(), }}>
                            <Typography variant="h6" >
                                Patrimonio
                            </Typography>
                        </Box>

                        <Typography variant="h5" sx={{ m: 1, fontWeight: 'bold' }}>
                            {getPatrimonio()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>

    );
}
