import {React, useState} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import pocketPantryLogo from '../images/pocketPantryLogo.png';
import email from '../images/email.png';
import pantry from '../images/pantry.jpg';
import useStyles from './styles';
import { Parallax, ParallaxLayer} from '@react-spring/parallax';
import axios from "axios";
import Form from 'react-bootstrap/Form';

const EmailConf =  () => {

    const [input, setInput] = useState("");
    const [resend, setResend] = useState("");
    const [error, setError] = useState("");

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
            <Form >
                    <Form.Group controlId="Email Confirmation">
                        <Form.Control 
                            className = {classes.loginUsernameBox} 
                            placeholder="Enter Confirmation code"
                            type = "integer"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}/>
                    </Form.Group>
                    <button className = {classes.loginButton} type="submit">Submit</button>
            </Form>
            <Form >
                <p className = {classes.questionText} class="text-dark">Didn't get an email?</p>
                <button className = {classes.underline} type="submit">Send again</button>
            </Form>
        </div>
        </ParallaxLayer>
        </Parallax>
        </div> 
    )
}

export default EmailConf;