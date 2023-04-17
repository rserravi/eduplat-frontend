// imports
import * as React from 'react'
import { Badge,  Button,  Divider,  IconButton, Menu, MenuItem, MenuList, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import i18next from 'i18next';
import { karmaLevel } from 'src/utils/karma';
import { UserCard } from 'src/ui-component/cards/user/userCard';


const theme = createTheme(themeOptions);

export const AlertsInBar = (props)=>{

  const {user} = props;

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  //const [error, setError] = useState();

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKarmaInfo = (event)=>{
    //TODO
    navigate("/karma");
  }

  const handleUserAlerts = (event)=>{
    navigate("/myaccount/valorations");
  }

  const handleMessages = (events)=>{
    navigate("/messages")
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
        <Badge badgeContent={user.alerts.total - user.alerts.message} color="secondary">
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
              <Typography sx={{fontWeight:"bold", fontSize:15, ml:2}}>{i18next.t("Alerts")}</Typography>
              <Tooltip title={user.alerts.resource===0?i18next.t("No new resources valued"):i18next.t("Someone has commented your resources:") + i18next.t("you must accept or deny the comments")}>
              <MenuItem onClick={handleUserAlerts}>
                <Button variant={user.alerts.resource===0?'text':'contained'}  color={user.alerts.resource===0?'primary':'secondary'} size='small' sx={{mr:1, borderRadius:5}}>{user.alerts.resource}</Button> {i18next.t("resources valorations")}
              </MenuItem>
              </Tooltip>
              <Tooltip title={user.alerts.user===0?i18next.t("No new comments on your profile"):i18next.t("Someone has commented your profile:") + i18next.t("you must accept or deny the comments")}>
              <MenuItem onClick={handleUserAlerts}>
                <Button  variant={user.alerts.user===0?'text':'contained'}  color={user.alerts.user===0?'primary':'secondary'} size='small' sx={{mr:1, borderRadius:5}}>{user.alerts.user} </Button>{i18next.t("profile valorations")}
              </MenuItem>
              </Tooltip>
              <Tooltip title={user.alerts.message===0?i18next.t("You have non readed messages"):i18next.t("You have unreaded messages")}>
              <MenuItem onClick={handleMessages}>
               <Button variant={user.alerts.message===0?'text':'contained'}  color={user.alerts.message===0?'primary':'secondary'} size='small' sx={{mr:1, borderRadius:5}}> {user.alerts.message} </Button> {i18next.t("New Messages:")}
              </MenuItem>
              </Tooltip>
              <Divider />
              <MenuItem onClick={handleKarmaInfo} >
                {i18next.t("Karma points:")} <Typography color='primary' sx={{fontWeight: 'bold', ml:1}}>{user.karma}</Typography> <IconButton size='small' > <InfoIcon /></IconButton>
              </MenuItem>
              <MenuItem onClick={handleKarmaInfo} >
                {i18next.t("Level")}<Typography color='primary' sx={{fontWeight: 'bold', ml:1}}>{karmaLevel(i18next.t(user.karma))}</Typography> 
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