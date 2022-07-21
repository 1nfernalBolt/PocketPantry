import React from 'react';

import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars} from "./NavbarEl";
import pocketPantryLogo from './images/pocketPantryLogo.png';


const Navbar = () => {
  return (
  <> 
   <Nav>
   <Bars />
    <NavLink to = "/login">
        <img src= {pocketPantryLogo} alt = "pocketPantryLogo" height = "100" width = "100" />
    </NavLink>
    <NavMenu>
    </NavMenu>
    <NavMenu>
    <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
    </NavBtn>
    <NavBtn>
          <NavBtnLink to='/register'>Register</NavBtnLink>
    </NavBtn>
    </NavMenu>
   </Nav>
   </>
  )
}

export default Navbar