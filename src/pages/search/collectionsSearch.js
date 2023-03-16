import { Accordion, AccordionDetails, AccordionSummary, Box,  Button,  Checkbox,  CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, Link, List, ListItem, Paper, Skeleton, TextField, Toolbar, Typography } from '@mui/material';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useNavigate } from 'react-router-dom';

import fakeLastResources from 'src/assets/fakeLists/lastResources'
import { ResourcesNetflixGrid } from 'src/components/resources/resources';
import { getTagsFromCategory, iscedList } from 'src/utils/isced';
import { categoriesList } from 'src/utils/isced';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { arrayFromString, findInString } from 'src/utils/stringOperations';
import fakeTagCloud from 'src/assets/fakeLists/fakeCloudTag';
import SearchIcon from '@mui/icons-material/Search';




const theme = createTheme(themeOptions);
var newMaxWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export const CollectionsSearch = () =>{

    const {terms} = useParams();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [serp, setSerp] = useState(fakeLastResources); //CHANGE fakeLastResources
    const [newWidth, setNewWidth] = useState(newMaxWidth);
    const [categoriesDialog, setCategoriesDialog]= useState(false)
    const [categoriesFilter, setCategoriesFilter]= useState("")
    const [levelFilter, setLevelFilter]= useState("")
    const [tagFilter, setTagFilter]= useState("")

    var drawerWidth =240;
    if (newWidth <500){
        drawerWidth = newWidth;
    }
    const [showingFilters, setShowingFilters] = useState(false);
    const categoriesDescriptionElementRef = React.useRef(null);


    React.useEffect(() => {
        if (categoriesDialog) {
          const { current: descriptionElement } = categoriesDescriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [categoriesDialog]);


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
          console.log (searchValue);
        }
      }
    const handleFilterClick = (event)=>{
        setShowingFilters(!showingFilters);
        if (showingFilters){
            console.log("ACTUALIZAR FILTROS")
        }
    }

    const handleCloseClick = (event)=>{
        setShowingFilters(false);
        console.log(categoriesFilter, levelFilter);
    }

    const handleCategoriesDialogClick = (event)=>{
        setCategoriesDialog(!categoriesDialog);
    }

    const handleCategorySelect=(event, label)=>{
        if (event.target.checked){
             setCategoriesFilter(categoriesFilter + label+",")
        }
       
        else {
           setCategoriesFilter(categoriesFilter.replace(label+",",''))
        }
    }

    const handleLevelSelect=(event, label)=>{
        if (event.target.checked){
             setLevelFilter(levelFilter + label+",")
        }
       
        else {
            setLevelFilter(levelFilter.replace(label+",",''))
        }
    }

    const handleTagSelect=(event, label)=>{
        if (event.target.checked){
             setTagFilter(tagFilter + label+",")
        }
       
        else {
            setTagFilter(tagFilter.replace(label+",",''))
        }
    }
    
    const proposedTagsFinder = ()=>{
        if (categoriesFilter!==""){
        const categoFilter = arrayFromString(categoriesFilter,",");
        var themesString=""
        for (let i = 0; i < categoFilter.length; i++) {
            themesString = themesString + getTagsFromCategory(categoFilter[i])  
        }
        
        }else{
            for (let i = 0; i < fakeTagCloud.length; i++) {
                themesString = themesString + fakeTagCloud[i].value + ",";
            }
        }
        const themesArray = arrayFromString(themesString,",");
        return themesArray;
        
    }

    React.useEffect(() => {

        function handleResize() {
            setNewWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        }


    window.addEventListener('resize', handleResize)

    })

    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container direction="row">

                    <Grid item xs={12} sm={4} md={4}>
                        <Grid 
                            container
                            direction="column"
                            justifyContent="center"
                            sx={{pl:2, pt:2}}
                        
                            
                            >
                            <Grid item >
                                <Grid container direction="row">
                                    <Grid item>
                                        <Typography variant='h2' component='h1' >
                                            Collection Search
                                        </Typography>
                                    </Grid>
                                    <Grid item ml={2}>
                                        <Button variant='contained' sx={{ borderRadius:"20px"}} color={showingFilters?'primary':'secondary'} startIcon={<TuneRoundedIcon />} onClick={handleFilterClick}>
                                            Filters
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={{mt:2}} >
                                <TextField
                                    focused
                                    margin="dense"
                                    id="search"
                                    defaultValue={terms}
                                    type="search"
                                    style = {{minWidth: 300, width:newWidth>500?300: newWidth - 32}} 
                                    variant="outlined"
                                    color='secondary'
                                    onChange={OnSearchChange}
                                    onKeyDown={handleKeyDown}
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
                  
                </Grid>
                
                {showingFilters?
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    <Toolbar />
                    <Divider />
                    <IconButton onClick={handleCloseClick}>
                        <CloseIcon />
                    </IconButton>
                    <Divider />
                    
                        <Typography variant='h3' sx={{p:2}}>
                            Filters
                        </Typography>
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant='h4'>Categories</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button onClick={handleCategoriesDialogClick} variant='text'>*Categories Explanation</Button>
                            <FormGroup>
                            {categoriesList.map((cat)=>{
                                return(
                                    <React.Fragment key={cat.key}>
                                        <FormControlLabel control={<Checkbox checked={findInString(categoriesFilter,cat.label)} onChange={(e)=>handleCategorySelect(e, cat.label)}/>} label= {cat.label} />
                                    </React.Fragment>
                                )
                            })}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography variant='h4'>Levels</Typography>
                        
                        </AccordionSummary>
                        <AccordionDetails>
                        <Link variant='body1' sx={{mb:2}} href="https://uis.unesco.org/en/topic/international-standard-classification-education-isced" target="_blank" rel="noopener">*ISCED Levels Information</Link>
                            <FormGroup sx={{mt:2}}>
                            {iscedList.map((cat)=>{
                                return(
                                    <React.Fragment key={cat.key}>
                                        <FormControlLabel control={<Checkbox checked={findInString(levelFilter,cat.label)} onChange={(e)=>handleLevelSelect(e, cat.label)}/>} label= {cat.desc} />
                                    </React.Fragment>
                                )
                            })}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        >
                        <Typography variant='h4'>Themes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup sx={{mt:2}}>
                            {proposedTagsFinder().map((cat, index)=>{
                                return(
                                    <React.Fragment key={index}>
                                        <FormControlLabel control={<Checkbox checked={findInString(tagFilter,cat)} onChange={(e)=>handleTagSelect(e, cat)}/>} label= {cat} />
                                    </React.Fragment>
                                )
                            })}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </Drawer>
                :<></>}


                {serp && serp!==null?<>
                <Box sx={{width:newWidth}}>
                    <ResourcesNetflixGrid edusourceList={serp} title="Search results" mt={4}/>
                </Box>
                </>:<>
                <Skeleton variant="rectangular" width={newWidth - 32} height={640} sx={{m:2}} />
                </>}
                
                {/* DIALOG FOR CATERGORIES EXPLANATION */}
                <Dialog
                    open={categoriesDialog}
                    onClose={handleCategoriesDialogClick}
                    scroll='paper'
                    aria-labelledby="categories-dialog-title"
                    aria-describedby="categories-dialog-description"
                >
                    <DialogTitle id="categories-dialog-title">ISCED Levels</DialogTitle>
                    <DialogContent dividers={true}>
                    <DialogContentText
                        id="categories-dialog-description"
                        ref={categoriesDescriptionElementRef}
                        tabIndex={-1}
                    >
                        The duration of each level of education can vary greatly across countries. These differences can lead to problems when attempting to compare statistics across countries. The International Standard Classification of Education (ISCED) is the official framework used to facilitate international comparisons of education systems. It was developed in 1976 by the United Nations Educational, Scientific and Cultural Organization (UNESCO) and was revised in 1997 and 2011
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCategoriesDialogClick}>Close</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </React.Fragment>
    )
}