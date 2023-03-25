import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

export const AddTransactionDialog = (props) => {

    const { open, onClose, onSubmit } = props;
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit({ amount, description, category });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar Activo</DialogTitle>
            <DialogContent sx={{ m: 1, width: 400 }}>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                        labelId="category-label"
                        value={category}
                        onChange={handleCategoryChange}
                        sx={{ m: 1, width: 300 }}
                    >
                        <MenuItem value="Activo Circulante">Activo Circulante</MenuItem>
                        <MenuItem value="Equipo">Equipo</MenuItem>
                        <MenuItem value="Activo Largo Plazo">Activo Largo Plazo</MenuItem>
                        <MenuItem value="Pasivo Corto Plazo">Pasivo corto plazo</MenuItem>
                        <MenuItem value="Pasivo Largo Plazo">Pasivo largo plazo</MenuItem>

                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    label="Descripcion"
                    value={description}
                    onChange={handleDescriptionChange}
                    sx={{ m: 1, width: 300 }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Monto"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    fullWidth
                    sx={{ m: 1, width: 300 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button sx={{ mr: 8 }} onClick={handleSubmit}>Agregar</Button>
            </DialogActions>
        </Dialog>
    );
};