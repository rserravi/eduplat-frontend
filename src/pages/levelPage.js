import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOfLevel } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { getIscedFromCode } from "src/utils/isced";
import { useLocation } from 'react-router'
import { SearchBarComponent } from "src/components/search-bar-component";

const theme = createTheme(themeOptions);

export const LevelPage = ()=>{
    const [newWidth] = useOutletContext();
    const location = useLocation()
    var {level} =  useParams();
    console.log(level);
    const [theLevel, setTheLevel]= React.useState();
    const [levelTotal, setLevelTotal]= React.useState();

    useEffect (()=>{
        
            try {
                getResourcesOfLevel(level, 1).then((response)=>{
    
                    setTheLevel(response.data.data)
                    setLevelTotal(response.data.total);
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        

    },[location.key, level])

    const onPageChange = (page)=>{
        try {
            getResourcesOfLevel(level,page).then((response)=>{

                setTheLevel(response.data.data)
                setLevelTotal(response.data.total)
               
           }).catch(error=>{
               
            console.log(error);
           })
           
       } catch (error) {
        console.log(error);
       }
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box sx={{ width: newWidth, p:2 }}> 
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Level")} {i18next.t(level)}</Typography>
                <SearchBarComponent tab={"level"} />
                <ResourcesNetflixGrid edusourceList={theLevel} title={i18next.t(getIscedFromCode(level))} newcolor="contrast"  newWidth={newWidth} total={levelTotal} setPage={onPageChange}/>
            </Box>

            </ThemeProvider>
        </React.Fragment>
    )
}