
import React from 'react';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function MonthBox({ transactions, month }) {

    const getSalariosByMonth = () => {
        const filteredData = transactions.filter((item) => item.description === "Salario Neto" && item.month === month);
        return filteredData;
    }
    const getOtrosIngresosByMonth = () => {

        const filteredData = transactions.filter((item) => item.description !== "Salario Neto" && item.month === month && item.category === "Otros Ingresos");
        return filteredData;
    }
    const getTotalIngresosByMonth = () => {
        let total = 0;
        let salarios = getSalariosByMonth();
        let sumSal = 0;
        for (let i = 0; i < salarios.length; i++) {
            sumSal += salarios[i].amount;
        }
        let otros = getOtrosIngresosByMonth()
        let sum = 0;
        for (let i = 0; i < otros.length; i++) {
            sum += otros[i].amount;
        }
        total = sumSal + sum;

        return total;
    }
    const getAhorrosByMonth = () => {

        const filteredData = transactions.filter((item) => item.month === month && item.category === "Ahorro");
        return filteredData;
    }
    const getDeudasByMonth = () => {

        const filteredData = transactions.filter((item) => item.month === month && item.category === "Deudas");
        return filteredData;
    }
    const getTotalDeudasByMonth = () => {

        let total = 0;
        let deudas = getDeudasByMonth();
        for (let i = 0; i < deudas.length; i++) {
            total += deudas[i].amount;
        }
        return total;

    }
    const getGastosRecurrentesByMonth = () => {

        const filteredData = transactions.filter((item) => item.month === month && item.category === "Gastos Recurrentes");
        return filteredData;
    }
    const getTotalGastosRecurrentesByMonth = () => {
        let total = 0;
        let gastos = getGastosRecurrentesByMonth();
        for (let i = 0; i < gastos.length; i++) {
            total += gastos[i].amount;
        }
        return total;

    }
    const getCasillaFeliz = () => {
        let total = 0;
        let ingresos = getTotalIngresosByMonth()
        let gastos = getTotalGastosRecurrentesByMonth();
        let deudas = getTotalDeudasByMonth();
        total = ingresos - gastos - deudas;
        return total;

    }
    const getCasillaFelizColor = () => {
        let total = getCasillaFeliz();
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
                <Box sx={{ border: 1 }} style={{ textAlign: 'center' }}>
                    <Typography variant="h5" >{month}</Typography>
                    <Box sx={{ border: 1 }} >
                        <Box sx={{ bgcolor: "lightgray" }} >
                            <Typography variant="h6" >
                                Ingresos Netos
                            </Typography>
                        </Box>
                        <Box>
                            {getSalariosByMonth().map((ingreso) =>
                                <Typography sx={{ m: 1 }}>
                                    {ingreso.description}: {ingreso.amount}
                                </Typography>)}
                            <Typography sx={{ m: 1 }}>
                                Otros ingresos:
                            </Typography>
                            {getOtrosIngresosByMonth().map((ingreso) =>
                                <Typography sx={{ m: 1 }}>
                                    {ingreso.description}: {ingreso.amount}
                                </Typography>)}

                            <Typography sx={{ m: 1 }}>
                                Total ingresos:
                                {getTotalIngresosByMonth()}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ border: 1 }}>
                        <Box sx={{ bgcolor: "lightgray" }}>
                            <Typography variant="h6" >
                                Casilla del ahorro
                            </Typography>
                        </Box>
                        {getAhorrosByMonth().map((ahorro) =>
                            <Typography sx={{ m: 1 }}>
                                {ahorro.description}: {ahorro.amount}
                            </Typography>)}
                    </Box>

                    <Box sx={{ border: 1 }}>
                        <Box sx={{ bgcolor: "lightgray" }}>

                            <Typography variant="h6" >
                                Casilla de las deudas
                            </Typography>
                        </Box>
                        {getDeudasByMonth().map((deuda) =>
                            <Typography sx={{ m: 1 }}>
                                {deuda.description}: {deuda.amount}
                            </Typography>)}
                        <Typography sx={{ m: 1 }}>
                            Total de deudas:
                            {getTotalDeudasByMonth()}
                        </Typography>
                    </Box>

                    <Box sx={{ border: 1 }}>
                        <Box sx={{ bgcolor: "lightgray" }}>

                            <Typography variant="h6" >
                                Gastos Recurrentes
                            </Typography>
                        </Box>
                        {getGastosRecurrentesByMonth().map((gasto) =>
                            <Typography sx={{ m: 1 }}>
                                {gasto.description}: {gasto.amount}
                            </Typography>)}
                        <Typography sx={{ m: 1 }}>
                            Total de Gastos:
                            {getTotalGastosRecurrentesByMonth()}
                        </Typography>
                    </Box>
                    <Box sx={{ border: 1, bgcolor: getCasillaFelizColor() }}>
                        <Box sx={{ bgcolor: getCasillaFelizColor() }}>
                            <Typography variant="h6" >
                                Casilla Feliz
                            </Typography>
                        </Box>

                        <Typography variant="h5" sx={{ m: 1 }}>
                            {getCasillaFeliz()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>

    );
}
