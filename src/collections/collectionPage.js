import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { createCollectionValoration, getCollectionByUrl, markasReaded, updateCollectionValoration } from 'src/api/collectionApi';
import Loader from 'src/ui-component/Loader';
import i18next from 'i18next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchEdusourceById } from 'src/api/edusourceApi';
import { EdusourceHeaderForCollection } from 'src/components/resources/edusourceHeader';
import { Button,  Grid, Link } from '@mui/material';
import { EdusourceBody } from 'src/components/resources/edusourceBody';
import _ from 'lodash';
import Image from 'mui-image';
import { getRightPicture } from 'src/utils/picUtils';
import { ValorateCollection } from 'src/components/favorites';



const theme = createTheme(themeOptions);
//const drawerWidth = 240;


export const CollectionShow= () =>{

    const navigate = useNavigate();
    const {id} = useParams();
    const [collection, setCollection]= React.useState ();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedEdu, setSelectedEdu]= React.useState();
    const [newWidth] = useOutletContext();
    const custom = useSelector(state => state.custom)
    const user = useSelector(state => state.user) 
    const drawerWidth = custom.drawerWidth;
    

   // const { window } = props;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const handleTitleClick = (event) =>{
        event.preventDefault()
        setSelectedEdu(null)
    }

    const updateValoration = async (valoration, firstTime)=>{
        if (firstTime){
            await createCollectionValoration(collection._id, valoration, user._id).then ((res)=>{
                console.log("RESPUESTA EN FATHER", res)
            }).catch((err)=>{
                console.log(err)
            })
        }
        else{
            await updateCollectionValoration(collection._id, valoration, user._id).then ((res)=>{
                console.log("RESPUESTA EN FATHER", res)
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    const visited = (item) =>{
        const exist = item.visitedBy.indexOf(user._id)!==-1
        return (exist)
    }

    const markAsReadLocally = (contentId) =>{
        const oldContent = _.cloneDeep(collection.content);
        for (let i = 0; i < oldContent.length; i++) {

            if (oldContent[i]._id===contentId){
                if (oldContent[i].visitedBy.indexOf(user._id.toString())===-1){
                    oldContent[i].visitedBy.push(user._id.toString())
                }
            }
         
        }
        const oldCol = _.cloneDeep(collection);
        oldCol.content = oldContent;
        setCollection(oldCol)
    }
    
    const DrawerContent = (props) =>{
        const {collection}= props;

        const handleOnClick = async (event, edusourceId, id)=>{
            event.preventDefault();
            await fetchEdusourceById(edusourceId).then((result)=>{
                
                //console.log("RESOURCE",result)
                setSelectedEdu(result.result);
            }).catch((err)=>{
                console.log(err)
            })

            if(user._id!=="" && user._id!==null && user._id!==undefined){
                markasReaded(collection._id, id, user._id, id)
                markAsReadLocally(id)
            }
            
            
            //console.log("COLLECTION", collection._id, "CONTENTID", id, "USERID", user._id.toString())
            
        }

        if (collection){
           
        return(
        <div>
            <Toolbar />
            <Typography variant='h3' p={2}>{i18next.t("Recursos")}</Typography>
            <Button onClick={handleTitleClick} sx={{ml:1}}><b>{collection.title}</b></Button>
            <Divider />
            <List>
            {collection.content.map((item)=>{
                return(
                <ListItem key={item._id} disablePadding onClick={(e)=>{handleOnClick(e, item.contentId, item._id)}} > 
                    {item.type==="header"?<>
                    <ListItemText primary={item.description} sx={{p:2}}/>
                    
                    </>:<>
                    <ListItemButton>
                        {item.type!=="header"?<>
                        <ListItemIcon>
                            {visited(item)?<CheckIcon />:<VisibilityIcon />}
                        </ListItemIcon>
                        </>:<></>}
                        <ListItemText primary={item.description} />
                    </ListItemButton>
                    </>}
                
                </ListItem>
                )
                
            })}
            </List>
           
        
         {/* VALORATIONS*/}
                
        <ValorateCollection collection={collection} user={user} updateValoration={updateValoration} />
        
    </div>
        );
            }else{
                return(
                <>NO COLLECTION</>
                )
            }
    }

    const CollectionIndex = (props)=>{
        const {collection}= props;
        return(
            <>
            <Grid container width={newWidth>500?newWidth-48-drawerWidth:newWidth-32}>
            <Image src={getRightPicture(collection.picture)} showLoading />
            <Typography paragraph mt={2}>
                {collection.description}
            </Typography>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                >
                <Typography variant='h4'>{i18next.t("Content")}</Typography>
                    {collection.content.map((item)=>{
                        return(
                            <React.Fragment key={item._id}>
                            
                            {item.type==="header"?<>
                            <Grid item>
                            <Typography  sx={{py:2}}><b>{item.description}</b></Typography>
                            </Grid>
                            </>:<>
                                <Grid item>
                                <Typography sx={{ml:2}}> {item.description} </Typography>
                            </Grid>
                            </>}
                        
           
                        </React.Fragment>
                        )
                        
                    })}
            </Grid>
            </Grid>
            </>
        )
    }

   


   // const container = window !== undefined ? () => window().document.body : undefined;

    React.useEffect(()=>{
        /* if (!user ||user==null ||user._id==="" || user._id===null ||user._id===undefined){
            navigate("/login");
        } */

        const fetchData =async()=>{
            await getCollectionByUrl(id)
            .then((result)=>{
               // console.log("RESULTADO EN FETCH",result.data.result)
                setCollection(result.data.result)
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        
        if (!collection || collection===null || collection===undefined){
            fetchData();
        }
        
       
    },[ navigate, setCollection, collection, id])
    return(
        <React.Fragment>
            
             <ThemeProvider theme={theme}>
                {collection && collection!==null & collection!==undefined?
                <>
                 <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    
                    <AppBar
                        position="fixed"
                        color='secondary'
                        sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        }}
                    >
                        <Toolbar />
                        <Toolbar>
                            
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h3" noWrap component="div">
                            {collection.title}
                        </Typography>
                        <Typography variant="h4" noWrap component="div">
                            -- by <Link color="primary.contrast" href={'/user/'+collection.promoterId.username}>{collection.promoterId.username}</Link>
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            <DrawerContent collection={collection} />
                        </Drawer>
                        <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                        >
                            <DrawerContent collection={collection} />
                        </Drawer>
                    </Box>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                        <Toolbar />
                        {!selectedEdu || selectedEdu===null | selectedEdu===undefined?<>
                            <CollectionIndex collection= {collection} />    
                        </>:<>
                        <EdusourceHeaderForCollection edusource ={selectedEdu} newWidth={newWidth} />
                        <Typography variant='body2' mt={2}>{selectedEdu.description}</Typography>
                        <EdusourceBody edusource={selectedEdu} promoter={selectedEdu.promoterId} newWidth={newWidth} />
                        </>}
                       
                        
                    </Box>
                </Box>

                   
                </>:
                <>
                    <Loader />
                </>}
            </ThemeProvider>
        </React.Fragment>
    )
}