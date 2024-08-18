// src/App.js

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import LOGO from './LOGO.jpg';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Home from './Home';

const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={Link} to="/contact" onClick={handleDrawerToggle}>
                    <ListItemText primary="Contact" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Router>
            <div >
                <AppBar position="static" color="transparent" style={{ background: 'rgb(128, 41, 41)' }} >
                    <Toolbar>
                        {isMobile && (
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                                <img style={{ height: 60, width: 60, position: 'absolute', left: 0 }} src={LOGO} alt="Logo"></img>
                                <MenuIcon />
                            </IconButton>
                        )}
                        {!isMobile && <img style={{ height: 60, width: 60, marginLeft: 24 }} src={LOGO} alt="Logo"></img>}
                        <Typography variant="h6" style={{ fontSize: "13px", color: "white", padding: "20px", wordWrap: "break-word", width: "250px", fontWeight: 'bold' }}>
                            EXPERTS FOR ARCHITECTURE AND CONSULTATION- ARABEX
                        </Typography>
                        {!isMobile && (
                            <div>
                                <Button color="inherit" style={{ color: "white" }} component={Link} to="/">Home</Button>
                                <Button color="inherit" style={{ color: "white" }} component={Link} to="/about">About</Button>
                                <Button color="inherit" style={{ color: "white" }} component={Link} to="/contact">Contact</Button>
                            </div>
                        )}

                    </Toolbar>
                </AppBar>

                {isMobile && (
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
