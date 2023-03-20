import { Box,  CssBaseline, Grid, InputAdornment, Skeleton, TextField, Typography } from '@mui/material';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

import fakeLastResources from 'src/assets/fakeLists/lastResources'
import { ResourcesNetflixGrid } from 'src/components/resources/resources';
import SearchIcon from '@mui/icons-material/Search';

import { FilterMenu } from 'src/menu-items/filterMenu';
import { searchInUser } from 'src/api/userApi';
import { UserCard } from 'src/components/user/userCard';



const theme = createTheme(themeOptions);
var newMaxWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export const OpenSearch = () =>{

    const {terms} = useParams();
    const [searchValue, setSearchValue] = useState(terms);
    const [serp, setSerp] = useState(); //CHANGE fakeLastResources
    const [newWidth, setNewWidth] = useState(newMaxWidth);
    const [languageFilter, setLanguageFilter] = useState('ES')
    const [typeOfFilter, setTypeOfFilter] = useState("Resources");
    const [categoriesFilter, setCategoriesFilter]= useState("")
    const [levelFilter, setLevelFilter]= useState("")
    const [themesFilter, setThemesFilter]= useState("")
    const [searching, setSearching] = useState(false);

 
    const updateFilters = (lang, type, cat, level, themes) =>{
        setLanguageFilter(lang);
        setTypeOfFilter(type);
        setCategoriesFilter(cat);
        setLevelFilter(level);
        setThemesFilter(themes);
        setSerp(null);
        console.log(lang, type, cat, level, themes);
    }

    const OnSearchChange = (event) =>{
        //console.log(event.target.value);
         setSearchValue(event.target.value);
       }
   
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        // 👇 Get input value
        OnSearchClick(event);
        }
    };

    const OnSearchClick = (event) =>{
        event.preventDefault();
        if (searchValue!==""){
          console.log (searchValue, typeOfFilter);
        }

        // PERFORM SEARCH
        switch (typeOfFilter) {
            case "Users":
                searchUsers();
                break;
            
            case "Collections":
                searchCollections()
                break;
        
            default:
                // RESOURCES
                searchResources();
                break;
        }

      }
    
    const searchResources = () =>{
        //BUSCAR RECURSOS
        setSerp(fakeLastResources)
    }

    const searchCollections = () =>{
        //BUSCAR COLECCIONES
    }

    const searchUsers = async () =>{
        // BUSCAR USUARIOS
        setSearching(true);
        await searchInUser(searchValue, languageFilter).then((result)=>{
            console.log(result);
            setSerp(result.result)
        }).catch((error)=>{
            console.log(error);
        })

        // GUARDAR LA BUSQUEDA RECIENTE
        setSearching(false);

    }

    React.useEffect(() => {

        function handleResize() {
            setNewWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        }


    window.addEventListener('resize', handleResize)

    },[])

    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                
                    <Grid item xs={12} sm={4} md={4}>
                        <Grid 
                            container
                            direction="column"
                            justifyContent="center"
                            sx={{pl:2, pt:2}}               
                            >
                            <Grid item>
                                <Typography variant='h2' component='h1' >
                                    Search Resources
                                </Typography>
                            </Grid>
                            <Grid item xs={12} mt={1}>
                                <FilterMenu updateFilters={updateFilters} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={{mt:1}} >
                                <TextField
                                    focused
                                    margin="none"
                                    id="search"
                                    defaultValue={terms}
                                    type="search"
                                    style = {{minWidth: 300, width:newWidth>500?300: newWidth - 32}} 
                                    variant="outlined"
                                    color='secondary'
                                    onChange={OnSearchChange}
                                    onKeyDown={handleKeyDown}
                                    // onBlur={OnSearchClick}
                                    placeholder={typeOfFilter==="Users"?"Who are you looking for?":"What do you want to learn today?"}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <SearchIcon color='secondary' />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                            </Grid>
                        </Grid>   
                    </Grid>
                  
                {serp && serp!==null?<>
                <Box sx={{width:newWidth}}>
                    {typeOfFilter==="Resources"?
                    <ResourcesNetflixGrid edusourceList={serp} title="Search results" mt={2}/>
                    :<></>}
                    {typeOfFilter==="Users"?
                    <>
                        {serp.map((user, index)=>{
                            return(
                            <React.Fragment key={index}>
                                <UserCard user={user} />
                            </React.Fragment>
                            )
                        })}
                    </>:<></>}
                </Box>
                </>:<>
                <Skeleton variant="rectangular" width={newWidth - 32} height={640} sx={{m:2}} />
                </>}
                
                
            </ThemeProvider>
        </React.Fragment>
    )
}