import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import i18next from 'i18next';
import { Button, ButtonGroup, Paper, TextField } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import _ from 'lodash';



const theme = createTheme(themeOptions);

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
    completed: false
}

const initialEdusource = {
    type: "edusource",
    contentId:"",
    description:"",
    completed:false
}

export const CreateCollection= () =>{

    const [newWidth] = useOutletContext();
    const user = useSelector(state => state.user)
    const [collection, setCollection]= React.useState (collectionInitialObj);
    const [selectedEdu, setSelectedEdu]= React.useState();
    const navigate = useNavigate();


    const AddButtons = ()=>{
        const addChapter = (event)=>{
            event.preventDefault();
            var oldCollection = _.cloneDeep(collection);
            oldCollection.content.push(initialChapter);
            setCollection(oldCollection)
        }

        const addEdusource = (event)=>{ 
            event.preventDefault();
            var oldCollection = _.cloneDeep(collection);
            oldCollection.content.push(initialEdusource);
            setCollection(oldCollection)
        }

        return(
            <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <ButtonGroup sx={{mt:1}} variant="contained" aria-label="outlined primary button group">
                <Button onClick={addChapter} variant='contained' color='secondary' endIcon={<BookmarkAddIcon/>} >{i18next.t("Add Chapter")}</Button>
                <Button onClick={addEdusource} variant='contained' color='secondary' endIcon={<LibraryAddIcon/>} >{i18next.t("Add Resource")}</Button>
            </ButtonGroup>
            </div>
            </>
        )
    }

    const ItemInDrawer = (props)=>{
        const {item} = props;
        if (item.type==="header"){
            return(<>
         
            <Paper  sx={{ display: 'flex', p:2, m:0.5 }}>
            <TextField label="Write Chapter Title" />

            </Paper>
                
            </>)
        }
        else{
            return(<>
            <Paper  sx={{ display: 'flex', p:2, m:0.5 }}>
            RESOURCE
            </Paper>
            </>)
        }
    }

    const DrawerContent = (props) =>{

        return(
        <div>
             <div style={{display: 'flex', justifyContent: 'center'}}>
            
            </div>
        
                {collection.content.map((item, index)=>{
                    return(
                        <React.Fragment key={index}>
                            <ItemInDrawer item={item}/>
                        </React.Fragment>
                    )
                })}           
         
           
            <List>
                <AddButtons />
            </List>
           
        </div>
        )
    };

    React.useEffect(()=>{
      /*   if (!user ||user==null ||user._id==="" || user._id===null ||user._id===undefined){
            navigate("/login");
        }
        */
    },[user._id, user, navigate])
    return(
        <React.Fragment>
             <ThemeProvider theme={theme}>
                 <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        color='secondary'

                    >

                        <Toolbar />
                        <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            {collection.title?collection.title:i18next.t("Set Collection Title")}
                        </Typography>
                        </Toolbar>
                    </AppBar>
                   
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: newWidth }}
                    >
                        <Toolbar />
                       <DrawerContent />
                        
                    </Box>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}