import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from "react"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Appbar() {




  const [usernameCookie, setUsernameCookie] = useState(Cookies.get('username'));
  console.log("Are we logged in? " + usernameCookie)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
            Number Guesser
          </Typography>
          <Button color='inherit' as={Link} 
          to="/" className='nav-link'>New Game</Button>
          <Button color='inherit' as={Link} 
          to={usernameCookie !== undefined ? "/user/logout" : "/user/login"} className='nav-link'>{ usernameCookie !== undefined ? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}