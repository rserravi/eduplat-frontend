import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOflanguage } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { replaceUnderscoresWithSpaces } from "src/utils/stringOperations";
import { useLocation } from 'react-router'
import { findLangFromCode, } from "src/utils/countries";
import { SearchBarComponent } from "src/components/search-bar-component";

const theme = createTheme(themeOptions);

export const LanguagePage = ()=>{
    const [newWidth] = useOutletContext();
    const location = useLocation()
    var {lang} =  useParams();
    lang = replaceUnderscoresWithSpaces(lang);
    console.log(lang);
    const [language, setlanguage]= React.useState();
    const [langTotal, setLanglTotal]= React.useState();


    useEffect (()=>{
        //if (!language ||language===undefined ||language ===null){
            try {
                getResourcesOflanguage(lang, 1).then((response)=>{
    
                    setlanguage(response.data.data);
                    setLanglTotal(response.data.total)
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        //}

    },[location.key, lang])

    const onPageChange = (page)=>{
        try {
            getResourcesOflanguage(lang, page).then((response)=>{

                setlanguage(response.data.data);
                setLanglTotal(response.data.total)
               
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
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Language")}: {i18next.t(findLangFromCode(lang))}</Typography>
                <SearchBarComponent tab={lang} />
                <ResourcesNetflixGrid edusourceList={language} title={i18next.t(lang)} newcolor="contrast" newWidth={newWidth} total={langTotal} setPage={onPageChange}/>
            </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}