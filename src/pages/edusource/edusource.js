import { Box,  Button,  ButtonGroup,  CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteResource, fetchEdusourceByLink } from 'src/api/edusourceApi';
import { EdusourceHeader } from 'src/components/resources/edusourceHeader';
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { fetchUserbyId } from 'src/api/userApi';
import { EdusourceBody } from 'src/components/resources/edusourceBody';
import CourseDrawer from 'src/components/pageStruct/courseDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN } from 'src/store/menuSlice';
import { useOutletContext } from 'react-router-dom';
import i18next from 'i18next';
import { useNavigate } from 'react-router-dom';


const theme = createTheme(themeOptions);

export const EdusourcePage = () =>{

    const {id} = useParams();
    const dispatch = useDispatch();
    const [edusource, setEdusource] = useState();
    const [promoter, setPromoter] = useState();
     // eslint-disable-next-line
     const [error, setError] = useState("");
    const [newWidth] = useOutletContext();
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [eduToDelete, setEduToDelete] = React.useState();
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    const editClickHandle = (event, edusource)=>{
        event.preventDefault();
        navigate("/resources/edit/"+edusource.resourceURL)
    }

    const deleteCliclHandle = (event, edusource)=>{
        event.preventDefault();
        setEduToDelete(edusource);
        setDeleteDialog(true);

    }
    const deleteDialogClose = (event)=>{
        setDeleteDialog(false);
    }

    const dangerouslyProceedToDelete = async (event)=>{
        try {
            if (eduToDelete){
                await deleteResource(eduToDelete).then((data)=>{
                    console.log(data)
                    setDeleteDialog(false)
                  
                }).catch((err)=>{
                    console.log(err);
                })
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }

 

    useEffect(() =>{
      
       if(!edusource || edusource===null){
            dispatch(MENU_OPEN("/resource/"+id));
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
                <></>}    
               
            
            <Box component="main" sx={{ flexGrow: 1, p: 2}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    >
                        <Grid item>
                            <EdusourceHeader edusource={edusource} promoter={promoter} newWidth={newWidth}/>
                        </Grid>
                        
                </Grid>
            
                <Grid item sx={{mt:2, }} >
                    <Typography variant='body1' component='p'>
                        {edusource.description}
                    </Typography>
                    
                </Grid>
                
                {user && ((user._id===edusource.promoterId) || user.isBoss)?<>
                <Grid item sx= {{my:1}}>
                    <ButtonGroup >
                        <Button color='secondary' variant='contained' onClick={(e)=>{ editClickHandle(e, edusource)}} size="small" sx={{borderRadius :"15px", mt:1}}>{i18next.t("edit")}</Button>
                        <Button color='secondary' variant='contained' onClick={(e)=>{ deleteCliclHandle(e, edusource)}} size="small" sx={{borderRadius :"15px", mt:1}}>{i18next.t("delete")}</Button>
                    </ButtonGroup>
                    </Grid>
                </>:<></>}
                
                <EdusourceBody edusource={edusource} promoter={promoter} newWidth={newWidth} />
                
            </Box>
            
            </>:
            error?<>{error}</>:<><Loader /></>
            }
            </Box>

             {/* DELETE DIALOG */}


            <Dialog
                open={deleteDialog}
                onClose={deleteDialogClose}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    {i18next.t("Do you really want to delete this resource?")}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    {i18next.t("DeleteInstrucctions")}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={deleteDialogClose}  autoFocus>{i18next.t("Cancel")}</Button>
                <Button onClick={dangerouslyProceedToDelete}> {i18next.t("Accept")} </Button>
                </DialogActions>
            </Dialog>

            </ThemeProvider>
        </React.Fragment>
        
    )
}