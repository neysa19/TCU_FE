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
    const [month, setMonth] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit({ amount, description, category, month });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar Transacción</DialogTitle>
            <DialogContent sx={{m:1, width:400}}>
            <FormControl fullWidth margin="dense">
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                        labelId="category-label"
                        value={category}
                        onChange={handleCategoryChange}
                        sx={{m:1, width:300}}
                    >                    
                        <MenuItem value="Ingresos">Ingresos</MenuItem>
                        <MenuItem value="Ahorro">Ahorro</MenuItem>
                        <MenuItem value="Deudas">Deudas</MenuItem>
                        <MenuItem value="Gastos Recurrentes">Gastos</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    label="Descripcion"
                    value={description}
                    onChange={handleDescriptionChange}
                    sx={{m:1, width:300}}
                />
                
                <TextField
                    autoFocus
                    margin="dense"
                    label="Monto"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    fullWidth
                    sx={{m:1, width:300}}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="month-label">Mes</InputLabel>
                    <Select
                        labelId="month-label"
                        value={month}
                        onChange={handleMonthChange}
                        sx={{m:1, width:300}}
                    >
                        <MenuItem value="Enero">Enero</MenuItem>
                        <MenuItem value="Febrero">Febrero</MenuItem>
                        <MenuItem value="Marzo">Marzo</MenuItem>
                        <MenuItem value="Abril">Abril</MenuItem>
                        <MenuItem value="Mayo">Mayo</MenuItem>
                        <MenuItem value="Junio">Junio</MenuItem>
                        <MenuItem value="Julio">Julio</MenuItem>
                        <MenuItem value="Agosto">Agosto</MenuItem>
                        <MenuItem value="Sept">Sept</MenuItem>
                        <MenuItem value="Octubre">Octubre</MenuItem>
                        <MenuItem value="Noviembre">Noviembre</MenuItem>
                        <MenuItem value="Diciembre">Diciembre</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button sx={{mr:8}} onClick={handleSubmit}>Agregar</Button>
            </DialogActions>
        </Dialog>
    );
};