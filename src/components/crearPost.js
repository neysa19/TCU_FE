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

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const switchHandlerRD = (event) => {
    setCheckedRD(event.target.checked);
  };
  const switchHandlerTW = (event) => {
    setCheckedTW(event.target.checked);
  };
  const switchHandlerLI = (event) => {
    setCheckedLI(event.target.checked);
  };

  const handleClick = valueL => () => {
    console.log(valueL);
    console.log(checkedTW)
    console.log(checkedRD)
    console.log(checkedLI)
    console.log(texto)
    if (valueL === "ahora") {
      crearPostAhora(checkedRD, checkedTW, checkedLI, texto);
      toast.success('Post Creado')

    } else if (valueL === "cola") {

    } else if (valueL === "programado") {
      setDateOpen(true);
    }
  };
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
            <Paper sx={{ width: '100%', mb: 1 }}>

              <TextField label="Escribe tu post aquí" variant="outlined" multiline
                sx={{
                  m: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 50,
                  width: '95%'
                }} onChange={(e) => setTexto(e.target.value)} />

              <FormGroup row="true">
                {redditSwitch ? <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1, ml: 3 }} defaultUnchecked onChange={switchHandlerRD} />}
                  label="Reddit"
                /> : <FormControlLabel disabled
                  control={<IOSSwitch sx={{ m: 1, ml: 3 }} defaultUnchecked />}
                  label="Reddit" />}
                {twitterSwitch ? <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1, ml: 3 }} defaultUnchecked onChange={switchHandlerTW} />}
                  label="Twitter"
                /> : <FormControlLabel disabled
                  control={<IOSSwitch sx={{ m: 1, ml: 3 }} defaultUnchecked />}
                  label="Twitter" />}

                {linkedinSwitch ? <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1, ml: 3 }} defaultUnchecked onChange={switchHandlerLI} />}
                  label="LinkedIn"
                /> : <FormControlLabel disabled
                  control={<IOSSwitch sx={{ m: 1, ml: 3 }} defaultUnchecked />}
                  label="LinkedIn" />}
              </FormGroup>
              <Stack direction="row" spacing={2} sx={{ m: 1 }}>
                <Button variant="contained" color="success" onClick={handleClick('ahora')}>
                  Publicar ahora
                </Button>
                <Button variant="contained" color="success" onClick={handleClick('cola')}>
                  Agregar a cola
                </Button>
                <Button variant="contained" color="success" onClick={handleClick('programado')}>
                  Programar hora
                </Button>
              </Stack>
            </Paper>
            {dateOpen ? <Paper sx={{
              p: 2,
              flexDirection: 'column',
              height: 80,
              width: '100%'
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  sx={{ m: '1px' }}
                  renderInput={(props) => <TextField {...props} />}
                  label="Escoge una fecha y hora"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
              <Button sx={{ m: 1 }} variant="contained" color="success" onClick={handleOkClick()}>
                Ok
              </Button>
            </Paper> : null}
          </Paper>
        </Grid>
      </Grid>
    </Container>

  );
}
