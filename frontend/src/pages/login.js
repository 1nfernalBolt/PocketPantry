import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import pocketPantryLogo from '../images/pocketPantryLogo.png';
import useStyles from './styles';
import pantry from '../images/pantry.jpg';
import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Register from './register';


const Login = () => {

    const navigateToRegister = () => {
        navigate('/register');
      };
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
                    <h1 className = {classes.title}>Login</h1>
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
                    <p className= {classes.forgotPass}>forgot password?</p>
                    <button className = {classes.loginButton} type="submit" >Sign In</button>
                    <p className = {classes.questionText} >Don't have an account?</p>
                    <button onClick={navigateToRegister} className = {classes.underline} >Register</button>
                </Form>
            </div>
            <Routes>
            <Route path="/register" element={<Register/>} />
            </Routes>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}

export default Login;