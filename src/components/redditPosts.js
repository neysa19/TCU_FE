import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function RedditPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            axios
                .post("http://localhost:3010/posts/reddit/posts", {
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

    return (
        <List sx={{ width: '100%', maxWidth: 360,maxHeight: 400, bgcolor: 'background.paper' }}>
            {posts.map((post) => (
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Reddit Logo" src="https://www.svgrepo.com/show/14413/reddit.svg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={post.texto}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'listitem' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Tipo: {post.tipo}
                                </Typography>
                                <Typography
                                    sx={{ display: 'listitem' }}
                                    component="span"
                                    variant="body2"
                                    color="gray"
                                >
                                   Creado: {post.fecha_creacion}
                                </Typography>
                                <Typography
                                    sx={{ display: 'listitem' }}
                                    component="span"
                                    variant="body2"
                                    color="gray"
                                >
                                   Publicado: {post.fecha_publicacion}
                                </Typography>
                                
                            </React.Fragment>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}