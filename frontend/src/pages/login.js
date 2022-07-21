import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import useStyles from './styles';
import pantry from '../images/pantry.jpg';
import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Register from './register';
import ForgotPass from "./forgotPass";

const Login = () => {

    const navigate = useNavigate();
    
    const navigateToForgot = () => {
        navigate('/forgotPass');
      };
    const navigateToRegister = () => {
        navigate('/register');
      };
    const classes = useStyles();

    

    return (
        <div>
            <Parallax pages = {1}>
                    <ParallaxLayer factor = {1} style = {{backgroundImage: `url(${pantry})`, backgroundSize: 'cover',}}>
            <div className={classes.mainDiv}>
                <Form>
                    <h1 className = {classes.title}>Login</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            className = {classes.loginUsernameBox} 
                            placeholder="Email" 
                            />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                            className = {classes.loginPasswordBox} 
                            placeholder="Password" 
                            />
                    </Form.Group>
                    <button onClick={navigateToForgot} className = {classes.forgotPass} >forgot password?</button><br />
                    <button className = {classes.loginButton} type="submit" >Sign In</button>
                    <p className = {classes.questionText} >Don't have an account?</p>
                    <button onClick={navigateToRegister} className = {classes.underline} >Register</button><br />
                </Form>
            </div>
            <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/forgotPass" element={<ForgotPass/>} />
            </Routes>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Login;