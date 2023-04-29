import * as React from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, MenuList } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { findLangFromCode, languagesCodes } from 'src/utils/countries';
import { categoriesList } from 'src/utils/isced';
import { arrayFromString, findInString } from 'src/utils/stringOperations';
import { getTagsFromCategory, iscedList } from 'src/utils/isced';
import fakeTagCloud from 'src/assets/fakeLists/fakeCloudTag';
import i18next from 'i18next';



// ==============================|| FILTER MENU BROWSER ||============================== //



const theme = createTheme(themeOptions);

export const FilterMenu =(props) =>{
  const {updateFilters, type} = props;


  //LANGUAGE FILTER
  const [languageFilter, setLanguageFilter] = React.useState('any');
  const [anchorElNavLanguage, setAnchorElNavLanguage] = React.useState(null);
  const openLanguageNav = Boolean(anchorElNavLanguage);

  const handleOpenNavResourcesMenu = (event) => {
    setAnchorElNavLanguage(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElNavLanguage(null);
    updateFilters(languageFilter, typeOfFilter, categoriesFilter, levelFilter, themesFilter)
  };

  const handleSelectLang = (event, code)=>{
    event.preventDefault();
    setLanguageFilter(code);
    
  }

  //TYPEOF FILTER
  const [typeOfFilter, setTypeOfFilter] = React.useState(type);
  const [anchorElNavTypeOf, setAnchorElNavTypeOf] = React.useState(null);
  const openTypeOfNav = Boolean(anchorElNavTypeOf);

  const handleOpenNavTypeOfMenu = (event) => {
    setAnchorElNavTypeOf(event.currentTarget);
  };

  const handleCloseTypeOfMenu = () => {
    setAnchorElNavTypeOf(null);
    updateFilters(languageFilter, typeOfFilter, categoriesFilter, levelFilter, themesFilter)
  };

  const handleSelectTypeOf = async (event, code)=>{
    event.preventDefault();
    setTypeOfFilter(code);
    
  }

  //CATEGORIES FILTER
  const [categoriesFilter, setCategoriesFilter] = React.useState("");
  const [anchorElNavCategories, setAnchorElNavCategories] = React.useState(null);
  const openCategoriesNav = Boolean(anchorElNavCategories);
  const [categoriesDialog, setCategoriesDialog]= React.useState(false)
  const categoriesDescriptionElementRef = React.useRef(null);

  const handleOpenNavCategoriesMenu = (event) => {
    setAnchorElNavCategories(event.currentTarget);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElNavCategories(null);
    updateFilters(languageFilter, typeOfFilter, categoriesFilter, levelFilter, themesFilter)
  };

  const handleSelectCategory = (event, label)=>{
    
    if (event.target.checked){
        setCategoriesFilter(categoriesFilter + label+",")
    }
    
    else {
        setCategoriesFilter(categoriesFilter.replace(label+",",''))
    }
  }

  const handleCategoriesDialogClick = (event)=>{
    setCategoriesDialog(!categoriesDialog);
  }
  

    //LEVEL FILTER
    const [levelFilter, setLevelFilter] = React.useState('');
    const [anchorElNavLevel, setAnchorElNavLevel] = React.useState(null);
    const openLevelNav = Boolean(anchorElNavLevel);

    const handleOpenNavLevelMenu = (event) => {
    setAnchorElNavLevel(event.currentTarget);
    };

    const handleCloseLevelMenu = () => {
    setAnchorElNavLevel(null);
    updateFilters(languageFilter, typeOfFilter, categoriesFilter, levelFilter, themesFilter)
    };

    const handleSelectLevel = (event, label)=>{
        if (event.target.checked){
            setLevelFilter(levelFilter + label+",")
        }
        
        else {
            setLevelFilter(levelFilter.replace(label+",",''))
        }
      }
    
    //THEMES FILTER
  const [themesFilter, setThemesFilter] = React.useState("");
  const [anchorElNavThemes, setAnchorElNavThemes] = React.useState(null);
  const openThemesNav = Boolean(anchorElNavThemes);

  const handleOpenNavThemesMenu = (event) => {
    setAnchorElNavThemes(event.currentTarget);
  };

  const handleCloseThemesMenu = () => {
    setAnchorElNavThemes(null);
    updateFilters(languageFilter, typeOfFilter, categoriesFilter, levelFilter, themesFilter)
  };

  const handleSelectThemes = (event, label)=>{
    
    if (event.target.checked){
        setThemesFilter(themesFilter + label+",")
    }
    
    else {
        setThemesFilter(themesFilter.replace(label+",",''))
    }
  }

  const proposedTagsFinder = ()=>{
    var themesString="";
    if (categoriesFilter!==""){
        const categoFilter = arrayFromString(categoriesFilter,",");
        //console.log("CATEGO FILTER",categoFilter)
        themesString="";
        for (let i = 0; i < categoFilter.length; i++) {
            themesString = themesString + getTagsFromCategory(categoFilter[i])  
        }
        }
    else{
        themesString="";
        for (let i = 0; i < fakeTagCloud.length; i++) {
            
            if (fakeTagCloud[i].value){
                themesString = themesString + fakeTagCloud[i].value + ",";
                
            }
        }
        themesString= themesString.slice(0, -1);
    }
    const themesArray = arrayFromString(themesString,",");
    return themesArray;
}

// GENERAL CONST

const resetFilters = (event) =>{
    event.preventDefault();
    setLanguageFilter('any');
    setTypeOfFilter('resources');
    setCategoriesFilter('');
    setLevelFilter('');
    setThemesFilter('');
}




 React.useEffect(() => {
    if (categoriesDialog) {
      const { current: descriptionElement } = categoriesDescriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [categoriesDialog]);

 

  return (
    <ThemeProvider theme={theme}>
            
            <Button size='small' variant='contained' sx={{ borderRadius:"20px", width:150, mr:1, mb:1}} color='secondary' endIcon={<ArrowDropDownIcon />} onClick={handleOpenNavResourcesMenu}>
                {i18next.t(findLangFromCode(languageFilter))}
            </Button>

            <Button size='small' variant='contained' sx={{ borderRadius:"20px", width:150, mr:1, mb:1}} color='secondary' endIcon={<ArrowDropDownIcon />} onClick={handleOpenNavTypeOfMenu}>
                {i18next.t(typeOfFilter)}
            </Button>

            <Button disabled={typeOfFilter==="users"} size='small' variant='contained' sx={{ borderRadius:"20px", width:119, mr:1, mb:1}} color={categoriesFilter===""?'primary':'secondary'} endIcon={<ArrowDropDownIcon />} onClick={handleOpenNavCategoriesMenu}>
                {i18next.t("Categories")}
            </Button>

            <Button disabled={typeOfFilter==="users"} size='small' variant='contained' sx={{ borderRadius:"20px", width:119, mr:1, mb:1}} color={levelFilter===""?'primary':'secondary'} endIcon={<ArrowDropDownIcon />} onClick={handleOpenNavLevelMenu}>
                {i18next.t("Levels")}
            </Button>

            <Button disabled={typeOfFilter==="users"} size='small' variant='contained' sx={{ borderRadius:"20px", width:119, mr:1, mb:1}} color={themesFilter===""?'primary':'secondary'} endIcon={<ArrowDropDownIcon />} onClick={handleOpenNavThemesMenu}>
                {i18next.t("Themes")}
            </Button>
              
            <Button size='small' variant='text' onClick={resetFilters} sx={{mb:1}}>{i18next.t("Reset Filters")}</Button>
            <Divider />
           
            {/* LANGUAGE MENU */}

            <div >
              <Menu 
                anchorEl={anchorElNavLanguage}
                open={openLanguageNav} 
                onClose={handleCloseLanguageMenu}
                
                PaperProps={{  
                    style: {  
                      width: 130,  
                    },  
                }}
              >
                <MenuList dense>
                    {languagesCodes.map((option)=>{
                        return(
                        <MenuItem onClick={(e)=>{handleSelectLang(e, option.code)}}  key={option.code}>{i18next.t(option.label)}</MenuItem>
                        )
                    })} 
                    <Divider />
                    <MenuItem onClick={(e)=>{handleSelectLang(e, "any")}}  key="any">{i18next.t("Any")}</MenuItem>
                </MenuList>    
              </Menu>
            </div>

              {/* TYPE OF MENU */}

            <div >
              <Menu 
                anchorEl={anchorElNavTypeOf}
                open={openTypeOfNav} 
                onClose={handleCloseTypeOfMenu}
                
              >
                <MenuList dense>
                    <MenuItem key={"resources"} onClick={(e)=>{handleSelectTypeOf(e, "resources")}}>{i18next.t("Resources")}</MenuItem>
                    <MenuItem key={'collections'} onClick={(e)=>{handleSelectTypeOf(e, "collections")}}>{i18next.t("Collections")}</MenuItem> 
                    <MenuItem key={'users'} onClick={(e)=>{handleSelectTypeOf(e, "users")}}>{i18next.t("Users")}</MenuItem> 
                </MenuList>    
              </Menu>
            </div>

            {/* CATEGORIES MENU */}

            <div>
              <Menu 
                anchorEl={anchorElNavCategories}
                open={openCategoriesNav} 
                onClose={handleCloseCategoriesMenu}
                PaperProps={{
                    style: {
                      maxHeight: 380,
                     
                    },
                  }}
              >
                <MenuList dense>
                <Button onClick={handleCategoriesDialogClick} variant='text'>*{i18next.t("Categories Explanation")}</Button>
                    {categoriesList.map((cat)=>{
                        return(
                            <MenuItem key={cat.key}>
                                <FormControlLabel control={
                                    <Checkbox checked={findInString(categoriesFilter,cat.label)} onChange={(e)=>handleSelectCategory(e, cat.label)}
                                        sx={{height:20}}
                                        />} 
                                        label= {i18next.t(cat.label)} 
                                    />      
                            </MenuItem>
                            )
                    })}
                </MenuList>    
              </Menu>
            </div>

            {/* LEVEL MENU */}

            <div >
              <Menu 
                anchorEl={anchorElNavLevel}
                open={openLevelNav} 
                onClose={handleCloseLevelMenu}
                
                
              >
                <MenuList dense>
                    {iscedList.map((cat)=>{
                        return(
                        <MenuItem key={cat.key}>
                            <FormControlLabel control={
                                <Checkbox checked={findInString(levelFilter,cat.label)} onChange={(e)=>handleSelectLevel(e, cat.label)}
                                    sx={{height:20}}
                                    />} 
                                    label= {i18next.t(cat.desc)} 
                                />
                         </MenuItem>
                        )
                    })} 
                </MenuList>    
              </Menu>
            </div>

            {/* THEMES MENU */}

            <div>
              <Menu 
                anchorEl={anchorElNavThemes}
                open={openThemesNav} 
                onClose={handleCloseThemesMenu}
                PaperProps={{
                    style: {
                      maxHeight: 380,
                     
                    },
                  }}
              >
                <MenuList dense>
                    {proposedTagsFinder().map((cat, index)=>{
                        return(
                            <MenuItem key={index}>
                                <FormControlLabel control={
                                    <Checkbox checked={findInString(themesFilter,cat)} onChange={(e)=>handleSelectThemes(e, cat)}
                                        sx={{height:20}}
                                        />} 
                                        label= {i18next.t(cat)} 
                                    />      
                            </MenuItem>
                            )
                    })}
                </MenuList>    
              </Menu>
            </div>

            {/* DIALOG FOR CATERGORIES EXPLANATION */}
            <Dialog
                    open={categoriesDialog}
                    onClose={handleCategoriesDialogClick}
                    scroll='paper'
                    aria-labelledby="categories-dialog-title"
                    aria-describedby="categories-dialog-description"
                >
                    <DialogTitle id="categories-dialog-title">{i18next.t("ISCED Levels")}</DialogTitle>
                    <DialogContent dividers={true}>
                    <DialogContentText
                        id="categories-dialog-description"
                        ref={categoriesDescriptionElementRef}
                        tabIndex={-1}
                    >
                        {i18next.t("ISCED text")}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCategoriesDialogClick}>Close</Button>
                    </DialogActions>
                </Dialog>
         
    </ThemeProvider>
  )
}