import { Alert, Button,  Chip,  CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, Grid, IconButton,  Snackbar, Typography } from '@mui/material';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchEdusourceByPromoter } from 'src/api/edusourceApi';
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { fetchUserByUsername } from 'src/api/userApi';
import Container from '@mui/material/Container';
import { MENU_OPEN } from 'src/store/menuSlice';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import {Image} from 'mui-image';
import { longDate } from 'src/utils/dateUtils';
import { NameForm } from 'src/components/form-components/name-comp';
import { AboutForm } from 'src/components/form-components/aboutme';
import { DescriptionForm } from 'src/components/form-components/description-comp';
import { SocialRow } from 'src/ui-component/cards/user/socialRow';
import { Valoration } from 'src/components/valoration';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const theme = createTheme(themeOptions);
var newMaxWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


export const UserPage = () =>{


    const {id} = useParams();
    const dispatch = useDispatch();
    const [loadedUser, setLoadedUser] = useState();
    const user = useSelector(state => state.user)
    const [edusources, setEdusources] = useState();
    const [newWidth, setNewWidth] = useState(newMaxWidth);
     // eslint-disable-next-line
    const [error, setError] = useState("");

    //DIALOGS
    const [openNameDialog, setOpenNameDialog]= useState(false);
    const [openAboutMeDialog, setOpenAboutMeDialog] = useState(false);
    const [openDescriptionDialog, setOpenDescriptionDialog]= useState(false);
    const [openHeaderPicDialog, setOpenHeaderPicDialog]= useState(false);
    const [openProfilePicDialog, setOpenProfilePicDialog]= useState(false);
    const [valOpen, setValOpen] = useState(true);
    const [activityOpen, setActivityOpen] = useState(true);
    const [openSnack, setOpenSnack] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");


    //DIALOGS OPEN CLOSE FUNCTIONS

    const handleNameOpen = () => {
        setOpenNameDialog(true);
    };
    
    const handleNameClose = (status, message) => {
        if (status && message){
            //console.log(status, message);
            setSeverity(status);
            setMessage(message);
            setOpenSnack(true);
            setLoadedUser(null);
        }
        setOpenNameDialog(false);
    };

    const handleAboutOpen = () => {
        setOpenAboutMeDialog(true);
    };
    
    const handleAboutClose = (status, message) => {
        if (status && message){
            //console.log(status, message);
            setSeverity(status);
            setMessage(message);
            setOpenSnack(true);
            setLoadedUser(null);
        }
        setOpenAboutMeDialog(false);
    };

    const handleDescriptionOpen = () => {
        setOpenDescriptionDialog(true);
    };
    
    const handleDescriptionClose = (status, message) => {
        if (status && message){
            //console.log(status, message);
            setSeverity(status);
            setMessage(message);
            setOpenSnack(true);
            setLoadedUser(null);
        }
        setOpenDescriptionDialog(false);
    };

    const handleHeaderPicOpen = () => {
        setOpenHeaderPicDialog(true);
    };
    
    const handleHeaderPicClose = () => {
        setOpenHeaderPicDialog(false);
    };

    const handleProfilePicOpen = () => {
        setOpenProfilePicDialog(true);
    };
    
    const handleProfilePicClose = () => {
        setOpenProfilePicDialog(false);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

    const handleValButtonClick = (event)=>{
        event.preventDefault();
        setValOpen(!valOpen);
    }

    const handleActivityButtonClick = (event)=>{
        event.preventDefault();
        setActivityOpen(!activityOpen);
    }


    useEffect(() =>{
      
       if(!loadedUser || loadedUser===null){
            dispatch(MENU_OPEN("/user/"+id));
            try {
                 fetchUserByUsername(id).then((response)=>{
                   //console.log(response);
                    setLoadedUser(response.user) 
                    fetchEdusourceByPromoter(response.user._id).then ((result)=>{
                        setEdusources(result.result);
                    }).catch(error=>{
                        console.log(error);
                        setError(error);
                    })
                    
                }).catch(error=>{
                    console.log(error);
                    setError(error);
                })
                
            } catch (error) {
                setError(error);
            }
        }
                

    },[loadedUser, id, dispatch])

    useEffect(() => {

        function handleResize() {
            setNewWidth(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        }


    window.addEventListener('resize', handleResize)

    })

    const navigation = (payload) =>{
        console.log(payload)
        window.open(payload);
    }

    if(loadedUser && loadedUser!==null){
    return(
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {/* CLASS CONTAINER */}

                <Container sx={{
                        mt:2, 
                        mr:10,
                        ml:1, 
                        backgroundColor:loadedUser.primaryColor?loadedUser.primaryColor:theme.color.primaryColor,
                        color:loadedUser.secondaryColor?loadedUser.secondaryColor:theme.color.secondaryColor,
                        borderRadius: 5,
                        textAlign: "left",
                        boxShadow:"0, 10px, 20x, -10px, rgba(0,0,0,.75)",
                        width: newWidth - 20,

                    }} 
                    >
                         {loadedUser.username === user.username?<>
                            <Fab size="small" aria-label="edit-heading-picture" 
                                sx={{
                                    position:"absolute",
                                    top:"90px",
                                    left: newWidth>1200?1200 - 40+"px":newWidth-60+"px"
                                    
                                }}>
                                <EditIcon />
                            </Fab>
                        </>:<></>}
                        {loadedUser.username === user.username?<>
                            <Fab size="small" aria-label="edit-portrait-picture" 
                                sx={{
                                    position:"absolute",
                                    top:newWidth<500?230:380,
                                    left: 120
                                    
                                }}>
                                <EditIcon />
                            </Fab>
                        </>:<></>}
                  
                        {/* CLASS COVER-PHOTO*/}

                        <Container sx={{
                            // background : "url(https:/images.unsplash.com/photo-1540228232483-1b64a7024923?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80)",
                            background: "url("+ loadedUser.pictureHeader.fileName + ")",
                            height: newWidth<500?150:280,
                            borderRadius:"5px 5px 0 0"
                        }}>
                            
                            
                            <Image alt='user' src={loadedUser.picture.fileName?loadedUser.picture.fileName:"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} height={100} width={125} duration={0} 
                            style={{
                               
                                borderRadius:"50%",
                                border: "3px solid #1f1a32",
                                marginTop: newWidth<500?200:450,
                                marginLeft: 50,

                            }}
                            />
                            
                        </Container>
                  
                    <Typography sx={{
                        fontSize: 25,
                        fontWeight: "bold",
                        
                        mt: newWidth<500?7:2,
                        ml: newWidth<500?4:30,
                    }}>
                        {loadedUser.publicData.name?loadedUser.firstname + " " + loadedUser.lastname:loadedUser.username}
                            {loadedUser.username === user.username?<>
                            <IconButton onClick={handleNameOpen} size="small" aria-label="edit-name-and-username" 
                                sx={{
                                    backgroundColor: loadedUser.primaryColor,
                                    color: loadedUser.secondaryColor,
                                    
                                }}>
                                <EditIcon />
                            </IconButton>
                            </>:<></>}
                    </Typography>
                            
                    <Typography variant='body2' sx={{
                        
                        mt: newWidth<500?-1:-1,
                        ml: newWidth<500?4:30,


                    }}>
                        {!loadedUser.publicData.name?<></>:loadedUser.username}
                        
                    </Typography>
                    
                    <Typography variant='h4' sx={{
                       mt: 2,
                       ml: 4
                    }}>
                        {loadedUser.job.position} at {loadedUser.job.workplace}
                        {loadedUser.username === user.username?<>
                        <IconButton onClick={handleDescriptionOpen}  size="small" aria-label="edit-name-and-username" 
                                sx={{
                                    backgroundColor: loadedUser.primaryColor,
                                    color: loadedUser.secondaryColor,
                                    
                                }}>
                                <EditIcon />
                            </IconButton>
                            </>:<></>}
                    </Typography>
                    <Grid container sx={{ml:4, mt:2}} alignItems="center">

                        <Typography variant='body2'> Karma:  </Typography>
                        <Chip variant="outlined"label= {loadedUser.karma}
                            sx={{
                                color:loadedUser.secondaryColor,
                                borderColor: loadedUser.secondaryColor,
                                mx:1,
                        }} />  
                        <Typography variant='body2' >  Level : </Typography>
                        <Chip variant="outlined"label= {loadedUser.editingLevel}
                            sx={{
                                color:loadedUser.secondaryColor,
                                borderColor: loadedUser.secondaryColor,
                                mx:1,
                        }} /> 
                   </Grid>
                    
                    <Button startIcon={<SendIcon />} variant='contained' sx={{
                        backgroundColor:loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                        borderRadius:"20px",
                        m:4,
                        '&:hover': {
                            backgroundColor: loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                            borderColor: loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd", 
                            color: loadedUser.primaryColor?loadedUser.primaryColor:"#231e39", 
                        },
                    }}>
                        Send Message
                    </Button>
                    <Button  variant='outlined' sx={{
                        borderColor:loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                        color:loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                        borderRadius:"20px",
                        ml:0,
                        '&:hover': {
                            backgroundColor: loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                            borderColor: loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd", 
                            color: loadedUser.primaryColor?loadedUser.primaryColor:"#231e39", 
                        },
                    }}>
                        More...
                    </Button>
                    
                </Container>

                 {/* ABOUT ME */}


                <Container sx={{
                        mt:0.5, 
                        mr:10,
                        ml:1, 
                        backgroundColor:loadedUser.primaryColor?loadedUser.primaryColor:theme.color.primaryColor,
                        color:loadedUser.secondaryColor?loadedUser.secondaryColor:theme.color.secondaryColor,
                        borderRadius: 5,
                        textAlign: "left",
                        boxShadow:"0, 10px, 20x, -10px, rgba(0,0,0,.75)",
                        width: newWidth - 20,
                        p:2

                        }} 
                    >
                        <Typography variant='h4' sx={{
                            ml: 2
                            }}>
                                About me:
                                {loadedUser.username === user.username?<>
                                <IconButton onClick={handleAboutOpen} size="small" aria-label="edit-name-and-username" 
                                sx={{
                                    backgroundColor: loadedUser.primaryColor,
                                    color: loadedUser.secondaryColor,
                                    
                                }}>
                                <EditIcon />
                            </IconButton>
                            </>:<></>}
                        </Typography>

                        {/* TAG LINE */}
                        {loadedUser.tagline && loadedUser.tagline!==null?
                        <>
                        <Typography variant='body1' sx={{mt:1, mx:2}}>
                            {loadedUser.tagline}
                        </Typography>
                        </>:<></>}

                        {/* SOCIAL */}

                        <SocialRow user={loadedUser} type="own" sx={{ml:1}}/>

                </Container>
  

                {/* VALORATIONS*/}
                
                <Container sx={{
                        mt:0.5, 
                        mr:10,
                        ml:1, 
                        backgroundColor:loadedUser.primaryColor?loadedUser.primaryColor:theme.color.primaryColor,
                        color:loadedUser.secondaryColor?loadedUser.secondaryColor:theme.color.secondaryColor,
                        borderRadius: 5,
                        textAlign: "left",
                        boxShadow:"0, 10px, 20x, -10px, rgba(0,0,0,.75)",
                        width: newWidth - 20,
                        p:2

                        }} 
                    >
                  <Typography variant='h4' sx={{
                       
                       ml: 2
                    }}>
                        Valorations {valOpen?
                            <IconButton onClick={handleValButtonClick} style={{ color: loadedUser.secondaryColor}}><ArrowDropDownIcon /></IconButton>:
                            <IconButton onClick={handleValButtonClick} style={{ color: loadedUser.secondaryColor}}><ArrowDropUpIcon /></IconButton>
                            }
                 </Typography> 

                {valOpen?<> 

                    {loadedUser.valorations && loadedUser.valorations.length >0?
                    <>
                        {loadedUser.valorations.map((val, index)=>{
                            return(
                            <React.Fragment key={index}>
                                <Valoration valoration={val} primaryColor={loadedUser.primaryColor} secondaryColor={loadedUser.secondaryColor}/>
                            </React.Fragment>
                            )
                        })}
                    
                    
                    </>:<></>}
                    

                    <Button  variant='outlined' sx={{
                            borderColor:loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                            color:loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                            borderRadius:"20px",
                            ml:2,
                            mt:2,
                            '&:hover': {
                                backgroundColor: loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd",
                                borderColor: loadedUser.secondaryColor?loadedUser.secondaryColor:"#b3b8cd", 
                                color: loadedUser.primaryColor?loadedUser.primaryColor:"#231e39", 
                            },
                        }}>
                            Add User Valoration...
                    </Button>
                    </>:<></>}
                 
                 
                </Container>   

                

                 {/* ACTIVITY */}
                 <Container sx={{
                        mt:0.5, 
                        mr:10,
                        ml:1, 
                        backgroundColor:loadedUser.primaryColor?loadedUser.primaryColor:theme.color.primaryColor,
                        color:loadedUser.secondaryColor?loadedUser.secondaryColor:theme.color.secondaryColor,
                        borderRadius: 5,
                        textAlign: "left",
                        boxShadow:"0, 10px, 20x, -10px, rgba(0,0,0,.75)",
                        width: newWidth - 20,
                        p:2

                        }} 
                    >
                  <Typography variant='h4' sx={{
                       
                       ml: 2
                    }}>
                        Contributions {activityOpen?
                        <IconButton onClick={handleActivityButtonClick} style={{ color: loadedUser.secondaryColor}}><ArrowDropDownIcon /></IconButton>:
                        <IconButton onClick={handleActivityButtonClick} style={{ color: loadedUser.secondaryColor}}><ArrowDropUpIcon /></IconButton>
                        }
                 </Typography>

                {activityOpen?
                <>
                    {edusources && edusources!==null?
                    <>
                    {edusources.length===0?
                        <>
                        <Typography variant='body1' sx={{ml:2, mt:1}}>
                        {loadedUser.username} still has no contributions
                        </Typography>
                        </>:
                        <></>}
                    {edusources.map((edu, index)=>{
                        if (edusources.length>0){
                        return(
                            <React.Fragment key={index}>
                                <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                mt={1}
                                >
                                    <Grid item m={1} xs={2} sm={2} md={2}>
                                    <a href={"/edusource/"+edu.resourceURL}><Image src={edu.picture.fileName} height={85} width={150} duration={0} sx={{borderRadius:5}} /></a>
                                    </Grid>
                                    <Grid item m={1}xs={12} sm={9} md={9.5} >
                                        <Typography sx={{
                                            fontSize: 15,
                                            fontWeight: "bold",
                                        }}
                                        >{edu.title}</Typography>
                                        <Typography variant='body2'><i>{longDate(edu.date)}</i></Typography>
                                        <Typography sx={{fontSize:11}}>
                                            {edu.autors.map((autor, index)=>{
                                                return(
                                                    <React.Fragment key={index}>
                                                        #{autor.autorName},
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Typography>
                                        <Typography variant='body2' sx={{mt:1}}>{edu.description}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{mt:1, border:"1px solid " + loadedUser.secondaryColor}}/>
                            </React.Fragment>
                        )
                        }
                        else{
                            return(
                            <>
                                RETURN EXTRAÑO
                            </>
                            )
                        }
                    })}
                    </>:<>
                    {loadedUser.username} still has no contributions;
                    </>}
                </>:<></>}
                 
                </Container>

                {/* DIALOGS */} 

                <Dialog open={openNameDialog} onClose={handleNameClose}>
                    <DialogTitle>Edit name</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        NOTE: If you change your user name, your main page url will change as well.
                    </DialogContentText>
                    <NameForm user={loadedUser} handleNameClose={handleNameClose}  />
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>

                <Dialog open={openAboutMeDialog} onClose={handleAboutClose}>
                    <DialogTitle>Edit about me</DialogTitle>
                    <DialogContent>
                    <AboutForm user={loadedUser} handleAboutClose={handleAboutClose}  />
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDescriptionDialog} onClose={handleDescriptionClose}>
                    <DialogTitle>Edit description</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                       Enter your position and workplace
                    </DialogContentText>
                    <DescriptionForm user={loadedUser} handleDescriptionClose={handleDescriptionClose}  />
                    </DialogContent>
                    <DialogActions>
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
    }
    else return (<Loader />)
}

