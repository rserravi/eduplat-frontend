import { Grid, Typography, Alert,  Snackbar,  Divider,  Badge, IconButton, Box } from '@mui/material';
import * as React from 'react'
import i18next from 'i18next';
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';
import Loader from 'src/ui-component/Loader';
import _ from 'lodash';
import { Valoration,ExtendedResourceValorations } from 'src/pages/myAccount/comp/valoration';
import { themeOptions } from 'src/theme/theme';
import { ValorationMeanIcon } from 'src/components/favorites';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { fetchValorationsSorted } from 'src/api/edusourceApi'


export const MyAccountValorations= (props) =>{
    const {user} = props;
    const [loadedUser, setLoadedUser] = useState(user);
    const [newWidth] = useOutletContext();
    const [openSnack, setOpenSnack] = useState(false);
   // const [edited, setEdited] = useState(false);
    const [valOpen, setValOpen]= useState(false);
    const [userValOpen, setUserValOpen] = useState(false);
    const [edusources, setEdusources] = useState();
    const [acceptedEduVals, setAcceptedEduVals]= useState();
    const [pendantEduVals, setPendantEduVals] = useState();

    //SNACK
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    //CHANGE FUNCT.
    
    const acceptedValorations = ()=>{
        var count = 0;
        for (let val = 0; val < loadedUser.valorations.length; val++) {
            if (loadedUser.valorations[val].accepted === true){
                count++;
            }
        }
        return count;
    }

    const handleValButtonClick = (event)=>{
        event.preventDefault();
        setValOpen(!valOpen);
    }

    const handleValUserButtonClick = (event)=>{
        event.preventDefault();
        setUserValOpen(!userValOpen);
    }

    
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

    
    useEffect(()=>{
        if (edusources===null || edusources ===undefined || edusources ===""){
            try {
                fetchValorationsSorted(user._id)
                .then((result)=>{
                    if (result.status==="success"){
                        //console.log(result);
                        setAcceptedEduVals(result.accepted);
                        setPendantEduVals(result.noAccepted);
                    }
    
                }).catch((err)=>{
                    console.error(err);
                })
            } catch (error) {
                console.error(error);
            }
           
        }
    },[])

    //console.log(loadedUser);
    if (loadedUser && loadedUser._id !=""){
    return (
        <>

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minWidth: {newWidth} -32,
                p:2
            }}
        > 
                
        {/* USER VAL */}

        <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
            <Grid item xs={12} md={12}>
            <Typography variant='h2' color="secondary">{i18next.t("User Valorations")}</Typography>
            </Grid>

            {loadedUser.alerts.user>0?<>
            <Grid item xs={12} md={12}>
                <Typography variant='body2' color="primary"><i>{i18next.t("UserValorationInstrucctions")}</i></Typography>
            </Grid>
            <Grid item xs={12} md={12}>
               <Badge anchorOrigin={{vertical: 'top', horizontal: 'right' }} badgeContent={loadedUser.alerts.user} color='secondary'><Typography variant='h4'>{i18next.t("User Valuations pending acceptance")}: </Typography></Badge>
            </Grid>
            </>:<></>}
                
            <Grid item xs={12}  md={12}>
                <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
       
                    <Grid item xs={12} md={12}>
                    {loadedUser.valorations && loadedUser.valorations.length >0?
                    <>
                        {loadedUser.valorations.map((val, index)=>{
                            return(
                            <React.Fragment key={index}>
                                <Valoration editing={true} acceptedMode={"noaccepted"} valoration={val} backgroundColor={themeOptions.palette.background.paper} textColor={themeOptions.palette.text.primary}/>
                            </React.Fragment>
                            )
                        })}
                    
                    
                    </>:<></>}
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography variant='h4'>
                        {i18next.t("User Valuations accepted")} {valOpen?
                            <IconButton onClick={handleValButtonClick} style={{ color: "secondary"}}><ArrowDropDownIcon /></IconButton>:
                            <IconButton onClick={handleValButtonClick} style={{ color: "secondary"}}><ArrowDropUpIcon /></IconButton>
                            }
                            {acceptedValorations()>0?<>
                            <ValorationMeanIcon valorations={loadedUser.valorations} /> {i18next.t("from")} {acceptedValorations()} {i18next.t("valorations")}
                            </>:<></>}
                 </Typography> 
            </Grid>
            {valOpen?<>
           < Grid item xs={12}  md={12}>
                <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
                    <Grid item xs={12} md={12}>
                    {loadedUser.valorations && loadedUser.valorations.length >0?
                    <>
                        {loadedUser.valorations.map((val, index)=>{
                            return(
                            <React.Fragment key={index}>
                                <Valoration editing={true} acceptedMode={"accepted"} valoration={val} backgroundColor={themeOptions.palette.background.paper} textColor={themeOptions.palette.text.primary}/>
                            </React.Fragment>
                            )
                        })} 
                    </>:<></>}
                    </Grid>
                    
                </Grid>
            </Grid>
            </>:<></>}

        </Grid>
        

        {/* RESOURCE VAL */}

        <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
            <Grid item xs={12} md={12}>
            <Typography variant='h2' color="secondary">{i18next.t("Resources Valorations")}</Typography>
            </Grid>
            {loadedUser.alerts.resource>0?<>
            <Grid item xs={12} md={12}>
                <Typography variant='body2' color="primary"><i>{i18next.t("ResourcesValorationInstrucctions")}</i></Typography>
            </Grid>
            {/* PENDING */}
           
            <Grid item xs={12} md={12}>
               <Badge anchorOrigin={{vertical: 'top', horizontal: 'right' }} badgeContent={loadedUser.alerts.resource} color='secondary'><Typography variant='h4'>{i18next.t("Resource Valuations pending acceptance")}: </Typography></Badge>
            </Grid>
            </>:<></>}
                
            <Grid item xs={12}  md={12}>
                <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
                    <Grid item xs={12} md={12}>
                    {pendantEduVals && pendantEduVals.length >0?
                    <>
                        {pendantEduVals.map((val, index)=>{
                            return(
                            <React.Fragment key={index}>
                                <ExtendedResourceValorations vals={val} />
                            </React.Fragment>
                            )
                        })}
                    
                    </>:<></>}
                    </Grid>
                    
                </Grid>
            </Grid>
            <Divider variant="middle" />      
            {/* ACCEPTED */}
            <Grid item xs={12} md={12} >
                <Typography variant='h4' mt={2}>
                        {i18next.t("Resource Valuations accepted")} {userValOpen?
                            <IconButton onClick={handleValUserButtonClick} style={{ color: "secondary"}}><ArrowDropDownIcon /></IconButton>:
                            <IconButton onClick={handleValUserButtonClick} style={{ color: "secondary"}}><ArrowDropUpIcon /></IconButton>
                            }
                            {acceptedEduVals && acceptedEduVals!==undefined && acceptedEduVals.length>0?<>
                            <ValorationMeanIcon valorations={acceptedEduVals} /> {i18next.t("from")} {acceptedEduVals.length} {i18next.t("valorations")}
                            </>:<></>}
                 </Typography> 
            </Grid>
         
            {userValOpen?<>
            <Grid item xs={12}  md={12}>
                <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
                    <Grid item xs={12} md={12}>
                    {acceptedEduVals && acceptedEduVals.length >0?
                    <>
                        {acceptedEduVals.map((val, index)=>{
                            return(
                            <React.Fragment key={index}>
                                <ExtendedResourceValorations vals={val} />
                                
                            </React.Fragment>
                            )
                        })}
                    
                    </>:<></>}
                    </Grid>
                    
                </Grid>
            </Grid>
            </>:<></>}
            

        </Grid>
        

       

        {/* SNACKBAR */}

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>  
        </Box>
        </>
    )
    }
    else {
        <>
            <Loader />
        </>
    }
}