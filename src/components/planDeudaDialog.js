import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

export const PlanDeudaDialog = (props) => {

    const { open, onClose, onSubmit } = props;
    const [emisor, setEmisor] = useState('');
    const [saldoActual, setSaldoActual] = useState('');
    const [tasaActual, setTasaActual] = useState('');
    const [plazoActual, setPlazoActual] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ponderado_tasa, setPonderado_tasa] = useState('');
    const [ponderado_plazo, setPonderado_plazo] = useState('');

    const handleEmisorChange = (event) => {
        setEmisor(event.target.value);
    };

    const handleSaldoActualChange = (event) => {
        setSaldoActual(event.target.value);
    };

    const handleTasaActualChange = (event) => {
        setTasaActual(event.target.value);
    };

    const handlePlazoActualChange = (event) => {
        setPlazoActual(event.target.value);
    };
    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };
    const handlePonderadoTasaChange = (event) => {
        setPonderado_tasa(event.target.value);
    };
    const handlePoneradoPlazoChange = (event) => {
        setPonderado_plazo(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit({emisor, saldoActual, tasaActual, plazoActual, descripcion, ponderado_tasa, ponderado_plazo });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar Deuda</DialogTitle>
            <DialogContent sx={{m:1, width:400}}>
            
                <TextField
                    margin="dense"
                    label="Emisor"
                    value={emisor}
                    onChange={handleEmisorChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="Saldo Actual"
                    value={saldoActual}
                    onChange={handleSaldoActualChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="Tasa Actual"
                    value={tasaActual}
                    onChange={handleTasaActualChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="Plazo Actual"
                    value={plazoActual}
                    onChange={handlePlazoActualChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="Ponderado Tasa"
                    value={ponderado_tasa}
                    onChange={handlePonderadoTasaChange}
                    sx={{m:1, width:300}}
                />                
                <TextField
                    margin="dense"
                    label="Ponderado Plazo"
                    value={ponderado_plazo}
                    onChange={handlePoneradoPlazoChange}
                    sx={{m:1, width:300}}
                />   
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button sx={{mr:8}} onClick={handleSubmit}>Agregar</Button>
            </DialogActions>
        </Dialog>
    );
};