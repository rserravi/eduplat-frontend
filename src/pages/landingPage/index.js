import * as React from 'react'
import { isBrowser } from 'react-device-detect';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { ResourcesNetflixGrid } from 'src/components/resources/resources';
import fakeLastResources from 'src/assets/fakeLists/lastResources'
import fakeTagCloud from 'src/assets/fakeLists/fakeCloudTag';
import { TagCloud } from 'react-tagcloud'
import { ShareBarBig } from 'src/components/pageStruct/sharebar';
import { fetchLastResources, getResourcesOfCategory } from 'src/api/edusourceApi';
import { Box } from '@mui/system';
import { useOutletContext } from 'react-router-dom';
import i18next from 'i18next';


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
    
  
    const [newWidth] = useOutletContext();
    const [lastResources, SetLastResources] = React.useState();
    const [computerScience, setComputerScience]= React.useState();

    React.useEffect(()=>{
        if (!lastResources ||lastResources===undefined ||lastResources ===null){
            try {
                fetchLastResources().then((response)=>{
    
                 SetLastResources(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }
        if (!computerScience ||computerScience===undefined ||computerScience ===null){
            try {
                getResourcesOfCategory("Computer Science").then((response)=>{
    
                 setComputerScience(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }
    },[])


    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box width={newWidth}>
                <Grid container>
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
                                        {i18next.t("landingText1line")}
                                    </Typography>
                                </Grid>
                                <Grid item backgroundColor= 'primary.main'>
                                    <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    {i18next.t("landingText2line")}
                                    </Typography>
                                </Grid>
                                <Grid item backgroundColor= 'primary.main'>
                                    <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    {i18next.t("landingText3line")}
                                    </Typography>
                                </Grid>
                                <Grid item backgroundColor= 'primary.main'>
                                    <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    {i18next.t("landingText4line")}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='a' component='a' color='primary.contrastText'>
                                        {i18next.t("readmore...")}
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
                  
                    <ResourcesNetflixGrid edusourceList={lastResources} title="Last Resources" mt={4} newWidth={newWidth}/> 
                  
                    <ResourcesNetflixGrid edusourceList={computerScience} title="Computer Science" newcolor="secondary.light" newWidth={newWidth}/>
                
                    {/* COPYRIGTH */}
                    <Grid item my={3}>
                    <ShareBarBig />
                    </Grid>
                   
                    <Grid item>
                   
                    </Grid>
                </Grid>
            </Box>
            </ThemeProvider>

        </React.Fragment>
    )
}