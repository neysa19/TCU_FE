import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

export const RazonesDialog = (props) => {

    const { open, onClose, onSubmit } = props;
    const [nombre, setNombre] = useState('');
    const [calculo, setCalculo] = useState('');
    const [observacion, setObservacion] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleCalculoChange = (event) => {
        setCalculo(event.target.value);
    };

    const handleObservacionChange = (event) => {
        setObservacion(event.target.value);
    };
    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);


    const handleSubmit = () => {
        onSubmit({nombre, calculo, observacion, descripcion});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar Razon</DialogTitle>
            <DialogContent sx={{m:1, width:400}}>
            
                <TextField
                    margin="dense"
                    label="Nombre"
                    value={nombre}
                    onChange={handleNombreChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="Tasa Actual"
                    value={calculo}
                    onChange={handleCalculoChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="Plazo Actual"
                    value={observacion}
                    onChange={handleObservacionChange}
                    sx={{m:1, width:300}}
                />
                <TextField
                    margin="dense"
                    label="descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    sx={{m:1, width:300}}
                />  
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button sx={{mr:8}} onClick={handleSubmit}>Agregar</Button>
            </DialogActions>
        </Dialog>
    );
}};