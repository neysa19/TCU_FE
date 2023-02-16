import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function MyFormDialog({ open, onClose, onSubmit }) {
    const [formValues, setFormValues] = useState({
        descripcion: '',
        monto: '',
        category: '',
    });

    const handleInputChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {

        onSubmit(formValues);
        onClose();

    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar transacción</DialogTitle>
            <DialogContent>
                <FormControl>
                    <FormLabel id="category">Categoria</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="category"
                        name="category"
                        value={formValues.category}
                        onChange={handleInputChange}
                    >
                        <FormControlLabel value="Salario Neto" control={<Radio />} label="Salario Neto" />
                        <FormControlLabel value="Otros ingresos" control={<Radio />} label="Otros ingresos" />
                        <FormControlLabel value="Ahorros" control={<Radio />} label="Ahorros" />
                        <FormControlLabel value="Deudas" control={<Radio />} label="Deudas" />
                        <FormControlLabel value="Gastos Recurrentes" control={<Radio />} label="Gastos Recurrentes" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    name="monto"
                    label="Monto"
                    value={formValues.monto}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: 3,
                        height: 80,
                        width: 300
                    }}
                />
                {formValues.category !== "Salario Neto" ?
                    <TextField
                        name="descripcion"
                        label="Descripcion"
                        value={formValues.descripcion}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 1,
                            height: 80,
                            width: 300
                        }}
                    /> : null}


            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Agregar
                </Button>
            </DialogActions>
        </Dialog>
    );
};