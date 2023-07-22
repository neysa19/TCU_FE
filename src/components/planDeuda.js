import * as React from 'react';
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { PlanDeudaDialog } from './planDeudaDialog.js';

export default function PlanDeuda() {

  const [deudas, setDeudas] = useState([]);
  const [open, setOpen] = useState(false);

  const handleFormSubmit = ({ emisor, saldoActual, tasaActual, plazoActual, descripcion, ponderado_tasa, ponderado_plazo }) => {
    try {
      axios
        .post("https://calculadora-be.herokuapp.com/users/deudas", {
          user: localStorage.getItem('usuarioId'),
          emisor: emisor,
          saldoActual: saldoActual,
          tasaActual: tasaActual,
          plazoActual: plazoActual,
          descripcion: descripcion,
          ponderado_tasa: ponderado_tasa,
          ponderado_plazo: ponderado_plazo
        })
        .catch(function (error) {
          console.log(error.response.data.data);
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Created") {
            console.log(response.data.data)
            toast.success(`Deuda creada`)
            setTimeout(function () {
              window.location.reload();
          }, 2000);
          }
        });
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    try {
      const usuarioId = localStorage.getItem('usuarioId')
      axios
        .get(`https://calculadora-be.herokuapp.com/users/deudas/${usuarioId}`, {
        })
        .catch(function (error) {
          console.log(error.response.data.data);
        })
        .then((response) => {
          if (response.data.message === "OK") {
            setDeudas(response.data.data.PlanDeudas);
          }
        });
    } catch (err) {
      alert(err);
    }

  }, []);
  const columns = [
    { field: 'emisor', headerName: 'Emisor', width: 150 },
    {
      field: 'saldoActual',
      headerName: 'Saldo Actual',
      width: 150,
    },
    {
      field: 'tasaActual',
      headerName: 'Tasa Actual',
      width: 150,
    },
    {
      field: 'plazoActual',
      headerName: 'Plazo Actual',
      width: 150,
    },
    {
      field: 'descripcion',
      headerName: 'Descripcion',
      width: 190,
    },
    {
      field: 'ponderado_tasa',
      headerName: 'Ponderado Tasa',
      width: 150,
    },
    {
      field: 'ponderazo_plazo',
      headerName: 'Ponderado Plazo',
      width: 150,
    },
  ];
  const rows = deudas;
  console.log(rows);

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
              height: 500,
              width: '100%'
            }}
          >
            <Grid container >
            <Grid item xs={4}>
            </Grid>
            <Grid item>
            <Typography variant="h5" sx={{mt:1}}>
              PLAN DE DEUDAS
            </Typography>
            </Grid>
            <Grid item xs={2}>
            </Grid>
              <Grid item xs={3}>
            <Button variant="contained" color="success" sx={{width:250, mb:2 }} onClick={() => setOpen(true)}>
              + Agregar Deuda
            </Button>
            <PlanDeudaDialog open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} />
            </Grid>
            
            </Grid>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                getRowId={(row) => row._id}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>

  );
}
