import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOfCategory } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { replaceUnderscoresWithSpaces } from "src/utils/stringOperations";
import { useLocation } from 'react-router'
import { SearchBarComponent } from "src/components/search-bar-component";

const theme = createTheme(themeOptions);

export const Discipline = ()=>{
    const [newWidth] = useOutletContext();
    const location = useLocation()
    var {cat} =  useParams();
    cat = replaceUnderscoresWithSpaces(cat);
    console.log(cat);
    const [category, setCategory]= React.useState();
    const [catTotal, setCatTotal]= React.useState();

    useEffect (()=>{
            try {
                getResourcesOfCategory(cat,1).then((response)=>{
    
                    setCategory(response.data.data)
                    setCatTotal(response.data.total)
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }

    },[location.key, cat])

    const onPageChange = (page)=>{
        try {
            getResourcesOfCategory(cat,page).then((response)=>{

                setCategory(response.data.data)
                setCatTotal(response.data.total)
               
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
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Category")}: {i18next.t(cat)}</Typography>
                <SearchBarComponent tab={category} />
                <ResourcesNetflixGrid edusourceList={category} title={i18next.t(cat)} newcolor="contrast" newWidth={newWidth} total={catTotal} setPage={onPageChange}/>
            </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}