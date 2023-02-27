import * as React from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Logo from 'src/ui-component/Logo';
import { SearchInBar } from '../extendedMui/searchInBar';

const pages = ['platform', 'events', 'about us', 'volunteers'];

export const ExternalHeading = () =>{
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    const handleLoginClick = () =>{
        navigate('/login');
    }

    const handleRegisterClick = () =>{
        navigate('/register');
    }
    
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    // eslint-disable-next-line
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
    const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    return (
        <React.Fragment>
        <AppBar >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
               
               

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <Logo color="white"/>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', }, ml:4 }}>
                    <SearchInBar/>
                </Box>
                
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', }, ml:4 }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
               

                {user.loaded?<>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Enter to EduPlat">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={user.name + user.lastname} src={user.picture} />
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
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mb:2, mt:1 }}>
                    <SearchInBar/>
                </Box>
            </Container>
            </AppBar>
        </React.Fragment>
    )
}