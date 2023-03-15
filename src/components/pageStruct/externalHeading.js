import * as React from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Logo from 'src/ui-component/Logo';
import { SearchInBar } from './searchInBar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from 'src/api/userApi';
import { useEffect } from 'react';
import { SET_AUTH_USER } from 'src/store/userSlice';
import { Divider } from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MainMenu } from './mainMenu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const theme = createTheme(themeOptions);


export const ExternalHeading = () =>{
     // eslint-disable-next-line
    const [error, setError] = useState("");
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginClick = () =>{
        navigate('/login');
    }

    const handleRegisterClick = () =>{
        navigate('/register');
    }
    
    // eslint-disable-next-line
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const openUser = Boolean(anchorElUser);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
    };
    

    useEffect(() =>{
        const loadUser = async () =>{
            try {
                await fetchUser().then((response)=>{
                    console.log(response)
                    if (response.user){
                        dispatch (SET_AUTH_USER(response.user));
                    }
                }).catch(error=>{
                    console.log(error);
                    setError(error);
                })
                
            } catch (error) {
                setError(error);
            }
        }
        
        async function fetchData(){
            if(!user ||user._id===""){
                const loadedUser =  loadUser()
                console.log(loadedUser)
            }
        }
        fetchData()
        
    },[user, dispatch])

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                {/* MOBILE  */}
               
                <MainMenu style={'mobile'} />
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <Logo color="white"/>
                </Box>
                {/* BROWSER */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', }, ml:4 }}>
                    <Logo color="white"/>
                    <SearchInBar/> 
                </Box>

                 {/* BROWSER */}
                <MainMenu style={'browser'}/>
               
                {/* MOBILE AND BROWSER */}
                {user.loaded?<>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={user.firstname + " " + user.lastname}>
                        <IconButton 
                            onClick={handleOpenUserMenu}
                            aria-controls={openUser ? 'account-menu' : undefined}
                            aria-expanded={openUser ? 'true' : undefined}
                            sx={{ p: 0 }}
                        >
                            <Avatar alt={user.name + user.lastname} src={user.picture.fileName} />
                        </IconButton>
                        </Tooltip>
                    </Box>
                </>:
                <>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button variant='contained' color='secondary' onClick={handleLoginClick} >
                            Login
                        </Button>
                        <Button variant='contained' color='secondary'  onClick={handleRegisterClick}>
                            SignUp
                        </Button>
                    </ButtonGroup>
                </>}        
                
                </Toolbar>

                {/* MOBILE  */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mb:2, mt:1 }}>
                    <SearchInBar/>
                </Box>
            </Container>
            </AppBar>

            <Menu
                anchorEl={anchorElUser}
                id="account-menu"
                open={openUser}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            </ThemeProvider>
        </React.Fragment>
    )
}