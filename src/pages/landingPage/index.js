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
import { fetchLastCollections } from 'src/api/collectionApi';


const theme = createTheme(themeOptions);

const getRandomImageUrl = () =>{
    const num = Math.floor(Math.random() * 7) + 1;
    const url = 'url(/images/background'+num.toString()+'.jpg)';
    return url;

}

export const LandingPage = () =>{
    
    const [newWidth] = useOutletContext();
    const [lastResources, SetLastResources] = React.useState();
    const [lastTotal, setLastTotal]= React.useState();
    const [catOne, setcatOne]= React.useState();
    const [catOneTotal, setCatOneTotal] = React.useState();
    const [catTwo, setcatTwo]= React.useState();
    const [catTwoTotal, setCatTwoTotal] = React.useState();
    const [lastCollections, setLastCollections] = React.useState();
    const [lastCollectionTotla, setLastCollectionTotal]=React.useState();

    const onPageLastRChange = (page)=>{
        try {
                fetchLastResources(page).then((response)=>{
                 //console.log("RESPONSE EN ONPAGECHANGE", response)
                 SetLastResources(response.data.data)
                 setLastTotal(response.data.total)
                
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
    }

    const onPageCat1Change = (page)=>{
        try {
            getResourcesOfCategory("ICT",page).then((response)=>{

                setcatOne(response.data.data)
                setCatOneTotal(response.data.total)
               
           }).catch(error=>{
               
            console.log(error);
           })
           
       } catch (error) {
        console.log(error);
       }
    }

    const onPageCat2Change = (page)=>{
        try {
            getResourcesOfCategory("Natural Sciences",page).then((response)=>{

                setcatTwo(response.data.data)
                setCatTwoTotal(response.data.total)
               
           }).catch(error=>{
               
            console.log(error);
           })
           
       } catch (error) {
        console.log(error);
       }
    }

    const onLastCollectionChange = (page)=>{
        try {
            fetchLastCollections(page).then((response)=>{
             //console.log("RESPIESTE EN USEEFFECT",response.data.result.data)
             setLastCollections(response.data.result.data)
             setLastCollectionTotal(response.data.result.total)
               
           }).catch(error=>{
               
            console.log(error);
           })
           
       } catch (error) {
        console.log(error);
       }
    }

    

    React.useEffect(()=>{
        if (!lastResources ||lastResources===undefined ||lastResources ===null){
            try {
                fetchLastResources(1).then((response)=>{
                // console.log("RESPONSE EN FETCHLAST", response)
                 SetLastResources(response.data.data)
                 setLastTotal(response.data.total)
                
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }
        if (!catOne ||catOne===undefined ||catOne ===null){
            try {
                getResourcesOfCategory("ICT",1).then((response)=>{
                   // console.log("CHECK RESPONSE", response)
                 setcatOne(response.data.data)
                 setCatOneTotal(response.data.total)
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }
        if (!catTwo ||catTwo===undefined ||catTwo ===null){
            try {
                getResourcesOfCategory("Natural Sciences",1).then((response)=>{
                 
                 setcatTwo(response.data.data)
                 setCatTwoTotal(response.data.total)
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }

        if (!lastCollections || lastCollections===undefined || lastCollections===null){
            try {
                fetchLastCollections(1).then((response)=>{
                 console.log("RESPIESTE EN USEEFFECT",response.data.result.data)
                 setLastCollections(response.data.result.data)
                 setLastCollectionTotal(response.data.result.total)
                   
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
                                        {i18next.t("EduPlat.org is the Educational Platform")}
                                    </Typography>
                                </Grid>
                                <Grid item backgroundColor= 'primary.main'>
                                    <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    {i18next.t("where students, families, schools, teachers")}
                                    </Typography>
                                </Grid>
                                <Grid item backgroundColor= 'primary.main'>
                                    <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    {i18next.t("and other education professionals")}
                                    </Typography>
                                </Grid>
                                <Grid item backgroundColor= 'primary.main'>
                                    <Typography variant='h2' component='h3' color='primary.contrastText'>
                                    {i18next.t("can collaborate by sharing resources.")}
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
                        
                        mt={1}
                    >
                        <Grid item sx={{ml:2}}>
                        <SearchBarComponent />
                   </Grid>

                    </Grid>
                    
                    {/* RESOURCES GRID */}
                  
                    <ResourcesNetflixGrid edusourceList={lastResources} title="Last Resources" mt={4} newWidth={newWidth} total={lastTotal} setPage={onPageLastRChange}/> 
                  
                    <ResourcesNetflixGrid edusourceList={lastCollections} title="Last Colections" newcolor="secondary.light" newWidth={newWidth} total={lastCollectionTotla} isCollection={true} setPage={onLastCollectionChange}/>

                    <ResourcesNetflixGrid edusourceList={catOne} title="ICT" mt={4} newWidth={newWidth} total={catOneTotal} setPage={onPageCat1Change}/> 
                
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