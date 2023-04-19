import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { categoriesList, iscedList } from 'src/utils/isced';
import { arrayFromString } from 'src/utils/stringOperations';
import { getTagsFromCategory } from 'src/utils/isced';
import { languagesCodes } from 'src/utils/countries';
import { useNavigate } from 'react-router-dom';



// mui
import { ImageList, ImageListItem, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, Input, IconButton, Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UploadIcon from '@mui/icons-material/Upload';


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import {Image} from 'mui-image';
import { fetchEdusourceByLink, updateTheResource } from 'src/api/edusourceApi';
import i18next from 'i18next';
import _ from 'lodash';
import { getRightPicture } from 'src/utils/picUtils';
import Loader from 'src/ui-component/Loader';
import FileResizer from 'react-image-file-resizer';
//import { useSelector } from 'react-redux';


const theme = createTheme(themeOptions);

export const EditEdusource= (props) =>{
    const {editUrl} = useParams();
    const [newWidth] = useOutletContext();
    //const user = useSelector(state => state.user)

    const [imageSelectorOpen, setImageSelectorOpen] = useState(false);
    const [categoriesDialog, setCategoriesDialog]= React.useState(false)
    const [themesFilter, setThemesFilter] = React.useState([]);

    const [editedEdu, setEditedEdu] = React.useState();
    const [urlData, setUrlData] = React.useState();
    const [themes, setThemes]= React.useState();
    const [freeLabels, setFreeLabels] = React.useState();
    const [edited, setEdited] = React.useState();
    
    const hiddenFileInput = React.useRef(null);
   
    const categoriesDescriptionElementRef = React.useRef(null);

    const navigate = useNavigate();
    //const user = useSelector(state => state.user)

    //SNACK
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");
    const [openSnack, setOpenSnack] = useState(false);


    const  handleFileChange = async (e) =>{
        
        const file = e.target.files[0];
        console.log(file)
        const base64 = await resizeFile(file)
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.picture.file= base64;
        oldValues.picture.type = "BUFFER"
        setEditedEdu(oldValues);
        setEdited(true);
        }

    const UpdateResource = async (event) =>{
       event.preventDefault();
       

        await updateTheResource(editedEdu).then(result=>{
            if (result.status==='error'){
                
                setMessage(result.message);
                setSeverity("error");
                setOpenSnack(true);
            } else {
               // console.log(result.result);
                navigate("/resources/"+editedEdu.resourceURL);
            }
        }
        ).catch(error =>{
            
            setMessage(error.message);
            setSeverity("error");
            setOpenSnack(true);
        });
 
    }
     
    const resizeFile = (file) => new Promise(resolve => {
        FileResizer.imageFileResizer(file, 250, 250, 'JPEG', 70, 0,
        uri => {
        resolve(uri);
        }, 'base64' );
    });


    const resetEverything = ()=>{
        setEditedEdu(null);
        setEdited(false);
    }
    
    const CancelClick = (event)=>{
        event.preventDefault();
        resetEverything();
        window.location.reload();
    }

    const setNewImage = (event)=>{
        event.preventDefault();
        console.log(event.target);
        // setImage(event.target.alt)
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
       
        return themesString;
    }

    const handleSelectCategory = (event)=>{
        event.preventDefault();
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.discipline = event.target.value;
        setEditedEdu(oldValues);

        const arr= proposedTagsFinder(event.target.value);
        setThemesFilter(arr);
        setEdited(true);
      
    }

    const handleChangeUrl = (event) =>{
        event.preventDefault();
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.resourceURL = event.target.value;
        setEditedEdu(oldValues);
        setEdited(true);
    }

    const handleChangeTitle = (event)=>{
        event.preventDefault();
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.title = event.target.value;
        setEditedEdu(oldValues);
        setEdited(true);
    }

    const handleChangeDescription = (event)=>{
        event.preventDefault();
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.description = event.target.value;
        setEditedEdu(oldValues);
        setEdited(true);
    }

    const freeLabelsChange = (event)=>{
        event.preventDefault();
        setFreeLabels(event.target.value);
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.theme = arrayFromString(themes+","+event.target.value,",")
        setEditedEdu(oldValues);
        setEdited(true);
        
    }
    
    const themesChange = (event)=>{
        event.preventDefault();
        setThemes(event.target.value)
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.theme = arrayFromString(event.target.value+","+freeLabels,",");
        setEditedEdu(oldValues);
        setEdited(true);

        //setThemes(event.target.value);
    }

    const handleSelectLang = (event, code)=>{
        event.preventDefault();
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.language = code
        setEditedEdu(oldValues);
        setEdited(true);
        
    }

    const handleSelectLevel = (event, code)=>{
        event.preventDefault();
        var oldValues = _.cloneDeep(editedEdu)
        oldValues.level = code;
        setEditedEdu(oldValues);
        setEdited(true);
        //console.log(oldValues)
        
    }

    const getFreeLabels = (arr)=>{

        
        var sliced = arr.slice(1)
        var strResult=""
        if (sliced.length>1){
            strResult = sliced.join(',')
        }
        else{
            strResult = sliced[0];
        } 


        return strResult;
    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

    

    useEffect(()=>{

        if (!editedEdu || editedEdu===undefined || editedEdu===null){
            const fetchData = async () =>{
                await fetchEdusourceByLink(editUrl).then((data)=>{
                    if (data.status==="success"){
                        //console.log(data)
                        setEditedEdu(data.result);
                        setUrlData({images:{}})
                        setThemesFilter(proposedTagsFinder(data.result.discipline))
                        setThemes(arrayFromString(data.result.theme[0],",")[0])
                        setFreeLabels(getFreeLabels(data.result.theme))
                    }

                }).catch((error)=>{
                    console.log(error)
                })
            }
            fetchData();
        }
       
    },[editUrl, editedEdu])

    if (editedEdu){
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
                                <Grid container width={newWidth-32} >
                                    <Grid item xs={12}>
                                    <Alert sx={{mb:2}} severity={!edited?"info":"warning"}>{!edited?i18next.t("Without changes"):i18next.t("You need to save changes")}</Alert>            
                                    </Grid>
                                </Grid>
                            
                            <Typography component="h1" variant="h5">
                                {i18next.t("Edit Resource")}
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
                               
                            >
                                {({ values}) => (
                                    <form noValidate >
                                        
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"       
                                            >
                                                <Grid item xs={10} sm={10} mt={2}>
                                                    <TextField
                                                        name="url"
                                                        fullWidth
                                                        id="url"
                                                        label={i18next.t("URL of the resource")}
                                                        onChange={handleChangeUrl}
                                                        helperText={i18next.t("Copy and paste from your navigator")}
                                                        autoFocus
                                                        value={editedEdu.link}
                                                        sx={{width:newWidth-32,
                                                            '& fieldset': {
                                                            borderRadius: '20px',
                                                        },}}
                                                       
                                                    />
                                                </Grid>
                                               
                                            </Grid>
                                       
                                    </form>         
                                )
                                }
                            </Formik>
                           
                            
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
                                        onChange={handleChangeTitle}
                                        defaultValue={editedEdu.title}
                                        sx={{ 
                                            mt:1,
                                            '& fieldset': {
                                            borderRadius: '20px',
                                        },}}
                                    />
                                </Grid>

  {/* LANGUAGE IDIOMA */}
                                <Grid item xs={2} sm={2}>
                                    <TextField
                                        label ={i18next.t("Language")}
                                        fullWidth
                                        select
                                        defaultValue={editedEdu.language}
                                        sx={{ 
                                            mt:1,
                                            '& fieldset': {
                                            borderRadius: '20px',
                                        },}}
                                    >
                                         {languagesCodes.map((option)=>{
                                            return(
                                                <MenuItem onClick={(e)=>{handleSelectLang(e, option.code)}}  key={option.code} value={option.code+""}>{i18next.t(option.label)}</MenuItem>
                                            )
                                        })} 
                                        <Divider />
                                        <MenuItem onClick={(e)=>{handleSelectLang(e, "any")}}  key="any">{i18next.t("Any")}</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={6} sm={6}>
                                <TextField
                                    label ={i18next.t("Author")}
                                    fullWidth
                                    defaultValue={editedEdu.autors[0].autorName}
                                    sx={{ mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                />
                                </Grid>

                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        label ={i18next.t("level")}
                                        fullWidth
                                        select
                                        defaultValue={editedEdu.level}
                                        sx={{ 
                                            mt:1,
                                            '& fieldset': {
                                            borderRadius: '20px',
                                        },}}
                                    >
                                        <Button onClick={handleCategoriesDialogClick} variant='text'>*{i18next.t("ISCED Levels")}</Button>
                                        {iscedList.map((option)=>{
                                            return(
                                            <MenuItem onClick={(e)=>{handleSelectLevel(e, option.label)}}  key={option.key} value={option.label+""}>{i18next.t(option.desc)}</MenuItem>
                                            )
                                        })} 
                                    
                                    </TextField>
                                </Grid>
                                

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        label ={i18next.t("Description")}
                                        fullWidth
                                        multiline
                                        onChange={handleChangeDescription}
                                        rows={newWidth>500?4:7}
                                        defaultValue={editedEdu.description}
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
                                        defaultValue={editedEdu.discipline}
                                        onChange={handleSelectCategory}
                                        sx={{ mt:1,
                                            '& fieldset': {
                                            borderRadius: '20px',
                                        },}}
                                    >
                                            <Button onClick={handleCategoriesDialogClick} variant='text'>*{i18next.t("Categories Explanation")}</Button>
                                                {categoriesList.map((cat)=>{
                                                    return(
                                                        <MenuItem key={cat.key} value={cat.label+""}>
                                                            {i18next.t(cat.label)}
                                                        </MenuItem>
                                                        )
                                                })}
                                    </TextField>
                                </Grid>
                              {themesFilter===undefined || themesFilter ===null?<></>:
                              <>
                                <Grid item xs={4} sm={4}>
                                    <TextField
                                        label ={i18next.t("Subcathegory")}
                                        fullWidth
                                        select
                                        rows={newWidth>500?4:7}
                                        helperText={i18next.t("Please select a subcathegory")}
                                        disabled={editedEdu.discipline===""}
                                        defaultValue={editedEdu.theme[0]}
                                        onChange={themesChange}
                                        sx={{ mt:1,
                                            '& fieldset': {
                                            borderRadius: '20px',
                                        },}}
                                    >
                                        
                                        {themesFilter.map((cat, index)=>{
                                            return(
                                                <MenuItem key={index} value={cat}>
                                                    {i18next.t(cat)}
                                                </MenuItem>
                                                )
                                        })}
                                    </TextField>
                                </Grid>
                                </>}
                                <Grid item xs={8} sm={8}>
                                    <TextField
                                        label = {i18next.t("Add free labels")}
                                        helperText={i18next.t("Add free themes/labels/hashtags separated by comma")}
                                        defaultValue={getFreeLabels(editedEdu.theme)}
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
                                    <Image src={getRightPicture(editedEdu.picture)} width={newWidth>500?300: newWidth-32} sx={{borderRadius:'20px'}} ></Image>
                                </Grid>
                             
                                <Grid item xs={12} sm={5} mt={1}>
                                    {urlData.images && urlData.images.length >0?
                                    <Button size='small' variant='contained' color={imageSelectorOpen?'secondary':'primary'} sx={{borderRadius:5, mr:2 }} onClick={imageSelectorClick}>{imageSelectorOpen?i18next.t("Close Images"):i18next.t("Select another image")}</Button>
                                    :<></>}
                                    <label htmlFor="upload-button">
                                        <Input accept="image/*" id="upload-button" type="file" style={{display: 'none'}} ref={hiddenFileInput} onChange={handleFileChange}/> 
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <UploadIcon />
                                        </IconButton>
                                    </label>
                                   
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
                            <Grid container width={newWidth-32} >
                                    <Grid item xs={12} mt={2}>
                                    <Alert sx={{mb:2}} severity={!edited?"info":"warning"}>{!edited?i18next.t("Without changes"):i18next.t("You need to save changes")}</Alert>            
                                    </Grid>
                                </Grid>
                            <Grid container direction="row" mt={4}
                                justifyContent="flex-start"
                                alignItems="flex-end">
                                    
                                    <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5, mr:2 }} disabled={!edited} onClick={UpdateResource}>{i18next.t("Update")}</Button>
                                    <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5, mr:2 }} onClick={CancelClick}>{i18next.t("Cancel")}</Button>
                                </Grid>
                           
                        </Box>
                        
                                
                        {/* DIALOG FOR ISCED EXPLANATION */}
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

                        {/* SNACKBAR */}

                        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                            <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
                            {message}
                            </Alert>
                        </Snackbar>
                </ThemeProvider>
            </React.Fragment>
            
        )
    }else{
    
    return(<>
    <Loader />
    </>)
    }

   
}