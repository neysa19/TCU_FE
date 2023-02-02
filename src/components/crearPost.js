import * as React from 'react';
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { crearPostAhora, crearPostProgramado } from '../helpers/crearPost.js'
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CrearPost() {
  const [texto, setTexto] = React.useState('')

  const [redditSwitch, setRedditSwitch] = React.useState(false);
  const [twitterSwitch, setTwitterSwitch] = React.useState(false);
  const [linkedinSwitch, setLinkedInSwitch] = React.useState(false);
  const [checkedRD, setCheckedRD] = React.useState(false);
  const [checkedTW, setCheckedTW] = React.useState(false);
  const [checkedLI, setCheckedLI] = React.useState(false);
  const [value, setValue] = React.useState(dayjs('2022-11-28'));
  const [dateOpen, setDateOpen] = React.useState(false);


  useEffect(() => {
    if (localStorage.getItem('reddit') !== 'null') {
      setRedditSwitch(true)
    }
    if (localStorage.getItem('twitter') !== 'null') {
      setTwitterSwitch(true)
    }
    if (localStorage.getItem('linkedin') !== 'null') {
      setLinkedInSwitch(true)
    }
  }, []);

  const handleOkClick = valueL => () => {
    crearPostProgramado(checkedRD, checkedTW, checkedLI, texto, value.$d)
    toast.success(`Tu Post se creará el: ${value.$d}`)

  };
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
              height: 325,
              width: '50%'
            }}
          >
          </Paper>
        </Grid>
      </Grid>
    </Container>

  );
}
