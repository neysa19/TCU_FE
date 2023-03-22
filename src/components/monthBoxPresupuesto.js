
import React from 'react';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function MonthBoxPresupuesto({ transactions, month }) {

    const getIngresosByMonth = () => {

        const filteredData = transactions.filter((item) => item.month === month && item.category === "Ingresos");
        return filteredData;
    }
    const getTotalIngresosByMonth = () => {
        let total = 0; //missing saldo inicial
        let otros = getIngresosByMonth();
        let sum = 0;
        for (let i = 0; i < otros.length; i++) {
            sum += otros[i].amount;
        }

        return sum;
    }
    const getAhorrosByMonth = () => {

        const filteredData = transactions.filter((item) => item.month === month && item.category === "Ahorro");
        return filteredData;
    }
    const getTotalAhorrosByMonth = () => {

        let total = 0;
        let ahorros = getAhorrosByMonth();
        for (let i = 0; i < ahorros.length; i++) {
            total += ahorros[i].amount;
        }
        return total;

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
    const getSaldoFinal = () => {
        let total = 0;
        let ingresos = getTotalIngresosByMonth()
        let gastos = getTotalGastosRecurrentesByMonth();
        let deudas = getTotalDeudasByMonth();
        let ahorros = getTotalAhorrosByMonth();
        console.log(ingresos,ahorros,gastos,deudas)
        total = ingresos - gastos - deudas - ahorros;
        return total;

    }
    const getTotalErogaciones = () => {
        let total = 0;
        let gastos = getTotalGastosRecurrentesByMonth();
        let deudas = getTotalDeudasByMonth();
        let ahorros = getTotalAhorrosByMonth();
        total = gastos + deudas + ahorros;
        return total;

    }
    const getSaldoInicial = () => {
        let inicial = 0;
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let index = months.indexOf(month) - 1;
        const prev_month = months[index];


        return prev_month.toLowerCase;
    }
    const getSaldoFinalColor = () => {
        let total = getSaldoFinal();
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
                <Box sx={{ border: 1, borderRadius: '16px' }} style={{ textAlign: 'center' }}>
                    <Typography variant="h5" >{month}</Typography>
                    <Box sx={{ borderTop: 1 }} >
                        <Box sx={{ bgcolor: "gray" }} >
                            <Typography variant="h6" >
                                Ingresos
                            </Typography>

                        </Box>
                        {getIngresosByMonth().map((ahorro) =>
                            <Typography sx={{ m: 1 }}>
                                {ahorro.description}: {ahorro.amount}
                            </Typography>)}
                    </Box>
                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lighgray" }}>

                            <Typography variant="h6"  >
                                Total Ingresos
                            </Typography>
                        </Box>
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            {getTotalIngresosByMonth()}
                        </Typography>
                    </Box>
                    <Box sx={{ borderTop: 1 }} >
                        <Box sx={{ bgcolor: "gray" }} >
                            <Typography variant="h6" >
                                Egresos
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ borderTop: 1 }}>

                        <Box sx={{ bgcolor: "lightgray" }}>
                            <Typography variant="h6" >
                                Ahorro
                            </Typography>
                        </Box>
                        {getAhorrosByMonth().map((ahorro) =>
                            <Typography sx={{ m: 1 }}>
                                {ahorro.description}: {ahorro.amount}
                            </Typography>)}
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            Total de ahorros:
                            {getTotalAhorrosByMonth()}
                        </Typography>
                    </Box>

                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lightgray" }}>

                            <Typography variant="h6" >
                                Deudas
                            </Typography>
                        </Box>
                        {getDeudasByMonth().map((deuda) =>
                            <Typography sx={{ m: 1 }}>
                                {deuda.description}: {deuda.amount}
                            </Typography>)}
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            Total de deudas:
                            {getTotalDeudasByMonth()}
                        </Typography>
                    </Box>

                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lightgray" }}>

                            <Typography variant="h6"  >
                                Gastos
                            </Typography>
                        </Box>
                        {getGastosRecurrentesByMonth().map((gasto) =>
                            <Typography sx={{ m: 1 }}>
                                {gasto.description}: {gasto.amount}
                            </Typography>)}
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            Total de Gastos:
                            {getTotalGastosRecurrentesByMonth()}
                        </Typography>
                    </Box>
                    <Box sx={{ borderTop: 1 }}>
                        <Box sx={{ bgcolor: "lightgray" }}>

                            <Typography variant="h6"  >
                                Total Erogaciones
                            </Typography>
                        </Box>
                        <Typography sx={{ m: 1, fontWeight: 'bold' }}>
                            {getTotalErogaciones()}
                        </Typography>
                    </Box>
                    <Box sx={{ border: 1, bgcolor: getSaldoFinalColor(), borderRadius: '16px' }}>
                        <Box sx={{ bgcolor: getSaldoFinalColor(), borderRadius: '16px' }}>
                            <Typography variant="h6" >
                                Saldo Final
                            </Typography>
                        </Box>

                        <Typography variant="h5" sx={{ m: 1, fontWeight: 'bold' }}>
                            {getSaldoFinal()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>

    );
}
