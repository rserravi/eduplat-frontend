import { Box, Grid, MenuItem, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import i18next from "i18next";
import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getResourcesOfCategory } from "src/api/edusourceApi";
import { ResourcesNetflixGrid } from "src/components/resources/resources";
import { themeOptions } from 'src/theme/theme';
import { categoriesList } from "src/utils/isced";
import { replaceUnderscoresWithSpaces } from "src/utils/stringOperations";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router'

const theme = createTheme(themeOptions);

export const Discipline = ()=>{
    const [newWidth] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation()
    var {cat} =  useParams();
    cat = replaceUnderscoresWithSpaces(cat);
    console.log(cat);
    const [category, setCategory]= React.useState();

    const handleSelectCategory = (event)=>{
        event.preventDefault();
       navigate("/discipline/"+event.target.value);
      
    }

    useEffect (()=>{
        //if (!category ||category===undefined ||category ===null){
            try {
                getResourcesOfCategory(cat).then((response)=>{
    
                    setCategory(response.result.reverse())
                   
               }).catch(error=>{
                   
                console.log(error);
               })
               
           } catch (error) {
            console.log(error);
           }
        //}

    },[location.key, cat])

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Box sx={{ width: newWidth, p:2 }}> 
                <Typography variant="h5" sx={{my:2}}>{i18next.t("Category")}: {i18next.t(cat)}</Typography>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label ={i18next.t("Categories")}
                        select
                        rows={newWidth>500?4:7}
                        helperText={i18next.t("Please select a category")}
                        defaultValue={cat}
                        onChange={handleSelectCategory}
                        sx={{ mt:1,
                            '& fieldset': {
                            borderRadius: '20px',
                        },}}
                    >
                                {categoriesList.map((cat)=>{
                                    return(
                                        <MenuItem key={cat.key} value={cat.label+""}>
                                            {i18next.t(cat.label)}
                                        </MenuItem>
                                        )
                                })}
                    </TextField>
                </Grid>
                <ResourcesNetflixGrid edusourceList={category} title={i18next.t(cat)} newcolor="contrast" newWidth={newWidth}/>
            </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}