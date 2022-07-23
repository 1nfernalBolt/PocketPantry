import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../App.css'
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars } from "./NavbarEl";
import pocketPantryLogo from './images/pocketPantryLogo.png';
import { logout } from '../actions/userActions';
import { useNavigate } from "react-router-dom";

const Navbar = () => {

      const userLogin = useSelector((state) => state.userLogin);
      const { userInfo } = userLogin;
      const navigate = useNavigate();
      const dispatch = useDispatch();


      var class_name = (userInfo) ? "hidden" : "";
      var class_name2 = (userInfo) ? "nav-links" : "hidden";
      const logoutHandler = () => {
            dispatch(logout());
      };
      return (
            <>
                  <Nav>
                        <Bars />
                        <NavLink to="/">
                              <img src={pocketPantryLogo} alt="pocketPantryLogo" height="80" width="80" />
                        </NavLink>
                        <NavMenu>
                        </NavMenu>
                        <NavMenu>
                              <NavBtn>
                                    <NavBtnLink className={class_name2} to='/recipes'>Recipes</NavBtnLink>
                              </NavBtn>
                              <NavBtn>
                                    <NavBtnLink className={class_name2} to='/pantry'>Pantry</NavBtnLink>
                              </NavBtn>
                              <NavBtn>
                                    <NavBtnLink className={class_name2} to='/cart'>Shopping Cart</NavBtnLink>
                              </NavBtn>
                              <NavBtn>
                                    <NavBtnLink className={class_name} to='/register'>Register</NavBtnLink>
                              </NavBtn>
                              <NavBtn>
                                    <NavBtnLink className={class_name} to='/login'>Sign In</NavBtnLink>
                              </NavBtn>
                              <NavBtn>
                                    <NavBtnLink to="/login" className={class_name2} onClick={logoutHandler}>Logout</NavBtnLink>
                              </NavBtn>
                        </NavMenu>
                  </Nav>
            </>
      )
}

export default Navbar