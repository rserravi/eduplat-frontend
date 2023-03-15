import { ThemeProvider } from '@mui/private-theming';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Copyright } from 'src/components/pageStruct/copyright';
import { themeOptions } from 'src/theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Toolbar } from '@mui/material';
import MainHeader from 'src/components/pageStruct/mainHeading';


// project imports


// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
   
    return(
        <ThemeProvider theme={themeOptions} >
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
               
                <Box
                    component="main"
                >        
                    <MainHeader />
                    <Toolbar />
                    <Container sx={{ mb: 4}}>
                        <Outlet />
                        
                    </Container>
                </Box>
            </Box>
            <Box 
                display={'flex'}
                justifyContent="center"
                alignItems="center"
               
            >
            <Copyright /> 
            </Box>
        </ThemeProvider>
        )
};

export default MainLayout;
