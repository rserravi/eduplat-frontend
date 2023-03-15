import { Box,  Button,  Chip,  CssBaseline, Divider, Grid, IconButton, Link, SvgIcon, Typography } from '@mui/material';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEdusourceByLink, fetchEdusourceByPromoter } from 'src/api/edusourceApi';
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { fetchUserbyId, fetchUserByUsername } from 'src/api/userApi';
import Container from '@mui/material/Container';
import { findSocialIcon, getUserProfile } from 'src/utils/social-networks-utils';
import { useDispatch } from 'react-redux';
import { MENU_OPEN } from 'src/store/menuSlice';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import {Image} from 'mui-image';
import { longDate } from 'src/utils/dateUtils';

const theme = createTheme(themeOptions);
var newMaxWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


export const UserPage = () =>{


    const {id} = useParams();
    const dispatch = useDispatch();
    const [loadedUser, setLoadedUser] = useState();
    const [edusources, setEdusources] = useState();
    const [newWidth, setNewWidth] = useState(newMaxWidth);
     // eslint-disable-next-line
    const [error, setError] = useState("");

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
                    </Typography>

                    <Typography variant='body2' sx={{
                       mt: 2,
                       ml: 4
                    }}>
                        Karma: <Chip variant="outlined"label= {loadedUser.karma}
                            sx={{
                                color:loadedUser.secondaryColor,
                                borderColor: loadedUser.secondaryColor,
                                mx:1,
                        }}
                        />  Level : <Chip variant="outlined"label= {loadedUser.editingLevel}
                        sx={{
                            color:loadedUser.secondaryColor,
                            borderColor: loadedUser.secondaryColor,
                            mx:1,
                    }}
                    /> 
                    </Typography>
                    
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
                                
                        </Typography>

                        {/* TAG LINE */}
                        {loadedUser.tagline && loadedUser.tagline!==null?
                        <>
                        <Typography variant='body1' sx={{mt:1, mx:2}}>
                            {loadedUser.tagline}
                        </Typography>
                        </>:<></>}

                        {/* SOCIAL */}

                        <Box sx={{ display: 'inline-flex', ml:1 }}>
                        {loadedUser.social.map((snet, index)=>{
                            return(
                            <React.Fragment key={index}>
                                
                                <IconButton 
                                    size='small'
                                    onClick={(e)=>{e.preventDefault(); {navigation(getUserProfile(snet.media,snet.user))}}}
                                    sx={{color:loadedUser.secondaryColor}}
                                    >
                                    {findSocialIcon(snet.media)}
                                </IconButton>
                               
                            </React.Fragment>
                            )
                        })}
                        
                        {/* EMAILS */}

                        {loadedUser.publicData.emails?
                        <>
                            {loadedUser.emails.map((email, index)=>{
                                return(
                                 <React.Fragment key={index}>
                                
                                 <IconButton 
                                     size='small'
                                     onClick={(e)=>{e.preventDefault(); {navigation("mailto:"+email.emailUrl)}}}
                                     sx={{color:loadedUser.secondaryColor}}
                                     >
                                     <EmailIcon />
                                 </IconButton>
                                
                             </React.Fragment>
                                )
                            })}
                        </>:<></>}

                        {loadedUser.publicData.phones?
                        <>
                            {loadedUser.phones.map((phone, index)=>{
                                return(
                                 <React.Fragment key={index}>
                                
                                 <IconButton 
                                     size='small'
                                     onClick={(e)=>{e.preventDefault(); {navigation("tel:"+phone.phoneNumber)}}}
                                     sx={{color:loadedUser.secondaryColor}}
                                     >
                                     <PhoneForwardedIcon />
                                 </IconButton>
                                
                             </React.Fragment>
                                )
                            })}
                        </>:<></>}
                        
                        </Box>

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
                        Valorations
                 </Typography> 
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
                 {loadedUser.valorations.map((item)=>{
                    return(
                        <Typography ml={2} variant='body2'>
                            {item.senderName}
                        </Typography>
                    )
                 })}
                 
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
                        Contributions
                 </Typography>
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
                    console.log(edusources.length)
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
                        <>
                        
                        </>
                    }
                 })}
                </>:<>
                {loadedUser.username} still has no contributions;
                </>}
                 
                 
                </Container>   
            </ThemeProvider>
        </React.Fragment>
    )
    }
    else return (<Loader />)
}

