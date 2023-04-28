import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { useLocation } from 'react-router'
import { getResourcesOfType } from "src/api/edusourceApi";
import { SearchBarComponent } from "src/components/search-bar-component";

const theme = createTheme(themeOptions);

export const TypePage = ()=>{
    const [newWidth] = useOutletContext();
    const location = useLocation()
    var {type} =  useParams();
    console.log(type);
    const [theType, setTheType]= React.useState();
    



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
                <SearchBarComponent tab={"type"} />
                <ResourcesNetflixGrid edusourceList={theType} title={i18next.t(type)} newcolor="contrast"  newWidth={newWidth}/>
            </Box>
            
            </ThemeProvider>
        </React.Fragment>
    )
}