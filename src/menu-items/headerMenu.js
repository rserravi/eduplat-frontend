import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { Divider, IconButton, MenuList, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


// ==============================|| HEADER MENU BROWSER ||============================== //



const theme = createTheme(themeOptions);

function HeaderMenu(props) {
  const navigate = useNavigate();
  const [anchorElNavResources, setAnchorElNavResources] = React.useState(null);
  const openResourcesNav = Boolean(anchorElNavResources);
  const {device} = props;

  const handleOpenNavResourcesMenu = (event) => {
    setAnchorElNavResources(event.currentTarget);
  };

  const handleCloseNavResourcesMenu = () => {
    setAnchorElNavResources(null);
  };

  const [anchorElMobile, setAnchorElMobile] = React.useState(null);
  const openMobileNav = Boolean(anchorElMobile);

  const handleOpenNavMobile = (event) => {
    setAnchorElMobile(event.currentTarget);
  };

  const handleCloseNavMobile= () => {
    setAnchorElMobile(null);
  };

  const handelClickResourcesSearch = (event) =>{
    console.log("SEARCH");
    navigate("/search");
  }


  if (device === "Browser"){

  return (
    <ThemeProvider theme={theme}>
        {/* FOR BROWSER */}
          <Box sx={{ flexGrow: 1,  ml: 6, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                onClick={handleOpenNavResourcesMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Resources
              </Button>
              
              
              <Button
                onClick={handleCloseNavResourcesMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Events
              </Button>
              <Button
                onClick={handleCloseNavResourcesMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About us
              </Button>
              <Button
                onClick={handleCloseNavResourcesMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Volunteers
              </Button>

              <Button
                onClick={handleCloseNavResourcesMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Connect
              </Button>
            </Box>   
            <div>
            <Menu anchorEl={anchorElNavResources} open={openResourcesNav} onClose={handleCloseNavResourcesMenu}>
                <MenuList>
                    <MenuItem  onClick={handelClickResourcesSearch}>Search Resources</MenuItem>
                    <MenuItem>Search Collections</MenuItem>
                    <MenuItem>Search Users</MenuItem>
                
                </MenuList>    
            </Menu>

            
            </div>
         
    </ThemeProvider>
  );
    }
    else{
        return (
            <ThemeProvider theme={theme}>
                {/* FOR Mobile */}
                  <Box sx={{ flexGrow: 1,  display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="mobile menu"
                        aria-controls="mobile-menu"
                        aria-haspopup="true"
                        onClick={handleOpenNavMobile}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                            id="mobile-menu"
                            anchorEl={anchorElMobile}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={openMobileNav}
                            onClose={handleCloseNavMobile}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                                <MenuItem onClick={handleOpenNavResourcesMenu}>
                                    <Typography textAlign="center">Resources</Typography>
                                </MenuItem>
                               
                                <MenuItem onClick={handleCloseNavMobile}>
                                    <Typography textAlign="center">Events</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMobile}>
                                    <Typography textAlign="center">About us</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMobile}>
                                    <Typography textAlign="center">Volunteers</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMobile}>
                                    <Typography textAlign="center">Connect</Typography>
                                </MenuItem>
                        </Menu>
                        
                    </Box>
                    
                    <div>
                    <Menu anchorEl={anchorElNavResources} open={openResourcesNav} onClose={handleCloseNavResourcesMenu}>
                        <MenuList>
                          <MenuItem onClick={handelClickResourcesSearch}>Search Resources</MenuItem>
                          <MenuItem>Search Collections</MenuItem>
                          <MenuItem>Search Users</MenuItem>
                        </MenuList>    
                    </Menu>
        
                    </div>
                 
            </ThemeProvider>
        )
        
    }
}
export default HeaderMenu;