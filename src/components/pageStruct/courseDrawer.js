import * as React from 'react'
import { Divider, IconButton, List, Toolbar, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { themeOptions } from 'src/theme/theme';

import { mainListItems, secondaryListItems } from './listitems';

const theme = createTheme(themeOptions);

const CourseDrawer = (props) => {
    const {edusource, promote, open} = props;
    const drawerWidth = 240;

    const [drawerOpen, setDrawerOpen] = React.useState(open);

    const toggleDrawer = ()=>{
        console.log("Toggling")
        setDrawerOpen(!drawerOpen);
        if (drawerOpen){
            
        }
    }

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
      });
      
    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });
    
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'drawerOpen' })(
    ({ theme, drawerOpen }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(drawerOpen && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!drawerOpen && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
    );

    return (

        <Drawer variant="permanent" open={open}>

                 <Toolbar
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                    mt: [8],
                    }}
                >
                    
                    
                    <IconButton onClick={() => toggleDrawer()}>
                        {!open? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    {open?<>
                    <Typography variant='h4' sx={{p:[2]}}>
                        Course:
                    </Typography>
                    </>:<></>}
                </Toolbar>
               
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>

        </Drawer> 
    )

}


export default CourseDrawer;