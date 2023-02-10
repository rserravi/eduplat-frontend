import { ThemeProvider } from '@mui/private-theming';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Copyright } from 'src/components/pageStruct/copyright';
import InternalHeader from 'src/components/pageStruct/internalHeading';
import SideDrawer from 'src/components/pageStruct/sideDrawer';
import { themeOptions } from 'src/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from 'src/api/userApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SET_AUTH_USER } from 'src/store/userSlice';
import { useNavigate } from 'react-router-dom';


// project imports


// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const [open, setOpen] = useState(true);
    const [error, setError] = useState("");
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    

    useEffect(() =>{
        const loadUser = async () =>{
            try {
                await fetchUser().then((response)=>{
                    //console.log(response)
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
                //console.log(loadedUser)
            }
        }
        fetchData()
        
    },[user, dispatch])


    if (user && user._id!=="" && !error){
        if(user.isCompleted===0){
            navigate("/completeProfile");
        }
        return(
            <ThemeProvider theme={themeOptions} >
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <InternalHeader open={open} toggleDrawer={toggleDrawer} />
                    <SideDrawer open={open} toggleDrawer={toggleDrawer} />
                
                    <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                    >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Outlet />
                    </Container>
                    </Box>
                </Box>
                <Copyright />
            </ThemeProvider>
        )
    }
    else {
        if (error==="Token not found!"){
            navigate("/login");
        }
        
        return(
            <>
               {error?<>{error}</>: <>LOADING</>}
            </>
        )
    }

    

};

export default MainLayout;
