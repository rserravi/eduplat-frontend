import * as React from 'react'
import { BrowserView, isBrowser } from 'react-device-detect';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { ExternalHeading } from 'src/components/pageStruct/externalHeading';

const theme = createTheme(themeOptions);

export const LandingPage = () =>{
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            backgroundImage: 'url(/images/background1.jpg)',
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
                            <Grid item>
                                <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    Connect players, parents, coaches <br/> and clubs.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='a' component='a' color='primary.contrastText'>
                                    read more...
                                </Typography>
                            </Grid>
                            <BrowserView>
                                <Grid item sx={{mt:5}}>
                                    <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    Record stats and allow individual <br/> and team improvement.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='a' component='a' color='primary.contrastText'>
                                        read more...
                                    </Typography>
                                </Grid>
                            </BrowserView>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>

        </React.Fragment>
    )
}