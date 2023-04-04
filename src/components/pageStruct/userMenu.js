import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Alert, Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Snackbar, Tooltip, Typography } from "@mui/material"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { userLogout } from 'src/api/userApi';
import { SET_NULL } from 'src/store/userSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';

const theme = createTheme(themeOptions);

export const UserMenu = (props) =>{
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElLogin, setAnchorElLogin] = React.useState(null);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const openUser = Boolean(anchorElUser);
    const openLogin = Boolean(anchorElLogin);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
      };
    

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenLoginMenu = (event) => {
        setAnchorElLogin(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
    };

    const handleCloseLoginMenu = (event) => {
        setAnchorElLogin(null);
    };

    const handleLoginClick = () =>{
        navigate('/login');
    }

    const handleRegisterClick = () =>{
        navigate('/register');
    }
    
    const handleProfileClick = ()=>{
      
        navigate('/user/'+user.username)
        window.location.reload()
    }

    const handleMyAccountClick = ()=>{
        navigate('/myaccount');
    }

    const handleSettingsClick = ()=>{
        navigate('/settings');
    }

    const handleClickCreateResource = (event)=>{
        navigate("/resources/create")
      }
    
    const handleClickCreateCollection = (event)=>{
        navigate("/collections/create")
    }

    const handleLogoutClick = async ()=>{
        await userLogout().then((result)=>{
            if (result.status==="success"){
                dispatch(SET_NULL())
                navigate('/');
            }
            else{
                setErrorMsg(result.message);
                setSnackOpen(true);
            }
            
        }).catch((error)=>{
            setErrorMsg(error.message);
            setSnackOpen(true);
        })
        
        setAnchorElUser(null);
    }

    return(
        <>
        {!user.loaded?
            <Box sx={{ flexGrow: 0, ml:2 }}>
                <Tooltip title="Login / Register">
                    <IconButton onClick={handleOpenLoginMenu} sx={{ p: 0 }}>
                        <Avatar  >
                            <PersonOutlineIcon />
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="login-menu"
                    anchorEl={anchorElLogin}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={openLogin}
                    onClose={handleCloseLoginMenu}
                >
                
                    <MenuItem onClick={handleLoginClick}>
                        <Typography textAlign="center">{i18next.t("signIn")}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleRegisterClick}>
                        <Typography textAlign="center">{i18next.t("signUp")}</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        :<>
            <Box sx={{ flexGrow: 0, ml:2  }}>
                <Tooltip title={user.firstname + " " + user.lastname}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user.firstname + " " + user.lastname} src={user.picture.fileName} >
                            <PersonOutlineIcon />
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={openUser}
                    onClose={handleCloseUserMenu}
                >
                
                    <MenuItem onClick={handleProfileClick}>
                        {i18next.t("Profile")}
                    </MenuItem>
                    <MenuItem onClick={handleMyAccountClick}>
                        {i18next.t("My account")}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <Button onClick={handleClickCreateResource} variant='contained' color='secondary'>
                            {i18next.t("Publish Resource")}
                        </Button>
                    </MenuItem>

                    <MenuItem>
                        <Button onClick={handleClickCreateCollection} variant='contained' color='primary'>
                            {i18next.t("Create Collection")}
                        </Button>
                    </MenuItem>

                    <MenuItem onClick={handleSettingsClick}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        {i18next.t("Settings")}
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {i18next.t("Logout")}
                    </MenuItem>
                </Menu>
            </Box>
        </>
    }
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
    )
}