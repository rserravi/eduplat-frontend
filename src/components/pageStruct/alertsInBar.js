// imports
import * as React from 'react'
import { Badge,  Button,  Divider,  IconButton, Menu, MenuItem, MenuList, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';

const theme = createTheme(themeOptions);

export const AlertsInBar = (props)=>{

  const {user} = props;

 // const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  //const [error, setError] = useState();

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKarmaInfo = (event)=>{

  }

  const handleLevelInfo = (event)=>{
    
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (user && user._id!==""){
  
  return (
    <>
    {user.alerts && user.alerts!==undefined?<>
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <IconButton  aria-describedby ={id} color="inversecommon"  onClick = {handleClick}>
        <Badge badgeContent={user.alerts.total} color="secondary">
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
          <MenuList dense>
              <Typography sx={{fontWeight:"bold", fontSize:15, ml:2}}>Alerts</Typography>
              <Tooltip title={user.alerts.resource===0?"No new resources valued":"Someone has commented your resources: you must accept or deny the comments"}>
              <MenuItem onClick={handleClose}>
                <Button variant={user.alerts.resource===0?'text':'contained'}  color={user.alerts.resource===0?'primary':'secondary'} size='small' sx={{mr:1, borderRadius:5}}>{user.alerts.resource}</Button> resources valorations
              </MenuItem>
              </Tooltip>
              <Tooltip title={user.alerts.user===0?"No new comments on your profile":"Someone has commented your profile: you must accept or deny the comments"}>
              <MenuItem onClick={handleClose}>
                <Button variant={user.alerts.user===0?'text':'contained'}  color={user.alerts.user===0?'primary':'secondary'} size='small' sx={{mr:1, borderRadius:5}}>{user.alerts.user} </Button>profile valorations
              </MenuItem>
              </Tooltip>
              <Tooltip title={user.alerts.message===0?"":"You have non readed messages"}>
              <MenuItem onClick={handleClose}>
               <Button variant={user.alerts.message===0?'text':'contained'}  color={user.alerts.message===0?'primary':'secondary'} size='small' sx={{mr:1, borderRadius:5}}> {user.alerts.message} </Button>  New Messages: 
              </MenuItem>
              </Tooltip>
              <Divider />
              <MenuItem onClick={handleKarmaInfo} >
                Karma points: <Typography color='primary' sx={{fontWeight: 'bold', ml:1}}>{user.karma}</Typography> <IconButton size='small' > <InfoIcon /></IconButton>
              </MenuItem>
              <MenuItem onClick={handleLevelInfo} >
                Level:<Typography color='primary' sx={{fontWeight: 'bold', ml:1}}>{user.editingLevel}</Typography> <IconButton size='small' > <InfoIcon /></IconButton>
              </MenuItem>

              </MenuList>
          </Menu>
      </ThemeProvider> 
    </React.Fragment>
    </>:<></>}
    </>  
  )
          }
          else {
            return(<></>)
          }
}