import React from 'react';

// import Login from '../components/login';
// import Register from '../components/register';

import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars} from "./NavbarEl";
import pocketPantryLogo from './images/pocketPantryLogo.png';


const Navbar = () => {
  return (
  <> 
   <Nav>
   <Bars />
    <NavLink to = "/">
        <img src= {pocketPantryLogo} alt = "pocketPantryLogo" height = "100" width = "100" />
    </NavLink>
    <NavMenu>
    </NavMenu>
    <NavMenu>
    <NavBtn>
          <NavBtnLink to='/register'>Register</NavBtnLink>
    </NavBtn>
    <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
    </NavBtn>
    <NavBtn>
          <NavBtnLink to='/emailConf'>EmailConfirm</NavBtnLink>
    </NavBtn>
    </NavMenu>
   </Nav>
   </>
  )
}

export default Navbar