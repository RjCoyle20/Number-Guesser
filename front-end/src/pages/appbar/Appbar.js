import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from "react"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLocation } from "react-router";

export default function Appbar({usernameCookieGlobal}) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  

  // const [usernameCookie, setUsernameCookie] = useState(Cookies.get('username'));
  // console.log("Are we logged in? " + usernameCookie)
  console.log("Are we seeing the correct GLOBAL cookie? " + usernameCookieGlobal);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
            Number Guesser
          </Typography>
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List >
              <a href='/'>
                <ListItem button>
                  <ListItemText  primary="Play" />
                </ListItem>
              </a>
              <a href={usernameCookieGlobal== undefined ? "/user/login" : "/user"}>
                <ListItem button>
                <ListItemText primary="Profile"/>
                </ListItem>
              </a>  
              <a href='/user/logout'>
                <ListItem button>
                  <ListItemText primary="Logout" />
                </ListItem>
              </a>
            </List>
          </Drawer>
          <Button color='inherit' as={Link} 
          to="/" className='nav-link'>New Game</Button>
          <Button color='inherit' as={Link} 
          to={usernameCookieGlobal !== undefined ? "/user/logout" : "/user/login"} className='nav-link'>{ usernameCookieGlobal !== undefined ? "Logout" : "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}