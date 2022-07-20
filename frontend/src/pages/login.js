import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import pocketPantryLogo from '../images/pocketPantryLogo.png';

import useStyles from './styles';
import pantry from '../images/pantry.jpg';

//import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';

import { Parallax, ParallaxLayer} from '@react-spring/parallax';

const Login =  () => {
    const classes = useStyles();
    return (
        <div>
            <Parallax pages = {1}>
                    <ParallaxLayer factor = {1} style = {{backgroundImage: `url(${pantry})`, backgroundSize: 'cover',}}>
            <div className={classes.mainDiv}>
                <h1 className = {classes.title}>Login</h1>
                <input className = {classes.loginUsernameBox} placeholder="Username" /><br />
                <input className = {classes.loginPasswordBox} placeholder="Password"/><br />
                <p className = {classes.forgotPass} >forgot password?</p>
                <button className = {classes.loginButton} onClick="doLogin();">Sign In</button>
                <p className = {classes.questionText} >Don't have an account?</p>
                <button className = {classes.underline} >Register</button>
            </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Login;
