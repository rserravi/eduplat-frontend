import { Box, Grid, MenuItem, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router'
import { resourceTypes } from "src/utils/resourceTypes";
import { getResourcesOfType } from "src/api/edusourceApi";

const theme = createTheme(themeOptions);

export const TypePage = ()=>{
    const [newWidth] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation()
    var {type} =  useParams();
    console.log(type);
    const [theType, setTheType]= React.useState();
    

    const handleSelectType = (event, code)=>{
        event.preventDefault();
        navigate("/type/"+code);
    }

    useEffect (()=>{
        
            try {
                getResourcesOfType(type).then((response)=>{
                    setTheType(response.result.reverse())
               }).catch(error=>{
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        

    },[location.key, type])

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box sx={{ width: newWidth, p:2 }}> 
                <Typography variant="h5" sx={{my:2}}>{i18next.t("type")} {i18next.t(type)}</Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    
                    >
                <Grid item  mb={2}>
                    <TextField
                        label ={i18next.t("type")}
                        select
                        defaultValue={type}
                        sx={{ 
                            mt:1,
                            '& fieldset': {
                            borderRadius: '20px',
                        },}}
                    >
                        
                        {resourceTypes.map((option)=>{
                            return(
                            <MenuItem onClick={(e)=>{handleSelectType(e, option.label)}}  key={option.value} value={option.label+""}>{i18next.t(option.label)}</MenuItem>
                            )
                        })} 
                    
                    </TextField>
                </Grid>
               
                </Grid>
                <ResourcesNetflixGrid edusourceList={theType} title={i18next.t(type)} newcolor="contrast"  newWidth={newWidth}/>
            </Box>
            
            </ThemeProvider>
        </React.Fragment>
    )
}