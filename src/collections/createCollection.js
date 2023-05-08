import * as React from 'react'
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import i18next from 'i18next';
import { Autocomplete, Button, ButtonGroup, Chip, Grid, InputAdornment, Link, Paper, Skeleton, Stack, TextField } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import _ from 'lodash';
import { searchResourcesMinimal } from 'src/api/edusourceApi';
import { getShareUrl } from 'src/utils/rootTools';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'mui-image';
import { getRightPicture, handleLoadFromDisk, handlePasteImage } from 'src/utils/picUtils';
import { getResourceUrlFromTitle } from 'src/utils/resourceUtils';
import { postCollection } from 'src/api/collectionApi';

const theme = createTheme(themeOptions);
const CHARACTER_LIMIT = 250;

const collectionInitialObj = {
    title:"",
    collectionURL: "",
    promoterId: "",
    description: "",
    content :[],
    picture: {
        fileName: "",
        file: "",
        type: "link"
    }
}

const initialChapter = {
    type: "header",
    contentId:"",
    description:"",
    position:0
}

const initialEdusource = {
    type: "edusource",
    contentId:"",
    description:"",
    resourceURL:"",
    position:0
}


    //////////////////////////////////////////
    //                                      //
    //              MAIN COMPONENT          //
    //                                      //
    //////////////////////////////////////////
    

export const CreateCollection= () =>{

    const [newWidth] = useOutletContext();
    const user = useSelector(state => state.user) 
    const [collection, setCollection]= useState (collectionInitialObj);
    const [selectedEdu, setSelectedEdu]= useState();
    const [searchedEdu, setSearchedEdu]= useState([]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const [completedItem, setCompletedItem]= useState(true);
    const [searchEduDialogOpen, setsearchEduDialogOpen] = React.useState(false);


    const handleTitleChange = (event) => {
        const oldCol = _.cloneDeep(collection);
        oldCol.title = event.target.value;
        setCollection(oldCol)
    };

    const handleDescriptionChange = (event) => {
        const oldCol = _.cloneDeep(collection);
        oldCol.description = event.target.value;
        setCollection(oldCol)
    };

    const setPicture = (newPicture)=>{
        console.log("ESTAMOS EN NEWPICTURE",newPicture);
        const oldCol = _.cloneDeep(collection);
        oldCol.picture.file = newPicture;
        oldCol.picture.type = "BUFFER"
        setCollection(oldCol)
    }

    const handleImageChange = (event) => {
       event.preventDefault()
       handleLoadFromDisk(setPicture)
    };

    const handlePasteImage = (event)=>{
        event.preventDefault()
        handlePasteImage(setPicture)
    }


    const handleSearchEduDialogClose = (event)=>{
        event.preventDefault()
        setsearchEduDialogOpen(false);
    }

    const handleEduDialogAccept = (event)=>{
        event.preventDefault()
        const recollection = _.cloneDeep(collection)
        var newContent = recollection.content;
            newContent[newContent.length-1].contentId = selectedEdu._id;
            newContent[newContent.length-1].description = selectedEdu.title;
            newContent[newContent.length-1].resourceURL = selectedEdu.resourceURL;
            newContent[newContent.length-1].picture = selectedEdu.picture;
        recollection.content = newContent;
        setCollection(recollection)
        setSelectedEdu(null)
        setCompletedItem(true)
        setsearchEduDialogOpen(false);
        console.log("ESTA ES LA NUEVA COLECCION",recollection)
    }

    const handleEduSearch = async (event) => {
        const { value } = event.target;
        setSearchValue(value);
        console.log(value);
        if (value.trim() === ""){
            setSearchedEdu([])
        }
        else {
            const results = await searchResourcesMinimal(value)
            const datos = results.data.data.sort((a, b) => (a.title > b.title) ? 1 : -1);
            console.log(datos)
            setSearchedEdu(datos);
        }
      };

    const setSelectedItem = (event, value, reason) => {
        const index = searchedEdu.findIndex((result) => result.title === value);
        setSelectedEdu(searchedEdu[index]);
    };


    //////////////////////////////////////////
    //                                      //
    //              ADD BUTTONS             //
    //                                      //
    //////////////////////////////////////////
    

    const AddButtons = ()=>{
        const addChapter = (event)=>{
            event.preventDefault();
            var oldCollection = _.cloneDeep(collection);
            setCompletedItem(false);
            oldCollection.content.push(initialChapter);
            oldCollection.content[oldCollection.content.length-1].position = oldCollection.content.length
            setCollection(oldCollection)
        }

        const addEdusource = (event)=>{ 
            event.preventDefault();
            setCompletedItem(false);
            var oldCollection = _.cloneDeep(collection);
            oldCollection.content.push(initialEdusource);
            oldCollection.content[oldCollection.content.length-1].position = oldCollection.content.length
            setCollection(oldCollection)
        }

        return(
        
            <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            
            <ButtonGroup sx={{mt:1, borderRadius:5}} variant="contained" aria-label="outlined primary button group">
                <Button disabled={!completedItem} onClick={addChapter} variant='contained' color='secondary' sx={{borderRadius:5 }} endIcon={<BookmarkAddIcon/>} >{i18next.t("Add Chapter")}</Button>
                <Button disabled={!completedItem} onClick={addEdusource} variant='contained' color='secondary' sx={{borderRadius:5 }} endIcon={<LibraryAddIcon/>} >{i18next.t("Add Resource")}</Button>
            </ButtonGroup>
            </div>
            </>
        )
    
    }


    //////////////////////////////////////////
    //                                      //
    //             ITEM IN DRAWER           //
    //                                      //
    //////////////////////////////////////////
    

    
    const ItemInDrawer = (props)=>{
        
        const {item, index} = props;

        const searchClick = (event)=>{
            event.preventDefault();
            setsearchEduDialogOpen(true);
        }

        const createClick = (event)=>{

        }

        const onUpClick = (event)=>{
            let oldCollection = _.cloneDeep(collection);
            let oldContent = oldCollection.content;
            if (index !==0){
                oldContent[index].position = index;
                oldContent[index-1]. position = index+1;
                oldCollection.content = oldContent;
                setCollection(oldCollection);
            }
           // console.log("OLD COLLECTION ON ARROW UP",oldCollection)


        }

        const onDownClick = (event)=>{
            let oldCollection = _.cloneDeep(collection);
            let oldContent = oldCollection.content;
            if (index !== oldContent.length-1){
                oldContent[index].position = index+2;
                oldContent[index+1]. position = index+1;
                oldCollection.content = oldContent;
                setCollection(oldCollection);
            }
            //console.log("OLD COLLECTION ON ARROW DOWN",oldCollection)
        }

        //
        // BUTTON ZONE
        //

        const ButtonZone = () =>{
            return(
            <>
                      
            <Grid item sx={"auto"}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >   
                    <Grid item>     
                        <ButtonGroup size='small' orientation="vertical" variant='text'>
                        <IconButton size='small'>
                            <ArrowDropUpIcon onClick={onUpClick}/>
                        </IconButton>
                
                        <IconButton size='small'>
                            <ArrowDropDownIcon onClick={onDownClick}/>
                        </IconButton>
                        </ButtonGroup>
                 
                    </Grid>
                    <Grid item>
                        <IconButton size='small'  onClick={deleteClick}>
                            <CancelIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            </>
            )
        }

        const titleChange = (event)=>{
            event.preventDefault();
            item.description = event.target.value;
            if (event.target.value.length > 5){
                setCompletedItem(true)
            }
            else 
                setCompletedItem(false);
        }

        const deleteClick = (event)=>{
            event.preventDefault();
            const recollection = _.cloneDeep(collection)
            const index = recollection.content.findIndex(i=>i.description=== item.description);
            const x = recollection.content.splice(index, 1)
            setCollection(recollection)
            if (recollection.content.length===0){
                setCompletedItem(true);
            }

        }

        // ITEM IN DRAWER MAIN RETURN

        if (item.type==="header"){
            return(<>
         
            <Paper sx={{ display: 'flex', p:1, m:0.5,borderRadius:5 }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                <Grid item xs={"auto"}>
                  <Chip label={item.position} color='secondary' sx={{mr:1}}/>
                </Grid>
                <Grid item xs={newWidth<500?8:10.3}>
                    <TextField 
                        onChange={titleChange} 
                        fullWidth
                        rows={newWidth<500?2:0}
                        multiline={newWidth<500} 
                        label={i18next.t("Write Chapter Title")}
                        defaultValue={item.description}
                        
                    />
                </Grid>
                <ButtonZone />
                </Grid>
            </Paper>
                
            </>)
        }
        else{
            return(<>
           <Paper sx={{ display: 'flex', p:1, m:0.5,borderRadius:5 }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                
                >
                    <Grid item xs={"auto"}>
                        <Chip label={item.position} color='secondary' sx={{mr:1}}/>
                    </Grid>
                    <Grid container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{mt:2}}
                        xs={newWidth<500?7:10}
                        >
                        {item.description?<>
                        <Grid item>
                        {item.description} - 
                        <Link href={getShareUrl()+item.resourceURL} target="_blank" >{i18next.t("See")} </Link>
                        </Grid>
                        
                        </>:
                        <>
                            {newWidth<500?<></>:<>
                            <Grid item sx={2}>
                                <Typography variant='body2' mr={2}>{i18next.t("Search or create resource")}</Typography>
                            </Grid>
                            </>}
                            <Grid item sx={newWidth<500?10:7}>
                                <ButtonGroup>
                                    <Button onClick={searchClick} variant='contained' >{i18next.t("Search")}</Button>
                                    <Button onClick={createClick} variant='contained' >{i18next.t("Create")}</Button>
                                </ButtonGroup>
                            </Grid>
                        </>}
                        </Grid>
                    <ButtonZone />
                </Grid>
            </Paper>
            </>)
        }
    }

    const contentSorted = ()=>{
        //TODO: SORTED BY POSITION
        const arr = collection.content.sort((a, b)=>a.position> b.position);
        return arr
    }

    //////////////////////////////////////////
    //                                      //
    //              DRAWERCONTENT           //
    //                                      //
    //////////////////////////////////////////

    const DrawerContent = (props) =>{
        const {width} = props;

        return(
        <React.Fragment>
            
            <Box width={width}  mt={newWidth<500?1:0} ml={newWidth>500?3:0} sx={{ border: 1, p:1, borderRadius: '20px',}}>
            <Typography variant='h2'>{i18next.t("Resources")}</Typography>
            <Typography variant='body1' sx={{my:1}}>{i18next.t("Organize your collections with title chapters (that work as separators) and resources, that you can search in our repository or creating a brand new own.")}</Typography>
                {contentSorted().map((item, index)=>{
                    return(
                        <React.Fragment key={index}>
                            <ItemInDrawer item={item} index={index}/>
                        </React.Fragment>
                    )
                })}           
         
            <List>
                <AddButtons />
            </List>
            </Box>
        </React.Fragment>
        )
    };

    const styles = {
        
        //style for font size
        resize:{
          fontSize:50
        },
      }
    const SaveAndSee = async (event)=>{
        //CHECK
        if (collection.title.length<2){
            alert("Debes escribir un título para la colección")
        }

        if (collection.description.length<2){
            alert("Debes escribir una Descripción para la colección")
        }

        if (collection.picture.file===""){
            alert("Debes escoger una imagen para la colección")
        }

        console.log("COLECCION A GUARDAR", collection)
        const oldCol = _.cloneDeep(collection)
        oldCol.collectionURL=getResourceUrlFromTitle(collection.title);
        oldCol.promoterId = user._id;

        await postCollection(oldCol).then(result=>{
            if (result.status==='error'){
               console.error(result.message);
            } else {
               // console.log(result.result);
                navigate("/collection/"+oldCol.collectionURL);
            }
        }
        ).catch(error =>{
            console.log(error);
            //setErrorMsg(error.message);
        }); 

    }

    const SaveAndAnother = (event)=>{
        
    }

    const CancelClick = (event)=>{
        
    }

    React.useEffect(()=>{
      /*   if (!user ||user==null ||user._id==="" || user._id===null ||user._id===undefined){
            navigate("/login");
        }
        */
    },[user._id, user, navigate])


    return(
        <React.Fragment>
             <ThemeProvider theme={theme}>
                 <Box
                    sx={{
                        
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        p:2,
                        width: {newWidth},
                       
                        
                        
                    }}
                    >
                    
                    <Typography component="h1" variant="h5">
                        {i18next.t("Create Collection")}
                    </Typography>
                    <Stack direction= {newWidth>500?"row":"column"} >
                    <Box width={newWidth > 500 ? newWidth * 2 / 10 : newWidth - 32} sx={{ border: 1, p:0.5, borderRadius: '20px',}}>
                            <TextField
                                name="collectionTitle"
                                required
                                fullWidth
                                multiline
                                rows={2}
                                id="collectionTitle"
                                label={i18next.t("Collection Title")}
                                onChange={handleTitleChange}
                                helperText={i18next.t("Give the collection a representative name")}
                                defaultValue={collection.title}
                                sx={{width:newWidth > 500 ? newWidth * 2 / 10 -20: newWidth - 32 -20,
                                    m:1,
                                    '& fieldset': {
                                    borderRadius: '20px',
                                },}}
                                
                                
                            />
                            <TextField
                                name="collectionDescription"
                                required
                                fullWidth
                                multiline
                                rows={4}
                                id="collectionDescription"
                                label={i18next.t("Collection Description")}
                                onChange={handleDescriptionChange}
                                helperText={collection.description.length + "/ "+CHARACTER_LIMIT}
                                inputProps={{
                                    maxLength: CHARACTER_LIMIT
                                }}
                                defaultValue={collection.description}
                                sx={{width:newWidth > 500 ? newWidth * 2 / 10 -20: newWidth - 32 -20,
                                    m:1,
                                    '& fieldset': {
                                    borderRadius: '20px',
                                },}}
                            
                            />
                            <Typography variant='body1' color="primary" sx={{ml:2}}>{i18next.t("Image")}</Typography>
                                <ButtonGroup sx={{m:1}}>
                                    <Button onClick={handleImageChange} size='small' variant='contained' sx={{borderRadius:5 }}>{i18next.t("Load from disk")}</Button>
                                    <Button onClick={handlePasteImage} size='small' variant='contained' sx={{borderRadius:5 }}>{i18next.t("Paste")}</Button>
                                </ButtonGroup>
                        <Box  sx={{ border: 1, m:1, borderRadius: '20px'}}>
                            
                        <Image src={getRightPicture(collection.picture)}  />
                        </Box>


                    </Box>
                    
                    <DrawerContent width= {newWidth>500?newWidth*(8/10)-64:newWidth-32 } ml={1}/>
                    </Stack>
                    <ButtonGroup sx={{mt:2}}>
                        <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5 }} onClick={SaveAndSee}>{i18next.t("Save and See")}</Button>
                        <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5 }} onClick={SaveAndAnother}>{i18next.t("Save and Create another")}</Button>
                        <Button variant='contained' size="big" color='secondary' sx={{borderRadius:5 }} onClick={CancelClick}>{i18next.t("Cancel")}</Button>
                    </ButtonGroup>
                
                        
                    
                </Box>

                <Dialog open={searchEduDialogOpen} onClose={handleSearchEduDialogClose}>
                    <DialogTitle>{i18next.t("Search Resource")}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {i18next.t("Enter some text to search for a resource")}
                    </DialogContentText>
                    <Autocomplete
                        freeSolo
                        disableClearable
                        options={Array.isArray(searchedEdu) ? searchedEdu.map((result) => result.title) : []}
                        onChange={setSelectedItem}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            margin="normal"
                            variant="outlined"
                            value={searchValue}
                            onChange={handleEduSearch}
                        />
                        )}
                    />
                    {selectedEdu && selectedEdu._id !== null && selectedEdu!== undefined?<>
                    <Typography>
                        {i18next.t("Selected resource:")} {selectedEdu.title}
                    </Typography>
                    <Typography>
                        {i18next.t("Url")}:<Link href={getShareUrl()+selectedEdu.resourceURL} target="_blank"> https://eduplat.org.es/resources/{selectedEdu.resourceURL}</Link>
                    </Typography>
                    
                    </>:<>
                   
                    </>}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleEduDialogAccept}>{i18next.t("Accept")}</Button>
                    <Button onClick={handleSearchEduDialogClose}>{i18next.t("Cancel")}</Button>
                    </DialogActions>
                </Dialog>
                
            </ThemeProvider>
        </React.Fragment>
    )
}