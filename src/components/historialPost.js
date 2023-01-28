import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import RedditPosts from './redditPosts';
import LinkedPosts from './linkedPosts';

export default function HistorialPosts() {
    const twHandle = localStorage.getItem('TwHandle');
    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper sx={{ width: '100%', overflow:'auto' }}>
                        <LinkedPosts />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ width: '100%', overflow:'auto'}}>
                        <RedditPosts />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ width: '100%' }}>
                        <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName={twHandle}
                            options={{ height: 400 }}
                        />
                    </Paper>
                </Grid>

            </Grid>
        </Container>

    );
}
