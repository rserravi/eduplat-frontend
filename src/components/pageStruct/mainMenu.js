import * as React from 'react';
import { Box, Button, IconButton, Menu } from '@mui/material';
import { mainMenuList } from 'src/utils/mainmenu-json';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';


export const MainMenu = (props) =>{
    const {style} = props;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElSubNav, setAnchorElSubNav] = React.useState(null);


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleOpenSubNavMenu = (event) => {
        setAnchorElSubNav(event.currentTarget);
    };

    const isObject = (item) =>{
        return (
            (typeof item === 'object')
        )
    }

    if (style==='browser')
    return (
        <>
         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', }, ml:4 }}>
                {mainMenuList.map((page) => (
                 <>
                 {isObject(page)?<>
                    <Button
                        key={page.label}
                        onClick={handleOpenSubNavMenu}
                        aria-label="categories"
                        aria-controls="submenu-browser"
                        aria-haspopup="true"
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page.label}
                    </Button>
                    
                 </>:
                 <>
                    <Button
                        key={page.label}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page.label}
                    </Button>
                    </>}
                </>
                ))}
            </Box>
            <Menu
                        id="submenu-browser"
                        anchorEl={anchorElSubNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElSubNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Cat 1</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Cat 1</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Cat 1</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Cat 1</Typography>
                        </MenuItem>

                    </Menu>
        </>
    )
    else{
        return(
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
                {mainMenuList.map((page) => (
                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
        )
    }
}