import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/login.js";
import Register from "./pages/register";
import EmailConf from "./pages/emailConf";
import { useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import useStyles from './styles';
import Pantry from "./pages/pantry";
import Recipes from "./pages/recipes";
import Cart from "./pages/cart";

const App = () => {

    return (
        <div className="App">
            <Router>
                <Navbar /> 
                <Routes>
                    <Route path='/' element={<Register />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/emailConf' element={<EmailConf />} />
                    <Route path="/pantry" element={<Pantry />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path='/forgotPass' element={<forgotPass />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;