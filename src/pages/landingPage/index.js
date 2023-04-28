import * as React from 'react'
import { isBrowser } from 'react-device-detect';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { ResourcesNetflixGrid } from 'src/components/resources/resources';
import { ShareBarBig } from 'src/components/pageStruct/sharebar';
import { fetchLastResources, getResourcesOfCategory } from 'src/api/edusourceApi';
import { Box } from '@mui/system';
import { useOutletContext } from 'react-router-dom';
import i18next from 'i18next';
import { SearchBarComponent } from 'src/components/search-bar-component';


const theme = createTheme(themeOptions);

const getRandomImageUrl = () =>{
    const num = Math.floor(Math.random() * 7) + 1;
    const url = 'url(/images/background'+num.toString()+'.jpg)';
    //console.log(url);
    return url;

}

export const LandingPage = () =>{
    
    const [newWidth] = useOutletContext();
    const [lastResources, SetLastResources] = React.useState();
    const [catOne, setcatOne]= React.useState();
    const [catTwo, setcatTwo]= React.useState();

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
        if (!catOne ||catOne===undefined ||catOne ===null){
            try {
                getResourcesOfCategory("ICT").then((response)=>{
    
                 setcatOne(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }
        if (!catTwo ||catTwo===undefined ||catTwo ===null){
            try {
                getResourcesOfCategory("Natural Sciences").then((response)=>{
    
                 setcatTwo(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }
        
    },[catOne, catTwo, lastResources])


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
                    <Grid container
                        direction="row" 
                        justifyContent="center"
                        alignItems="center"
                        
                        mt={4}
                    >
                        <Grid item>
                        <SearchBarComponent />
                   </Grid>

                    </Grid>
                    
                    {/* RESOURCES GRID */}
                  
                    <ResourcesNetflixGrid edusourceList={lastResources} title="Last Resources" mt={4} newWidth={newWidth}/> 
                  
                    <ResourcesNetflixGrid edusourceList={catTwo} title="Natural Sciences" newcolor="secondary.light" newWidth={newWidth}/>

                    <ResourcesNetflixGrid edusourceList={catOne} title="ICT" mt={4} newWidth={newWidth}/> 
                
                    {/* COPYRIGTH */}
                    <Grid item my={3} ml={4}>
                    <ShareBarBig />
                    </Grid>
                   
                </Grid>
            </Box>

            </ThemeProvider>

        </React.Fragment>
    )
}