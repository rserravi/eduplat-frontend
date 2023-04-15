import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { scrapping } from 'src/api/scrapApi';
import { categoriesList } from 'src/utils/isced';
import { getTagsFromCategory } from 'src/utils/isced';
import { languagesCodes } from 'src/utils/countries';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'



// mui
import { InputAdornment,  ImageList, ImageListItem, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import {Image} from 'mui-image';
import { createResource } from 'src/api/edusourceApi';
import { getResourceUrlFromTitle, setPictureInResource } from 'src/utils/resourceUtils';
import i18next from 'i18next';


const theme = createTheme(themeOptions);

export const CreateEdusource= ({ ...others }) =>{
    const [newWidth] = useOutletContext();
    const [urlData, setUrlData] = useState();
    const [url, setUrl] = useState();
    const [title, setTitle]= useState();
    const [description, setDescription]= useState();
    const [image, setImage] = useState();
    const [discipline, setDiscipline]= useState("");
    const [themes, setThemes]= useState();
    const [freeLabels, setFreeLabels]= useState();
    const [themesFilter, setThemesFilter] = React.useState([]);
    const [authors, setAuthors]= useState();
    const [error, setError] = useState();
    const [imageSelectorOpen, setImageSelectorOpen] = useState(false);
    const [categoriesDialog, setCategoriesDialog]= React.useState(false)
    const [linktype, setLinkType] = React.useState();
    const [language, setLanguage] = React.useState();
    const [errorMsg, setErrorMsg] = React.useState();
    
   
    const categoriesDescriptionElementRef = React.useRef(null);

    const navigate = useNavigate();
    const user = useSelector(state => state.user)

    const handleSubmit = async (values) => {
        //console.log("EN HANDLE SUBMIT", values)
        await scrapping(values.url).then((data)=>{
            if (data.status==="success"){
                console.log ("DATOS OBTENIDOS EN SCRAP", data.result)
                setUrlData(data.result);
                setUrl(values.url);
                setTitle(data.result.ogTitle?data.result.ogTitle:data.result.title);
                setDescription(data.result.description);
                setImage(setPictureInResource(data.result.ogImage, data.result.linktype));
                setLinkType(data.result.linktype);
                setLanguage(data.result.language);
                setFreeLabels(data.result.keywords);
            }
            else {
                setError(data.message)
            }
        }).catch((error)=>{
            setError(error);
        })
        //Check url
        //Get data
      
    };

    const SaveAndSee = async (event) =>{
        const frmData = {
            "title": title, 
            "resourceURL": getResourceUrlFromTitle(title),
            "promoterId": user._id,
            "autors":{
               "autorName":"Rubotic",
               "autorSocial":{
                  "media":"Instagram",
                  "user": "@rubotic"
               }
            },
            "discipline": discipline,
            "theme": themes + "," + freeLabels,
            "type": linktype,
            "link": url,
            "linktype": linktype,
            "description": description,
            "language": language,
            "picture":{
               "fileName":image,
               "file":"",
               "uploadTime": Date.now(),
               "type":"link"
            },
            "licence": "CC"
        }

        await createResource(frmData).then(result=>{
            if (result.status==='error'){
                setErrorMsg(result.message);
            } else {
               // console.log(result.result);
                navigate("/resources/"+frmData.resourceURL);
            }
        }
        ).catch(error =>{
            console.log(error);
            setErrorMsg(error.message);
        });

    }

    const SaveAndAnother = async (event) =>{
        const frmData = {
            "title": title, 
            "resourceURL": getResourceUrlFromTitle(title),
            "promoterId": user._id,
            "autors":{
               "autorName":"Rubotic",
               "autorSocial":{
                  "media":"Instagram",
                  "user": "@rubotic"
               }
            },
            "discipline": discipline,
            "theme": themes + "," + freeLabels,
            "type": linktype,
            "link": url,
            "linktype": linktype,
            "description": description,
            "language": language,
            "picture":{
               "fileName":image,
               "file":"",
               "uploadTime": Date.now(),
               "type":"link"
            },
            "licence": "CC"
        }

        await createResource(frmData).then(result=>{
            if (result.status==='error'){
                setErrorMsg(result.message);
            } else {
               // console.log(result.result);
               resetEverything();
               window.location.reload(false);
            }
        }
        ).catch(error =>{
            console.log(error);
            setErrorMsg(error.message);
        });
    }

    const resetEverything = ()=>{
        setUrlData(null);
        setUrl(null)
        setTitle(null)
        setDescription(null)
        setImage(null)
        setDiscipline("")
        setThemes("")
        setThemesFilter(null)
        setFreeLabels("")
        setAuthors(null)
        setLanguage(null)
        setLinkType(null);
    }
    
    const CancelClick = (event)=>{
        resetEverything();
        navigate("/");
    }

    const setNewImage = (event)=>{
        event.preventDefault();
        console.log(event.target);
        setImage(event.target.alt)
    }

    const imageSelectorClick = (event)=>{
        event.preventDefault();
        setImageSelectorOpen(!imageSelectorOpen)
    }
 
    const handleCategoriesDialogClick = (event)=>{
        event.preventDefault();
        setCategoriesDialog(!categoriesDialog);
    }

    const proposedTagsFinder = (category)=>{
        const themesString= getTagsFromCategory(category);
        console.log(themesString);
        return themesString;
    }

    const handleSelectCategory = (event)=>{
        event.preventDefault();
        setDiscipline(event.target.value);
        const arr= proposedTagsFinder(event.target.value);
        console.log(arr)
        setThemesFilter(arr);
      
    }

    const freeLabelsChange = (event)=>{
        event.preventDefault();
        setFreeLabels(event.target.value);
    }
    
    const themesChange = (event)=>{
        event.preventDefault();
        setThemes(event.target.value);
    }

    const handleSelectLang = (event, code)=>{
        event.preventDefault();
        console.log(code);
        setLanguage(code);
        
      }

   
    return(
        <React.Fragment>
            <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box
                        sx={{
                            
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            p:2,
                            width: {newWidth}
                            
                        }}
                        >
                        
                        <Typography component="h1" variant="h5">
                            {i18next.t("Publish Resource")}
                        </Typography>

                        <Formik
                            initialValues={{
                                url:'',
                            }}
                            validationSchema={Yup.object().shape({
                                url: Yup
                                    .string()
                                    .max(500)
                                    .required(i18next.t('Must provide an url'))
                            })}
                            onSubmit={async (values, {setErrors, setStatus, setSubmitting }) =>{
                                try {
                                    console.log("SUBMITTING")
                                    handleSubmit(values);
                                    setStatus({success:true});
                                    setSubmitting(false);
                                    
                                } catch (err) {
                                    setStatus({ success:false });
                                    setErrors({ submit: err.message})
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                                <form noValidate onSubmit={handleSubmit} {...others}>
                                    
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"       
                                        >
                                            <Grid item xs={10} sm={10} mt={2}>
                                                <TextField
                                                    name="url"
                                                    required
                                                    fullWidth
                                                    id="url"
                                                    label={i18next.t("URL of the resource")}
                                                    onChange={handleChange}
                                                    helperText={i18next.t("Copy and paste from your navigator")}
                                                    autoFocus
                                                    value={values.url}
                                                    sx={{width:newWidth-32,
                                                        '& fieldset': {
                                                        borderRadius: '20px',
                                                    },}}
                                                    InputProps={{
                                                        endAdornment: (
                                                          <InputAdornment position="end">
                                                             <Button
                                                                type="submit"
                                                                fullWidth
                                                                disabled = {errors.url}
                                                                variant="contained"
                                                                sx={{borderRadius:5 }}
                                                                >  
                                                               {i18next.t("Continue")}
                                                            </Button>
                                                          </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                           
                                        </Grid>
                                   
                                </form>         
                            )
                            }
                        </Formik>
                        {urlData && urlData!==null && urlData!==undefined?
                        <>
                        <Grid 
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            columnSpacing={1}
                        >
                            <Grid item xs={10} sm={10}>
                                <TextField
                                    label ={i18next.t("Title")}
                                    fullWidth
                                    defaultValue={title}
                                    sx={{ 
                                        mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2}>
                                <TextField
                                    label ={i18next.t("Language")}
                                    fullWidth
                                    select
                                    defaultValue={language}
                                    sx={{ 
                                        mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                >
                                     {languagesCodes.map((option)=>{
                                        return(
                                        <MenuItem onClick={(e)=>{handleSelectLang(e, option.code)}}  key={option.code}>{i18next.t(option.label)}</MenuItem>
                                        )
                                    })} 
                                    <Divider />
                                    <MenuItem onClick={(e)=>{handleSelectLang(e, "any")}}  key="any">{i18next.t("Any")}</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label ={i18next.t("Description")}
                                    fullWidth
                                    multiline
                                    rows={newWidth>500?4:7}
                                    defaultValue={description}
                                    sx={{ mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label ={i18next.t("Categories")}
                                    fullWidth
                                    select
                                    rows={newWidth>500?4:7}
                                    helperText={i18next.t("Please select a category")}
                                    
                                    onChange={handleSelectCategory}
                                    sx={{ mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                >
                                        <Button onClick={handleCategoriesDialogClick} variant='text'>*{i18next.t("Categories Explanation")}</Button>
                                            {categoriesList.map((cat)=>{
                                                return(
                                                    <MenuItem key={cat.key} value={cat.label}>
                                                        {cat.label}
                                                    </MenuItem>
                                                    )
                                            })}
                                </TextField>
                            </Grid>

                            <Grid item xs={4} sm={4}>
                                <TextField
                                    label ={i18next.t("Themes")}
                                    fullWidth
                                    select
                                    rows={newWidth>500?4:7}
                                    helperText={i18next.t("Please select a theme")}
                                    disabled={discipline==""}
                                    onChange={themesChange}
                                    sx={{ mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                >
                                    
                                    {themesFilter.map((cat, index)=>{
                                        return(
                                            <MenuItem key={index} value={cat}>
                                                {cat}
                                            </MenuItem>
                                            )
                                    })}
                                </TextField>
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <TextField
                                    label = {i18next.t("Add free labels")}
                                    helperText={i18next.t("Add free themes/labels/hashtags separated by comma")}
                                    onChange={freeLabelsChange}
                                    fullWidth
                                    sx={{ mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                />
                            </Grid>
                            
                            <Grid item xs={4} sm={4}>
                                <Typography variant='body2' color="primary" sx={{mt:1, ml:2, fontSize:11}}>{i18next.t("Image(s)")}</Typography>
                                <Image src={image} width={newWidth>500?300: newWidth-32} sx={{borderRadius:'20px'}} ></Image>
                            </Grid>
                         
                            <Grid item xs={12} sm={5} mt={1}>
                                {urlData.images && urlData.images.length >0?
                                <Button size='small' variant='contained' color={imageSelectorOpen?'secondary':'primary'} sx={{borderRadius:5, mr:2 }} onClick={imageSelectorClick}>{imageSelectorOpen?i18next.t("Close Images"):i18next.t("Select another image")}</Button>
                                :<></>}
                                <Button size='small' variant='contained' sx={{borderRadius:5, mr:2 }}>{i18next.t("Load from disk")}</Button>
                                <Button size='small' variant='contained' sx={{borderRadius:5 }}>{i18next.t("Paste")}</Button>
                                {imageSelectorOpen?<>
                                <ImageList sx={{width:newWidth>500?newWidth-432: newWidth-32, height:newWidth>500?700:1000}} variant="masonry" cols={newWidth>500?6:3} gap={4}>
                                    {urlData.images.map((im, index)=>{
                                        return(
                                            <ImageListItem key={index} sx={{'&:hover':{cursor: "pointer", transform:"scale(1.03) !important;"}}} >
                                                <img
                                                    src={`${im}?w=248&fit=crop&auto=format`}
                                                    srcSet={`${im}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={im}
                                                    loading="lazy"
                                                    onClick={setNewImage}
                
                                                    style={{borderRadius:10, borderColor:"#000000",

                                                        }}

                                                
                                                        
                                                />
                                            </ImageListItem>
                                        )
                                    })

                                    }
                                </ImageList>
                                </>:<></>}
                       
                            </Grid>
                            
                        </Grid>
                        <Grid container direction="row" mt={4}
                            justifyContent="flex-start"
                            alignItems="flex-end">
                                <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5, mr:2 }} onClick={SaveAndSee}>{i18next.t("Save and See")}</Button>
                                <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5, mr:2 }} onClick={SaveAndAnother}>{i18next.t("Save and Create another")}</Button>
                                <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5, mr:2 }} onClick={CancelClick}>{i18next.t("Cancel")}</Button>
                            </Grid>
                        </>:
                        <></>}
                        
                    </Box>
                    
                            
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
                        <Button onClick={handleCategoriesDialogClick}>{i18next.t("Close")}</Button>
                        </DialogActions>
                    </Dialog>
            </ThemeProvider>
        </React.Fragment>
        
    )
}