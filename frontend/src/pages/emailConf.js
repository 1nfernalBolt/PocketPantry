import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import pocketPantryLogo from '../images/pocketPantryLogo.png';
import email from '../images/email.png';
import pantry from '../images/pantry.jpg';


import useStyles from './styles';

//import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';

import { Parallax, ParallaxLayer} from '@react-spring/parallax';

const EmailConf =  () => {
    const classes = useStyles();
    return (
        <div>
        <Parallax pages = {1}>
                <ParallaxLayer factor = {1} style = {{backgroundImage: `url(${pantry})`, backgroundSize: 'cover',}}>
        <div className={classes.mainDiv}>
            <img className = {classes.logo} src={pocketPantryLogo} alt="logo"></img>
            <br></br>
            <img className = {classes.emailPic} src={email} alt="email icon"></img>
            <h1 className = {classes.emailInstructions}>Please check your email to verify the address you provided.</h1>
            <p className = {classes.questionText} >Didn't get an email?</p>
            <button className = {classes.underline} >Send again</button>
        </div>
        </ParallaxLayer>
        </Parallax>
        </div> 
    )
}

export default EmailConf;