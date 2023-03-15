// imports
import * as React from 'react'
import { Badge,  IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';



export const AlertsInBar = (props)=>{

  const [searchValue, setSearchValue] = useState("");
  const theme = createTheme(themeOptions);
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    const OnSearchClick = (event) =>{
      event.preventDefault();
      if (searchValue!==""){
        console.log (searchValue);
        setAnchorEl(null);
        navigate('/search/term="'+searchValue+'"')
      }
    }

  
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <IconButton  aria-describedby ={id} color="inversecommon"  onClick = {handleClick}>
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon fontSize="medium"/>
            </Badge>
          </IconButton>
          <Menu
                sx={{ mt: '45px' }}
                id="alert-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
            
                <MenuItem onClick={handleClose}>
                    Alert 1
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Alert 2
                </MenuItem>
                
            </Menu>
        </ThemeProvider> 
      </React.Fragment>
    )
}