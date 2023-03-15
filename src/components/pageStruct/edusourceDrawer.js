import * as React from 'react'
import { Divider, Grid, IconButton, Link, List, Toolbar, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';

import { themeOptions } from 'src/theme/theme';

import { DrawerValorations } from './listitems';
import { useSelector, useDispatch } from 'react-redux';
import { SET_DRAWER_WIDTH } from 'src/store/customizationSlice';
import { useRef } from 'react';

const theme = createTheme(themeOptions);

const EdusourceDrawer = (props) => {
    const {edusource, promoter, drawerOpen} = props;
    const user = useSelector(state => state.user)
    const custom = useSelector(state => state.custom)
    const dispatch = useDispatch();
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    console.log(windowSize)

    const [open, setOpen] = React.useState(drawerOpen);
    const [drawerDefaut, setDrawerDefault] = React.useState(240)

    const toggleDrawer = ()=>{
        //console.log("Toggling")
        setOpen(!open);
        if(!open){
            dispatch(SET_DRAWER_WIDTH(240))
        }
        else {
            dispatch(SET_DRAWER_WIDTH(60))
        }
    }

    const openedMixin = (theme) => ({
        width: drawerDefaut,
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
    
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: custom,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
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
                        Individual Lesson
                    </Typography>
                    </>:<></>}
                </Toolbar>
               
                
                {open?<>
                    <Divider />
                    <Typography variant='body1' sx={{px:[2], pt:[2]} }>
                        Category: <Link href={'/discipline/'+edusource.discipline}>{edusource.discipline}</Link>
                        </Typography>
                        <Typography variant='body1' sx={{px:[2]}}>
                        Themes: {edusource.theme?
                                    edusource.theme.map((tema, index)=>{
                                        return(<React.Fragment key={index}><i><Link href={"/theme/" + tema}> #{tema} </Link></i></React.Fragment>)
                                    })
                                :<></>}   
                </Typography>
                
                </>:<></>}
                
                <List component="nav">

                    <Divider sx={{ my: 1 }} />
                    
                    <DrawerValorations  edusource={edusource} />

                    {open?
                    <>
                    <Grid container justifyContent="flex-end" >  
                        <Grid item> 
                        {user._id===""?<Link sx={{px:[2]}} href="/login" variant="body2">Login to comment</Link>:<></>}
                        </Grid>
                    </Grid>
                    </>:
                    <>
                        <IconButton>
                            <LoginTwoToneIcon />
                        </IconButton>
                    </>
                    }
                </List>

        </Drawer> 
    )

}


export default EdusourceDrawer;