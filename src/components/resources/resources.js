import { Button, ButtonGroup, Grid, IconButton, Typography } from '@mui/material'
import * as React from 'react'
import fakeLastResources from 'src/assets/fakeLists/lastResources'
import GridOnIcon from '@mui/icons-material/GridOn';
import ViewListIcon from '@mui/icons-material/ViewList';
import EduSourceList from 'src/ui-component/edusource/edusourcelist';
import "./resources.css"
import Slider from '../NetflixSlider';
import { Box } from '@mui/system';
import i18next from 'i18next';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteResource } from 'src/api/edusourceApi';


export const ResourcesNetflixGrid = (props) =>{
    var {edusourceList, title, newcolor, mt, defaultMode} = props;
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [eduToDelete, setEduToDelete] = React.useState();
    const {newWidth} = props;
    const navigate = useNavigate();
    if (!edusourceList){
        
        edusourceList = fakeLastResources;
    }
    if (!title){
        title = "Last Resources"
    }
    if (!mt){
        mt=0;
    }

    const getInitialMode = () => {
        
        var result= "Grid"
        if (newWidth <500){
            result = "List"
        }
        if (defaultMode && defaultMode==="List"){
            result = "List"
        }
        return result
    }

  
    const [mode, setMode] = React.useState(getInitialMode());
   
    const HandelGridClick = (event)=>{
        setMode("Grid")
        //console.log("Grid")
    }

    const HandleListClick = (event)=>{
        setMode("List")
    }

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


    return (
        <>
        <Grid container sx={{backgroundColor:newcolor, mt:mt}}>
        <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"  
            >
            <Grid item><Typography variant='h3' sx={{ml:2}}>{i18next.t(title)}</Typography></Grid>
            {defaultMode && defaultMode==="List"?<></>:<>
            <Grid item>
                <ButtonGroup>
                    <IconButton color={mode==="Grid"?"primary":""} onClick={HandelGridClick}>
                        <GridOnIcon />
                    </IconButton>
                    <IconButton color={mode==="List"?"primary":""} onClick={HandleListClick}>
                        <ViewListIcon />
                    </IconButton>
                </ButtonGroup>
            </Grid>
            </>}
        </Grid>
        
            {mode!=="List"?
                <>
                
                <Box width="100%">
                <Slider>
                {edusourceList.map((edusource, index) => (

                    <Slider.Item edusource={edusource} key={index}>item1</Slider.Item>
                ))}
                </Slider>
                </Box>
                </>:<>
                <Grid container direction="column" sx={{mt:2, ml:2}} justifyContent="flex-start" alignItems="flex-start">
                    {edusourceList.map((edusource, index)=>{
                        return (
                            <React.Fragment key={index}>
                            <Grid item sx={{mb:2}} >
                                <EduSourceList edusource= {edusource} newWidth={newWidth} />
                                {defaultMode && defaultMode==="List"?<>
                                    <ButtonGroup >
                                        <Button onClick={(e)=>{ editClickHandle(e, edusource)}} size="small" sx={{borderRadius :"15px", mt:1}}>{i18next.t("edit")}</Button>
                                        <Button onClick={(e)=>{ deleteCliclHandle(e, edusource)}} size="small" sx={{borderRadius :"15px", mt:1}}>{i18next.t("delete")}</Button>
                                    </ButtonGroup>
                                </>:<></>}
                            </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
                </>}
        </Grid>


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
            <Button onClick={deleteDialogClose}  autoFocus>{i18next.t("Disagree")}</Button>
            <Button onClick={dangerouslyProceedToDelete}> {i18next.t("Agree")} </Button>
            </DialogActions>
        </Dialog>

        </>
    )
}