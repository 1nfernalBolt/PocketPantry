import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import useStyles from './styles';
import pantry from '../images/pantry.jpg';
import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';


const ForgotPass = () => {

    const navigate = useNavigate();
    const classes = useStyles();

    const [email, setEmail]  = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Parallax pages = {1}>
                    <ParallaxLayer factor = {1} style = {{backgroundImage: `url(${pantry})`, backgroundSize: 'cover',}}>
            <div className={classes.mainDiv}>
                <Form>
                    <h1 className = {classes.title}>Enter your registered email</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            className = {classes.loginUsernameBox} 
                            placeholder="Email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <button className = {classes.loginButton} type="submit" >Send Email</button>
                </Form>
            </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default ForgotPass;