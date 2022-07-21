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
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                },
            };

            setLoading(true);
            const {data} = await axios.post("/api/users", {email,password}, config);
            console.log(data);
            localStorage.setItem("userInfo",JSON.stringify(data));

            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <Parallax pages = {1}>
                    <ParallaxLayer factor = {1} style = {{backgroundImage: `url(${pantry})`, backgroundSize: 'cover',}}>
            <div className={classes.mainDiv}>
                <Form onSubmit = {submitHandler}>
                    <h1 className = {classes.title}>Enter your registered email</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            className = {classes.loginUsernameBox} 
                            placeholder="Email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                            className = {classes.loginPasswordBox} 
                            placeholder="Password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <button className = {classes.loginButton} type="submit" >Sign In</button>
                </Form>
            </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default ForgotPass;