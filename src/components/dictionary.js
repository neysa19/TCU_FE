import React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Divider,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Dictionary = ({ data }) => {
    const [open, setOpen] = React.useState({});

    const handleClick = (key) => {
        setOpen({ ...open, [key]: !open[key] });
    };

    return (
        <div>
            <List component="nav">
                {Object.entries(data).map(([key, value]) => (
                    <React.Fragment key={key}>
                        <ListItem button onClick={() => handleClick(key)}>
                            <ListItemText primary={
                                <Typography variant="h7" fontWeight="bold">
                                    {key}
                                </Typography>} />
                            {open[key] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open[key]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {value.map((item) => (
                                    <ListItem key={item} button>
                                        <ListItemText primary={<Typography sx={{ml:4}}>{item}</Typography>} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default Dictionary;