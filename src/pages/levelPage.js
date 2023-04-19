import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOfLevel } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { getIscedFromCode } from "src/utils/isced";

const theme = createTheme(themeOptions);

export const LevelPage = ()=>{
    const [newWidth] = useOutletContext();
    var {level} =  useParams();
    console.log(level);
    const [theLevel, setTheLevel]= React.useState();

    useEffect (()=>{
        if (!theLevel ||theLevel===undefined ||theLevel ===null){
            try {
                getResourcesOfLevel(level).then((response)=>{
    
                    setTheLevel(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        }

    })

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box sx={{ width: newWidth, p:2 }}> 
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Level")}: {i18next.t(level)}</Typography>
                <ResourcesNetflixGrid edusourceList={theLevel} title={i18next.t(getIscedFromCode(level))} newcolor="secondary.light" newWidth={newWidth}/>
            </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}