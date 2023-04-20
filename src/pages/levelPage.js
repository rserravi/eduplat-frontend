import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOfLevel } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { getIscedFromCode, iscedList } from "src/utils/isced";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router'

const theme = createTheme(themeOptions);

export const LevelPage = ()=>{
    const [newWidth] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation()
    var {level} =  useParams();
    console.log(level);
    const [theLevel, setTheLevel]= React.useState();
    const [categoriesDialog, setCategoriesDialog]= React.useState(false)
    const categoriesDescriptionElementRef = React.useRef(null);

    

    const handleSelectLevel = (event, code)=>{
        event.preventDefault();
        navigate("/level/"+code);
    }

    const handleCategoriesDialogClick = (event)=>{
        event.preventDefault();
        setCategoriesDialog(!categoriesDialog);
        
    }

    useEffect (()=>{
        
            try {
                getResourcesOfLevel(level).then((response)=>{
    
                    setTheLevel(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        

    },[location.key])

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box sx={{ width: newWidth, p:2 }}> 
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Level")} {i18next.t(level)}</Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    
                    >
                <Grid item  mb={2}>
                    <TextField
                        label ={i18next.t("level")}
                        select
                        defaultValue={level}
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
                    
                    </TextField>
                </Grid>
                <Grid item>
                    <Button onClick={handleCategoriesDialogClick} variant='text'>*{i18next.t("ISCED Levels")}</Button> 
                </Grid>
                </Grid>
                <ResourcesNetflixGrid edusourceList={theLevel} title={i18next.t(getIscedFromCode(level))} newcolor="contrast"  newWidth={newWidth}/>
            </Box>

             {/* DIALOG FOR ISCED EXPLANATION */}
             <Dialog
                open={categoriesDialog}
                onClose={handleCategoriesDialogClick}
                scroll='paper'
                aria-labelledby="categories-dialog-title"
                aria-describedby="categories-dialog-description"
            >
                <DialogTitle id="categories-dialog-title">{i18next.t("ISCED Levels")}</DialogTitle>
                <DialogContent dividers={true}>
                <DialogContentText
                    id="categories-dialog-description"
                    ref={categoriesDescriptionElementRef}
                    tabIndex={-1}
                >
                    {i18next.t("ISCED text")}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCategoriesDialogClick}>{i18next.t("Close")}</Button>
                </DialogActions>
            </Dialog>
            
            </ThemeProvider>
        </React.Fragment>
    )
}