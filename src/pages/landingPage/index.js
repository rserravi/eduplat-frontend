import * as React from 'react'
import { isBrowser } from 'react-device-detect';
//import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { ResourcesNetflixGrid } from 'src/components/resources/resources';
//import fakeLastResources from 'src/assets/fakeLists/lastResources'
//import fakeTagCloud from 'src/assets/fakeLists/fakeCloudTag';
//import { TagCloud } from 'react-tagcloud'
import { ShareBarBig } from 'src/components/pageStruct/sharebar';
import { fetchLastResources, getResourcesOfCategory } from 'src/api/edusourceApi';
import { Box } from '@mui/system';
import { useOutletContext } from 'react-router-dom';
import i18next from 'i18next';
import { useNavigate } from 'react-router-dom';
//import { replaceSpacesWithUnderscores } from 'src/utils/stringOperations';
import { categoriesList, iscedList } from 'src/utils/isced';
import { Divider, MenuItem, TextField } from '@mui/material';


const theme = createTheme(themeOptions);

const getRandomImageUrl = () =>{
    const num = Math.floor(Math.random() * 7) + 1;
    const url = 'url(/images/background'+num.toString()+'.jpg)';
    //console.log(url);
    return url;

}

/* const colorOptions = {
    luminosity: 'dark',
    hue: themeOptions.palette.secondary.main
  } */

/* const getCategoriesCloud = (resources) =>{
    const counts = {};

    for (const item of resources) {
      const discipline = item.discipline;
      if (discipline in counts) {
        counts[discipline]++;
      } else {
        counts[discipline] = 1;
      }
    }

    const disciplineCounts = Object.keys(counts).map(key => ({ value: key, count: counts[key] }))
    return disciplineCounts;
} */


export const LandingPage = () =>{
    
    const [newWidth] = useOutletContext();
    const [lastResources, SetLastResources] = React.useState();
    const [catOne, setcatOne]= React.useState();
    const [catTwo, setcatTwo]= React.useState();
    const navigate = useNavigate();

    const handleSelectLevel = (event, code)=>{
        event.preventDefault();
        navigate("/level/"+code);
    }

    const handleSelectCategory = (event)=>{
        event.preventDefault();
       navigate("/discipline/"+event.target.value);
      
    }

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
                     {/* TAGCLOUD */}
                    {/* {categoriesCloud?<>
                     <Grid item xs={5} backgroundColor= '#ffffff88' sx={{mt:4, ml:2}} >
                        <TagCloud
                                minSize={10}
                                maxSize={42}
                                colorOptions= {colorOptions}
                                tags={categoriesCloud}
                                //onClick={tag => alert(`'${tag.value}' was selected!`)}
                                onClick={tag => navigate("/discipline/"+ replaceSpacesWithUnderscores(tag.value))}
                            />
                    </Grid> 
                    </>:<></>} */}
                    <Grid container
                        direction="row" 
                        justifyContent="center"
                        alignItems="center"
                        columnSpacing={{ xs: 3}}
                        mt={4}
                    >
                    <Grid item  mb={2}>
                        <TextField
                            label ={i18next.t("Levels")}
                            select
                            defaultValue=" "
                            sx={{ 
                                mt:1,
                                '& fieldset': {
                                borderRadius: '20px',
                            },}}
                        >
                            {iscedList.map((option)=>{
                                return(
                                <MenuItem onClick={(e)=>{handleSelectLevel(e, option.label)}}  key={option.key} value={option.label+""}>{i18next.t(option.desc)}</MenuItem>
                                )
                               
                            })}
                             <Divider />
                            <MenuItem key={1000} value={" "}>{i18next.t("Search by level")}</MenuItem>
                        
                        </TextField>
                       
                    </Grid>
                    <Grid item mb={2} >
                        <TextField
                            label ={i18next.t("Categories")}
                            select
                            defaultValue=" "
                            onChange={handleSelectCategory}
                            sx={{ mt:1,
                                '& fieldset': {
                                borderRadius: '20px',
                            },}}
                        >
                                {categoriesList.map((cat)=>{
                                    return(
                                        <MenuItem key={cat.key} value={cat.label+""}>
                                            {i18next.t(cat.label)}
                                        </MenuItem>
                                        )
                                })}
                                <Divider />
                                <MenuItem key={1000} value={" "}>{i18next.t("Search by Category")}</MenuItem>
                        </TextField>
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