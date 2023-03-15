import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { userLogout } from 'src/api/userApi';
import { SET_NULL } from 'src/store/userSlice';


export const UserMenu = (props) =>{
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElLogin, setAnchorElLogin] = React.useState(null);
    const openUser = Boolean(anchorElUser);
    const openLogin = Boolean(anchorElLogin);
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
    }

    const handleMyAccountClick = ()=>{
        navigate('/myaccount');
    }

    const handleSettingsClick = ()=>{
        navigate('/settings');
    }

    const handleLogoutClick = ()=>{
        userLogout();
        dispatch(SET_NULL())
        navigate('/');
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
                        <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleRegisterClick}>
                        <Typography textAlign="center">Register</Typography>
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
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleMyAccountClick}>
                        My account
                    </MenuItem>
                    <Divider />
                    
                    <MenuItem onClick={handleSettingsClick}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </>
    }
    </>
    )
}