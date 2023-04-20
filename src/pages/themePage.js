import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOfTheme } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { replaceUnderscoresWithSpaces } from "src/utils/stringOperations";


const theme = createTheme(themeOptions);

export const JustTheme = (props)=>{
    const [newWidth] = useOutletContext();
    return(
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box sx={{ width: newWidth, p:2 }}> 
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Subcathegories and Labels")}</Typography>
                
            </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}

export const ThemePage = ()=>{
    const [newWidth] = useOutletContext();
    var {thm} =  useParams();
    thm = replaceUnderscoresWithSpaces(thm);
    console.log(thm);
    const [theTheme, setTheTheme]= React.useState();

    useEffect (()=>{
        if (!theTheme ||theTheme===undefined ||theTheme ===null){
            try {
                getResourcesOfTheme(thm).then((response)=>{
    
                    setTheTheme(response.result.reverse())
                   
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
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Subcathegories and Labels")}: {i18next.t(thm)}</Typography>
                <ResourcesNetflixGrid edusourceList={theTheme} title={i18next.t(thm)} newcolor="secondary.light" newWidth={newWidth}/>
            </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}