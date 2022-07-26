import React, { useEffect } from "react";
import {useNavigate, useHistory} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import useStyles from './styles';
import pantry from '../images/pantry.jpg';
import { useDispatch, useSelector } from "react-redux";
import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import { register } from "../actions/userActions";

const Register = () => {

    const [First_name, setFirstName] = useState("");
    const [Last_name, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();


    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if(userInfo) {
            navigate('/emailConf');
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if(Password !== confirmPassword) {
            alert('Passwords do not match');
        } else if (Email !== confirmEmail)  {
            alert('Emails do not match');
        } else {
            dispatch(register(First_name, Last_name, Email, Password));
        }
    };

    return (
        <div>
            <Parallax pages = {1}>
                    <ParallaxLayer factor = {1} style = {{backgroundImage: `url(${pantry})`, backgroundSize: 'cover',}}>
                        <div className={classes.regDiv}>
                            {message && <errormessage class="text-danger" variant="danger">{message}</errormessage>}
                            <Form onSubmit = {submitHandler}>
                                <h1 className = {classes.title}>Register</h1>
                                <Form.Group controlId="firstName">
                                    <Form.Control 
                                        className = {classes.loginUsernameBox} 
                                        placeholder="First Name"
                                        type = "name"
                                        value={First_name}
                                        onChange={(e) => setFirstName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="First Name">
                                    <Form.Control 
                                        className = {classes.loginUsernameBox} 
                                        placeholder="Last Name"
                                        type = "lastName"
                                        value={Last_name}
                                        onChange={(e) => setLastName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control 
                                        className = {classes.loginUsernameBox} 
                                        placeholder="Email"
                                        type = "email"
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="confirmEmail">
                                    <Form.Control 
                                        className = {classes.loginUsernameBox} 
                                        placeholder="Confirm Email"
                                        type = "email"
                                        value={confirmEmail}
                                        onChange={(e) => setConfirmEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control 
                                        className = {classes.loginPasswordBox} 
                                        placeholder="Password"
                                        type = "password"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="confirmPassword">
                                    <Form.Control 
                                        className = {classes.loginPasswordBox} 
                                        placeholder="Confirm Password"
                                        type = "password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                                </Form.Group>
                                <button className = {classes.loginButton} type="submit">Register</button>
                            </Form>
                        </div>
                    </ParallaxLayer>
            </Parallax>
        </div>
    )
};

export default Register;