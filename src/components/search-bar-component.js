import { CssBaseline, Grid, Divider, TextField, MenuItem, InputAdornment, IconButton } from '@mui/material';
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { languagesCodes } from 'src/utils/countries';
import { categoriesList, iscedList } from 'src/utils/isced';
import { resourceTypes } from 'src/utils/resourceTypes';
import SearchIcon from '@mui/icons-material/Search';


const theme = createTheme(themeOptions);

export const SearchBarComponent = (tab) =>{
    const [newWidth] = useOutletContext();
    const navigate = useNavigate();
    const [searchEdusource, setSearchEdusource] = React.useState("");
    const [searchUser, setSearchUser] = React.useState("");

    const handleSelectLevel = (event, code)=>{
        event.preventDefault();
        navigate("/level/"+code);
    }

    const handleSelectLanguage = (event, code)=>{
        event.preventDefault();
        navigate("/language/"+code);
    }

    const handleSelectCategory = (event)=>{
        event.preventDefault();
       navigate("/discipline/"+event.target.value);
    }

    const handleSelectType = (event)=>{
        event.preventDefault();
       navigate("/type/"+event.target.value);
    }

    const edusourceChange = (event)=>{
        event.preventDefault();
        setSearchEdusource(event.target.value);
    }

    const userChange = (event)=>{
        event.preventDefault();
        setSearchUser(event.target.value);
    }

    const handleUserClick= ()=>{
        navigate("/search/users/"+searchUser)
    }

    const handleEdusourceClick= ()=>{
        navigate("/search/resources/"+searchEdusource)
    }


    
    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    minWidth={newWidth - 32}
                    p={1}
                >
                     <Grid item  mb={2}>
                        <TextField
                            label ={i18next.t("Languages")}
                            select
                            defaultValue=" "
                            sx={{ 
                                mt:1,
                                '& fieldset': {
                                borderRadius: '20px',
                            },}}
                        >
                            {languagesCodes.map((option)=>{
                                return(
                                <MenuItem onClick={(e)=>{handleSelectLanguage(e, option.code)}}  key={option.code} value={option.code+""}>{i18next.t(option.label)}</MenuItem>
                                )
                                
                            })}
                                <Divider />
                            <MenuItem key={1000} value={" "}>{i18next.t("Search by language")}</MenuItem>
                        
                        </TextField>
                       
                    </Grid>
                    <Grid item  mb={1}>
                        <TextField
                            label ={i18next.t("Levels")}
                            select
                            defaultValue=" "
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
                             <Divider />
                            <MenuItem key={1000} value={" "}>{i18next.t("Search by level")}</MenuItem>
                        
                        </TextField>
                       
                    </Grid>
                    <Grid item mb={1} >
                        <TextField
                            label ={i18next.t("Categories")}
                            select
                            defaultValue=" "
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
                                <Divider />
                                <MenuItem key={1000} value={" "}>{i18next.t("Search by Category")}</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item mb={1} >
                        <TextField
                            label ={i18next.t("Type")}
                            select
                            defaultValue=" "
                            onChange={handleSelectType}
                            sx={{ mt:1,
                                '& fieldset': {
                                borderRadius: '20px',
                            },}}
                        >
                                {resourceTypes.map((cat)=>{
                                    return(
                                        <MenuItem key={cat.value} value={cat.label+""}>
                                            {i18next.t(cat.label)}
                                        </MenuItem>
                                        )
                                })}
                                <Divider />
                                <MenuItem key={1000} value={" "}>{i18next.t("Search by Type")}</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item mb={1}>
                        <TextField
                            label={i18next.t("Search resources")}
                            variant="outlined"
                            onChange={edusourceChange}
                            sx={{ 
                                mt:1,
                                '& fieldset': {
                                borderRadius: '20px',
                            },}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IconButton onClick={handleEdusourceClick}> <SearchIcon /></IconButton></InputAdornment>,
                              }}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    // Do code here
                                    ev.preventDefault();
                                    handleEdusourceClick();
                                }
                            }}
                        >

                        </TextField>
                    </Grid>

                    <Grid item mb={1}>
                        <TextField
                            label={i18next.t("Search users")}
                            variant="outlined"
                            onChange={userChange}
                            sx={{ 
                                mt:1,
                                '& fieldset': {
                                borderRadius: '20px',
                            },}}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><IconButton onClick={handleUserClick}> <SearchIcon /></IconButton></InputAdornment>,
                              }}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    // Do code here
                                    ev.preventDefault();
                                    handleUserClick();
                                }
                            }}
                        >

                        </TextField>
                    </Grid>
                    
               </Grid>
               <Divider />
              
            </ThemeProvider>
        </React.Fragment>
    )
   
}