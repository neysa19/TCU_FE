import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Row, Col } from 'react-bootstrap';



export default function MonthBox({ transactions, month }) {

    const getSalariosByMonth = () => {
        return transactions.filter((item) => item.description === "Salario Neto" && item.month === month);

    }
    const getOtrosIngresosByMonth = () => {

        return transactions.filter((item) => item.description !== "Salario Neto" && item.month === month && item.category === "Otros Ingresos");

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

        return transactions.filter((item) => item.month === month && item.category === "Ahorro");
       
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

        return transactions.filter((item) => item.month === month && item.category === "Deudas");
        
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

        return transactions.filter((item) => item.month === month && item.category === "Gastos Recurrentes");
       
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
        let ahorros = getTotalAhorrosByMonth();
        total = ingresos - gastos - deudas - ahorros;
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
        <div style={{ border: '1px solid', borderRadius: '16px', textAlign: 'center' }}>
            <h5>{month}</h5>
            <div style={{ borderTop: '1px solid' }}>
                <div style={{ backgroundColor: 'lightgray' }}>
                    <h6>Ingresos Netos</h6>
                </div>
                <div>
                    {getSalariosByMonth().map((ingreso, index) => (
                        <p key={index}>{ingreso.description}: {ingreso.amount}</p>
                    ))}
                    <p>Otros ingresos:</p>
                    {getOtrosIngresosByMonth().map((ingreso, index) => (
                        <p key={index}>{ingreso.description}: {ingreso.amount}</p>
                    ))}
                    <p style={{ fontWeight: 'bold', marginLeft: '50%' }}>Total ingresos: ₡{getTotalIngresosByMonth()}</p>
                </div>
            </div>
            <div style={{ borderTop: '1px solid' }}>
                <div style={{ backgroundColor: 'lightgray' }}>
                    <h6>Ahorro</h6>
                </div>
                {getAhorrosByMonth().map((ahorro, index) => (
                    <p key={index}>{ahorro.description}: {ahorro.amount}</p>
                ))}
                <p style={{ fontWeight: 'bold', marginLeft: '50%' }}>Total de ahorros: ₡{getTotalAhorrosByMonth()}</p>
            </div>
            <div style={{ borderTop: '1px solid' }}>
                <div style={{ backgroundColor: 'lightgray' }}>
                    <h6>Deudas</h6>
                </div>
                {getDeudasByMonth().map((deuda, index) => (
                    <p key={index}>{deuda.description}: {deuda.amount}</p>
                ))}
                <p style={{ fontWeight: 'bold', marginLeft: '50%' }}>Total de deudas: ₡{getTotalDeudasByMonth()}</p>
            </div>
            <div style={{ borderTop: '1px solid' }}>
                <div style={{ backgroundColor: 'lightgray' }}>
                    <h6>Gastos Recurrentes</h6>
                </div>
                {getGastosRecurrentesByMonth().map((gasto, index) => (
                    <p key={index}>{gasto.description}: {gasto.amount}</p>
                ))}
                <p style={{ fontWeight: 'bold', marginLeft: '50%' }}>Total de Gastos: ₡{getTotalGastosRecurrentesByMonth()}</p>
            </div>
            <div style={{ border: '2px solid', backgroundColor: getCasillaFelizColor(), borderRadius: '16px' }}>
                <div style={{ backgroundColor: getCasillaFelizColor(), borderRadius: '16px' }}>
                    
                </div>
                <h5 style={{ fontWeight: 'bold' }}>₡{getCasillaFeliz()}</h5>
            </div>
        </div>
    </Container>

    );
}
