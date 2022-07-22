import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import useStyles from './styles';
import pantry from '../images/pantry.jpg';
import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Register from './register';
import ForgotPass from "./forgotPass";
import { useEffect, useState } from "react";

const Login = () => {

    const navigate = useNavigate();
    
    const navigateToForgot = () => {
        navigate('/forgotPass');
      };
    const navigateToRegister = () => {
        navigate('/register');
      };

    const classes = useStyles();

    const [Email, setEmail]  = useState("");
    const [Password, setPassword] = useState("");
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
            const {data} = await axios.post("https://pocketpantryapp.herokuapp.com/api/users/login", {Email,Password}, config);
            console.log(data);
            localStorage.setItem("userInfo",JSON.stringify(data));

            setLoading(false);

            console.log("Login Successful");
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
            
        }
    };

    return (
        <div>
            <Parallax pages = {1}>
                    <ParallaxLayer factor = {1} style = {{backgroundImage: `url(${pantry})`, backgroundSize: 'cover',}}>
            <div className={classes.mainDiv}>
                {error && <errormessage class="text-danger" variant="danger">{error}</errormessage>}
                <Form onSubmit = {submitHandler}>
                    <h1 className = {classes.title}>Login</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            className = {classes.loginUsernameBox} 
                            placeholder="Email"
                            type = "email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                            className = {classes.loginPasswordBox} 
                            placeholder="Password"
                            type="password" 
                            value={Password} 
                            onChange={(e) => setPassword(e.target.value)}/> 
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
};

export default Login;