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

var newMaxWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const MainLayout = () => {
    const [newWidth, setNewWidth] = React.useState(newMaxWidth);
    React.useEffect(() => {

        function handleResize() {
            setNewWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        }


    window.addEventListener('resize', handleResize)

    },[])
   
    return(
        <ThemeProvider theme={themeOptions} >
            <Box sx={{ display: 'flex', width:newWidth }}>
                <CssBaseline />
               
                <Box
                    component="main"
                >        
                    <MainHeader />
                    <Toolbar />
                    <Container sx={{ mb: 4}}>
                            <Outlet context={[newWidth]} />
                        
                    </Container>
                </Box>
            </Box>
            <Box 
                display={'flex'}
                justifyContent="center"
                alignItems="center"
               
            >
            <Copyright width={newWidth}/> 
            </Box>
            <div id="snack"></div>
        </ThemeProvider>
        
        )
};

export default MainLayout;
