
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import HistorialPosts from './historialPost';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function MainDashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            axios
                .post("http://localhost:3010/posts/cola", {
                    usuario: localStorage.getItem('id'),
                })
                .catch(function (error) {
                    console.log(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        console.log(response.data.data)
                        setPosts(response.data.data)
                    }
                });
        } catch (err) {
            alert(err);
        }
    }, []);
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('state'));
    if (searchParams.get('state') === localStorage.getItem('TwState') && searchParams.get('state') !== null) {

        try {
            axios
                .post("http://localhost:3010/posts/tweet/token", {
                    state: localStorage.getItem('TwState'),
                    codeVerifier: localStorage.getItem('TwCodeVer'),
                    code: searchParams.get('code'),
                    user: localStorage.getItem('id'),
                })
                .catch(function (error) {
                    alert(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        localStorage.setItem('TwHandle',response.data.data.data.username);
                        localStorage.setItem('twitter',true);
                        navigate('/home');
                    }
                });
        } catch (err) {
            alert(err);
        }
    } else if (searchParams.get('state') === 'reddit') {
        try {
            axios
                .post("http://localhost:3010/posts/reddit/token", {
                    code: searchParams.get('code'),
                    state: searchParams.get('state'),
                    user: localStorage.getItem('id'),
                })
                .catch(function (error) {
                    console.log(error)
                    alert(error.response);
                })
                .then((response) => {
                    console.log(response)
                    if (response.data.message === "OK") {
                        console.log(response.data)
                        localStorage.setItem('reddit',true);

                        navigate('/home');
                    }
                });
        } catch (err) {
            alert(err);
        }

    } else if (searchParams.get('state') !== 'reddit' && searchParams.get('state') !== localStorage.getItem('TwState') && searchParams.get('state') !== null) {
        try {
            axios
                .post("http://localhost:3010/posts/linkedin/token", {
                    code: searchParams.get('code'),
                    state: searchParams.get('state'),
                    user: localStorage.getItem('id'),
                })
                .catch(function (error) {
                    console.log(error)
                    alert(error.response);
                })
                .then((response) => {
                    console.log(response)
                    if (response.data.message === "OK") {
                        console.log(response.data)
                        localStorage.setItem('linkedin',true);
                        navigate('/home');
                    }
                });
        } catch (err) {
            alert(err);
        }
    } 


    const handleTwClick = value => () => {

        try {
            axios
                .post("http://localhost:3010/posts/tweet/link", {

                })
                .catch(function (error) {
                    alert(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        localStorage.setItem('TwState', response.data.data.state)
                        localStorage.setItem('TwCodeVer', response.data.data.codeVerifier)
                        window.open(response.data.data.url, "_self")
                    }
                });
        } catch (err) {
            alert(err);
        }
    };
    const handleRDClick = value => () => {
        //iC1omzDOWGpE6q3EdyckOkdvN8nHMA secret client
        try {
            axios
                .post("http://localhost:3010/posts/reddit/link", {

                })
                .catch(function (error) {
                    alert(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        console.log(response.data)
                        window.open(response.data.data, "_self")
                    }
                });
        } catch (err) {
            alert(err);
        }

        // window.open("https://www.reddit.com/api/v1/authorize?client_id=28T22kreGnYJ36AGZKix7Q&response_type=code&state=reddit&redirect_uri=http://localhost:3000/home&duration=permanent&scope=submit","_self")
    };
    const handleLIClick = value => () => {
        try {
            axios
                .post("http://localhost:3010/posts/linkedin/link", {

                })
                .catch(function (error) {
                    alert(error.response.data.data);
                })
                .then((response) => {
                    if (response.data.message === "OK") {
                        console.log(response.data)
                        window.open(response.data.data, "_self")
                    }
                });
        } catch (err) {
            alert(err);
        }

    };
    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Grid container spacing={2} sx={{ ml: 6, mb: 4, mt: 1 }}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <ButtonBase sx={{ width: 128, height: 128 }} onClick={handleRDClick()} >
                                        <Img alt="Reddit Logo" src="https://www.svgrepo.com/show/14413/reddit.svg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs container direction="column" spacing={2}>
                                    <ButtonBase sx={{ width: 128, height: 128 }} onClick={handleTwClick()}>
                                        <Img alt="Twitter Logo" src="https://img.icons8.com/color/344/twitter--v1.png" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs container direction="column" spacing={2}>
                                    <ButtonBase sx={{ width: 128, height: 128 }} onClick={handleLIClick()}>
                                        <Img alt="LinkedIn Logo" src="https://img.icons8.com/fluency/344/linkedin-circled.png" />
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ ml: 1, mb: 4 }}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                    >
                                        Conectar con Reddit
                                    </Typography>
                                </Grid>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                    >
                                        Conectar con Twitter
                                    </Typography>
                                </Grid>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                    >
                                        Conectar con LinkedIn
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Grid container spacing={2} sx={{ ml: 6, mb: 3 }}>

                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Avatar sx={{ width: 100, height: 100, mt: 5, ml: 2, bgcolor: '#00b0ff', fontSize: "3.5rem" }}>
                                        {posts.length}
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ ml: 1, mb: 4, mt: 0.5 }}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        noWrap
                                        sx={{ flexGrow: 1 }}
                                    >
                                        Cantidad de post en cola
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="h3"
                            color="inherit"
                            noWrap
                            align="center"
                            sx={{ flexGrow: 1 }}
                        >
                            Historial de Posts
                        </Typography>
                        <HistorialPosts />
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}
