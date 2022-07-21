import React from "react";
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/login";
import Register from "./pages/register";
import EmailConf from "./pages/emailConf";


import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';

import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import white from './images/white.png';
import pantry from './images/pantry.jpg';
import pocketPantryLogo from './images/pocketPantryLogo.png';
 
import Navbar from "./Navbar";
import { BrowserRouter as Router} from "react-router-dom";

import useStyles from './styles';

const App =  () => {
    const classes = useStyles();
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/emailConf' element={<EmailConf/>} />
                </Routes>
            </Router>
        </>
    )  
}

export default App;