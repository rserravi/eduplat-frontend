import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Link} from "@mui/material";
import Logo from 'src/ui-component/Logo';
import { FollowUs } from './sharebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const theme = createTheme(themeOptions);

export const Copyright = (props)=> {
    const {short} = props;

    if (short) {
        return (
            <>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                        {'Copyright © '}
                        <Link color="inherit" href="https://eduplat.org/">
                            EduPlat.org
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
            </>
        )
    }
    else
    return (
        <React.Fragment>
             <ThemeProvider theme={theme} >
            <Box sx={{ backgroundColor:'primary.light' }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                sx={{my:2}}
                >
                <Grid  md={4} xs={12} p={2}>
                    <Grid 
                        container
                        direction="column"
                        >
                        <Grid item>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Logo color="black" />
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <Logo color="black" size="350"/>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant='body2'>Follow us</Typography>
                        </Grid>
                        <Grid item>
                            <FollowUs />
                        </Grid>


                    </Grid>
                </Grid>
                <Grid  md={4} xs={12} p={2}>
                    <Grid 
                        container
                        direction="column"
                        >
                        <Grid item>
                            <Typography>Centro de Ayuda</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Términos de uso</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Privacidad</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Cookies</Typography>
                        </Grid>

                    </Grid>
                </Grid>
               
                <Grid  md={4} xs={12} p={2}>
                    <Grid 
                        container
                        direction="column"
                        >
                        <Grid item>
                            <Typography>Bienesdar.org</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Eduplat.org</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Eventos</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>¿Cómo colaborar?</Typography>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid md={12} xs={12} sx={{my:2}}>
                    <Typography variant="body2" color="text.secondary" align="center" {...props}>
                        {'Copyright © '}
                        <Link color="inherit" href="https://eduplat.org/">
                            EduPlat.org
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Grid>
            
        </Grid>
        </Box>
        </ThemeProvider>
        </React.Fragment>
    );
  }
  