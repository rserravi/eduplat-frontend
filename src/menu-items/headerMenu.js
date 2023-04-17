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
import i18next from 'i18next';


// ==============================|| HEADER MENU BROWSER ||============================== //



const theme = createTheme(themeOptions);

function HeaderMenu(props) {
  const navigate = useNavigate();
  const [anchorElNavResources, setAnchorElNavResources] = React.useState(null);
  const openResourcesNav = Boolean(anchorElNavResources);
  const {device, user} = props;

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
   
    navigate("/search/resources");
    window.location.reload()
  }

  const handelClickUsersSearch = (event) =>{
    navigate("/search/users");
    window.location.reload()
  }

  const handelClickCollectionSearch = (event) =>{
    navigate("/search/collections");
    window.location.reload()
  }

  const handelClickEvents = (event) =>{
   // navigate("/events");
   window.open("https://eduplat.org/es/feriarecursoseducativos/","_blank")
  }

  const handelClickAboutUs = (event) =>{
    navigate("/aboutus");
  }

  const handelClickVolunteers = (event) =>{
    //navigate("/volunteers");
    window.open("https://eduplat.org/es/colaborar/", "_blank")
  }

  const handelClickConnect= (event) =>{
    //navigate("/connect");
    window.open("https://eduplat.org/es/contacto/", "_blank")
  }

  const handleClickCreateResource = (event)=>{
    navigate("/resources/create")
  }

  const handleClickCreateCollection = (event)=>{
    navigate("/collections/create")
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
                {i18next.t("Resources")}
              </Button>
              
              
              <Button
                onClick={handelClickEvents}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                 {i18next.t("Events")}
              </Button>
              <Button
                onClick={handelClickAboutUs}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {i18next.t("About us")}
              </Button>
              <Button
                onClick={handelClickVolunteers}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                 {i18next.t("Volunteers")}
              </Button>

              <Button
                onClick={handelClickConnect}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                 {i18next.t("Connect")}
              </Button>
            </Box>   
            <div>
              {user && user.username!==""?
              <>
              <Menu anchorEl={anchorElNavResources} open={openResourcesNav} onClose={handleCloseNavResourcesMenu}>
                  <MenuList>
                      <MenuItem onClick={handelClickResourcesSearch}> {i18next.t("Search Resources")}</MenuItem>
                      <MenuItem onClick={handelClickCollectionSearch}> {i18next.t("Search Collections")}</MenuItem>
                      <MenuItem onClick={handelClickUsersSearch}> {i18next.t("Search Users")}</MenuItem> 
                    
                    
                      <Divider />
                      <MenuItem>
                        <Button onClick={handleClickCreateResource} variant='contained' color='secondary'> {i18next.t("Publish Resource")}</Button>  
                      </MenuItem>
                      <MenuItem>
                        <Button onClick={handleClickCreateCollection} variant='contained' color='primary'> {i18next.t("Create Collection")}</Button>  
                      </MenuItem>        
                  </MenuList>    
              </Menu>
              </>:
              <>
              <Menu anchorEl={anchorElNavResources} open={openResourcesNav} onClose={handleCloseNavResourcesMenu}>
                <MenuList>
                    <MenuItem onClick={handelClickResourcesSearch}>{i18next.t("Search Resources")}</MenuItem>
                    <MenuItem onClick={handelClickCollectionSearch}> {i18next.t("Search Collections")}</MenuItem>
                    <MenuItem onClick={handelClickUsersSearch}>{i18next.t("Search Users")}</MenuItem>  
                    
                </MenuList>    
              </Menu>
              </>}
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
                                    <Typography textAlign="center">{i18next.t("Resources")}</Typography>
                                </MenuItem>
                               
                                <MenuItem onClick={handelClickEvents}>
                                    <Typography textAlign="center">{i18next.t("Events")}</Typography>
                                </MenuItem>
                                <MenuItem onClick={handelClickAboutUs}>
                                    <Typography textAlign="center">{i18next.t("About us")}</Typography>
                                </MenuItem>
                                <MenuItem onClick={handelClickVolunteers}>
                                    <Typography textAlign="center">{i18next.t("Volunteers")}</Typography>
                                </MenuItem>
                                <MenuItem onClick={handelClickConnect}>
                                    <Typography textAlign="center">{i18next.t("Connect")}</Typography>
                                </MenuItem>
                        </Menu>
                        
                    </Box>
                    
                    <div>
                    {user && user.username!==""?
                    <>
                    <Menu anchorEl={anchorElNavResources} open={openResourcesNav} onClose={handleCloseNavResourcesMenu}>
                        <MenuList>
                            <MenuItem onClick={handelClickResourcesSearch}>{i18next.t("Search Resources")}</MenuItem>
                            <MenuItem onClick={handelClickCollectionSearch}> {i18next.t("Search Collections")}</MenuItem>
                            <MenuItem onClick={handelClickUsersSearch}>{i18next.t("Search Users")}</MenuItem> 
                            <Divider />
                            <MenuItem>
                              <Button onClick={handleClickCreateResource} variant='contained' color='secondary'> {i18next.t("Publish Resource")}</Button>  
                            </MenuItem>
                            <MenuItem>
                              <Button onClick={handleClickCreateCollection} variant='contained' color='primary'>{i18next.t("Create Collection")}</Button>  
                            </MenuItem>        
                        </MenuList>    
                    </Menu>
                    </>:
                    <>
                    <Menu anchorEl={anchorElNavResources} open={openResourcesNav} onClose={handleCloseNavResourcesMenu}>
                      <MenuList>
                          <MenuItem onClick={handelClickResourcesSearch}>{i18next.t("Search Resources")}</MenuItem>
                          <MenuItem onClick={handelClickCollectionSearch}> {i18next.t("Search Collections")}</MenuItem>
                          <MenuItem onClick={handelClickUsersSearch}>{i18next.t("Search Users")}</MenuItem>  
                      </MenuList>    
                    </Menu>
                    </>}
                  </div>
                 
            </ThemeProvider>
        )
        
    }
}
export default HeaderMenu;