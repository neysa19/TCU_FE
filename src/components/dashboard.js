
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { AddTransactionDialog } from './casillaFelizDialog';
import MonthBox from './monthBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainDashboard() {
    const [transactions, setTransactions] = useState([])
    const transactionRef = useRef(transactions);

    useEffect(() => {
        transactionRef.current = transactions;
    }, [transactions]);

    useEffect(() => {
        try {
            const usuarioId = localStorage.getItem('usuarioId')
            axios
                .get(`http://localhost:3020/users/transactions/${usuarioId}`, {
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        setTransactions(response.data.data.transactions);

                    }
                });
        } catch (err) {
            alert(err);
        }
    }, []);

    const [open, setOpen] = useState(false);

    const handleFormSubmit = ({ amount, description, category, month }) => {
        try {
            axios
                .post("http://localhost:3020/users/transactions", {
                    user: localStorage.getItem('usuarioId'),
                    description: description,
                    tab: "casilla_feliz",
                    amount: amount,
                    category: category,
                    month: month
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    console.log(response);
                    if (response.data.message === "Created") {
                        console.log(response.data.data)
                        toast.success(`Transaccion creada`)
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                    }
                });
        } catch (err) {
            alert(err);
        }
    };
    const getCasillaFelizTransactions = () => {

        const filteredData = transactions.filter((item) => item.tab === "casilla_feliz");
        return filteredData;
    }
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return (
        <Container fluid>
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
                theme="dark"
            />
            <div style={{ alignitems: "center",justifyContent: "center" }}>
                <h1> Casilla Feliz</h1>
                <div style={{ display: "flex", alignItems: "center",justifyContent:"center" }}>
                    <div style={{ width: 15, height: 18, backgroundColor: "green", margin: "0 0.5rem" }}></div>
                    <span>Buen estado</span>
                    <div style={{ width: 15, height: 18, backgroundColor: "yellow", margin: "0 0.5rem" }}></div>
                    <span>Estado regular</span>
                    <div style={{ width: 15, height: 18, backgroundColor: "red", margin: "0 0.5rem" }}></div>
                    <span>Mal estado</span>
                </div>

                <Button variant="success" style={{  marginBottom: "1%" }} onClick={() => setOpen(true)}>
                    Agregar Transacción
                </Button>

                <AddTransactionDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />
            </div>
            <Row xs={12} md={12} lg={12} xl={12} className="justify-content-md-center" style={{ marginBottom: "20%" }}>
                {[...Array(12)].map((_, index) => (
                    <Col style={{ marginBottom: "1%" }} key={index} xs={12} md={6} lg={4} xl={3} >
                        <MonthBox
                            transactions={getCasillaFelizTransactions()}
                            month={monthNames[index]}
                            styles={{ fontFamily: 'Century Gothic', fontSize: '28px' }}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
