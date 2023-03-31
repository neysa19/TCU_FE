import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

export const ResetPasswordDialog = (props) => {

    const { open, onClose, onSubmit } = props;
    const [correo, setCorreo] = useState('');

    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };


    const handleSubmit = () => {
        onSubmit({correo});
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Reestablecer contraseña</DialogTitle>
            <DialogContent sx={{m:1, width:400}}>
            
                <TextField
                    margin="dense"
                    label="Correo"
                    value={correo}
                    onChange={handleCorreoChange}
                    sx={{m:1, width:300}}
                />   
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button sx={{mr:8}} onClick={handleSubmit}>Reestablecer</Button>
            </DialogActions>
        </Dialog>
    );
};