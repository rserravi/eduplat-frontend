import * as React from 'react'
import { BrowserView, isBrowser } from 'react-device-detect';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { ExternalHeading } from 'src/components/pageStruct/externalHeading';
import EduSourceCard from 'src/ui-component/edusource/edusourcecard';
import { Resources } from 'src/components/resources/resources';
import { Copyright } from 'src/components/pageStruct/copyright';

const theme = createTheme(themeOptions);

const getRandomImageUrl = () =>{
    const num = Math.floor(Math.random() * 7) + 1;
    const url = 'url(/images/background'+num.toString()+'.jpg)';
    console.log(url);
    return url;

}

export const LandingPage = () =>{
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '70vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            backgroundImage: getRandomImageUrl(),
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: isBrowser?'center':'left',
                        }}
                    >
                        <Grid item component="menu">
                                <ExternalHeading />
                        </Grid> 
                        <Grid container 
  
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-end"
                            sx = {{pt:20, pb:10, pr:5, pl:20}}
                            >
                            <Grid item backgroundColor= 'primary.main'>
                                <Typography variant='h2' component='h3' color='primary.contrast'>
                                    EduPlat.org es la Plataforma Educativa
                                </Typography>
                            </Grid>
                            <Grid item backgroundColor= 'primary.main'>
                                <Typography variant='h2' component='h3' color='primary.contrastText'>
                                 donde estudiantes, familias, escuelas, profesores
                                </Typography>
                            </Grid>
                            <Grid item backgroundColor= 'primary.main'>
                                <Typography variant='h2' component='h3' color='primary.contrastText'>
                                y otros profesionales de la educación
                                </Typography>
                            </Grid>
                            <Grid item backgroundColor= 'primary.main'>
                                <Typography variant='h2' component='h3' color='primary.contrastText'>
                                pueden colaborar compartiendo recursos.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='a' component='a' color='primary.contrastText'>
                                    read more...
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Resources />
                    <Copyright />
                </Grid>
            </ThemeProvider>

        </React.Fragment>
    )
}