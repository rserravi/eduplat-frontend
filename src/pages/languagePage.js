import { Box, Grid, MenuItem, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOflanguage } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { replaceUnderscoresWithSpaces } from "src/utils/stringOperations";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router'
import { findLangFromCode, languagesCodes } from "src/utils/countries";

const theme = createTheme(themeOptions);

export const LanguagePage = ()=>{
    const [newWidth] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation()
    var {lang} =  useParams();
    lang = replaceUnderscoresWithSpaces(lang);
    console.log(lang);
    const [language, setlanguage]= React.useState();

    const handleSelectlanguage = (event)=>{
        event.preventDefault();
       navigate("/language/"+event.target.value);
      
    }

    useEffect (()=>{
        //if (!language ||language===undefined ||language ===null){
            try {
                getResourcesOflanguage(lang).then((response)=>{
    
                    setlanguage(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        //}

    },[location.key, lang])

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box sx={{ width: newWidth, p:2 }}> 
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Language")}: {i18next.t(findLangFromCode(lang))}</Typography>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label ={i18next.t("Languages")}
                        select
                        rows={newWidth>500?4:7}
                        helperText={i18next.t("Please select a language")}
                        defaultValue={lang}
                        onChange={handleSelectlanguage}
                        sx={{ mt:1,
                            '& fieldset': {
                            borderRadius: '20px',
                        },}}
                    >
                            {languagesCodes.map((option)=>{
                            return(
                            <MenuItem onClick={(e)=>{handleSelectlanguage(e, option.code)}}  key={option.code} value={option.code+""}>{i18next.t(option.label)}</MenuItem>
                            )
                            
                        })}
                    </TextField>
                </Grid>
                <ResourcesNetflixGrid edusourceList={language} title={i18next.t(lang)} newcolor="contrast" newWidth={newWidth}/>
            </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}