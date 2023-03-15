import { Box,  CssBaseline, Grid, Typography } from '@mui/material';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEdusourceByLink } from 'src/api/edusourceApi';
import { EdusourceHeader } from 'src/components/resources/edusourceHeader';
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { fetchUserbyId } from 'src/api/userApi';
import { EdusourceBody } from 'src/components/resources/edusourceBody';
import { EdusourceValorations } from 'src/components/resources/edusourceValorations';
import CourseDrawer from 'src/components/pageStruct/courseDrawer';
import EdusourceDrawer from 'src/components/pageStruct/edusourceDrawer';
import { useDispatch } from 'react-redux';
import { MENU_OPEN } from 'src/store/menuSlice';

const theme = createTheme(themeOptions);

export const EdusourcePage = () =>{

    const {id} = useParams();
    const dispatch = useDispatch();
    const [edusource, setEdusource] = useState();
    const [promoter, setPromoter] = useState();
     // eslint-disable-next-line
     const [error, setError] = useState("");
     

    useEffect(() =>{
      
       if(!edusource || edusource===null){
            dispatch(MENU_OPEN("/edusource/"+id));
            try {
                 fetchEdusourceByLink(id).then((response)=>{
                    setEdusource(response.result)
                    
                    fetchUserbyId(response.result.promoterId).then((fetchedPromoter)=>{
                        setPromoter(fetchedPromoter.user)

                    }).catch(error=>{setError(error)})                    
                }).catch(error=>{
                    console.log(error);
                    setError(error);
                })
                
            } catch (error) {
                setError(error);
            }
        }
        
        //console.log(loadEdusource)
        

    },[edusource, id, dispatch])

    return(
        <React.Fragment>
             <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', width: '100%' }}> 
                <CssBaseline />
            {edusource && promoter?
            <>
               {edusource.course?
                <CourseDrawer edusource={edusource} promoter={promoter} drawerOpen={true}/>:
                <EdusourceDrawer edusource={edusource} promoter={promoter} drawerOpen={true}/>}    
               
            
            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    >
                        <Grid item>
                            <EdusourceHeader edusource={edusource} promoter={promoter} />
                        </Grid>
                        
                </Grid>
            
                <Grid item sx={{mt:2, }} >
                    <Typography variant='body1' component='p'>
                        {edusource.description}
                    </Typography>
                    
                </Grid>
            
                
                <EdusourceBody edusource={edusource} promoter={promoter} />
                
            </Box>
            
            </>:
            error?<>{error}</>:<><Loader /></>
            }
            </Box>
            </ThemeProvider>
        </React.Fragment>
        
    )
}