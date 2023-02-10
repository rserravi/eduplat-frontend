import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from 'src/theme/theme';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import config from 'src/config';
import Logo from 'src/ui-component/Logo';
import ProfileSection from './profileSection';

// ==========================|| INTERNAL HEADER LAYOUT ||============================//

const mdTheme = createTheme(themeOptions);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: config.drawerWidth,
      width: `calc(100% - ${config.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));



const InternalHeader = (props) => {
    const toggleDrawer = props.toggleDrawer;
    const open = props.open;

    
    return(
        <ThemeProvider theme={mdTheme}>
          <CssBaseline />
          
          <AppBar color="inherit" position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
                
           
              <IconButton
                edge="start"
                color="primary"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {!open && <Logo size={80}/>}
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, ml:5 }}
              >
    
              </Typography>
              <ProfileSection />
              
            </Toolbar>
          </AppBar>
        </ThemeProvider>
    )
};

export default InternalHeader;