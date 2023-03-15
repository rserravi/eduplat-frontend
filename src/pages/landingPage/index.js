import * as React from 'react'
import { BrowserView, isBrowser } from 'react-device-detect';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { ResourcesNetflixGrid } from 'src/components/resources/resources';
import fakeLastResources from 'src/assets/fakeLists/lastResources'
import fakeTagCloud from 'src/assets/fakeLists/fakeCloudTag';
import { Copyright } from 'src/components/pageStruct/copyright';
import { TagCloud } from 'react-tagcloud'
import MainHeader from 'src/components/pageStruct/mainHeading';
import { ShareBarBig } from 'src/components/pageStruct/sharebar';


const theme = createTheme(themeOptions);

const getRandomImageUrl = () =>{
    const num = Math.floor(Math.random() * 7) + 1;
    const url = 'url(/images/background'+num.toString()+'.jpg)';
    //console.log(url);
    return url;

}

const colorOptions = {
    luminosity: 'dark',
    hue: themeOptions.palette.secondary.main
  }

export const LandingPage = () =>{
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Grid container>
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
                                <MainHeader />
                        </Grid>

                      

                            {/* TEXTO */}

                        <Grid item>

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
                        
                        
                    </Grid>
                </Grid>

                {/* BODY */}

                <Grid container 
                    
                    direction="column"
                    alignItems="center"
                    >
                     {/* TAGCLOUD */}

                     <Grid item xs={5} backgroundColor= '#ffffff88' sx={{mt:4}} >
                                <TagCloud
                                        minSize={10}
                                        maxSize={42}
                                        colorOptions= {colorOptions}
                                        tags={fakeTagCloud}
                                        onClick={tag => alert(`'${tag.value}' was selected!`)}
                                    />
                            </Grid> 
                    {/* RESOURCES GRID */}
                  
                    <ResourcesNetflixGrid edusourceList={fakeLastResources} title="Last Resources" mt={4}/>
                  
                    <ResourcesNetflixGrid edusourceList={fakeLastResources} title="Recently visited" newcolor="secondary.light"/>
                
                    {/* COPYRIGTH */}
                    <Grid item my={3}>
                    <ShareBarBig />
                    </Grid>
                   
                    <Grid item>
                    <Copyright />
                    </Grid>
                </Grid>
            </ThemeProvider>

        </React.Fragment>
    )
}