import { Grid, Button, ButtonGroup, Typography, TextField, FormControlLabel, Checkbox, FormGroup, Alert, ListItemIcon, MenuItem, IconButton, InputAdornment, Snackbar, Fab, Box } from '@mui/material';
import * as React from 'react'
import i18next from 'i18next';
import {  useState } from 'react';
import { Image } from 'mui-image';
import { getHeadShot } from 'src/utils/picUtils';
import { useOutletContext } from 'react-router-dom';
import Loader from 'src/ui-component/Loader';
import { socialNetworks } from 'src/utils/social-networks-utils';
import { phoneTypes } from 'src/utils/phoneTypes';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import _ from 'lodash';
import { userUpdate } from 'src/api/userApi';
import { PictureDialog } from 'src/components/form-components/image-comp';
import EditIcon from '@mui/icons-material/Edit';


export const MyAccountData = (props) =>{
    const {user} = props;
    const [loadedUser, setLoadedUser] = useState(user);
    const [newWidth] = useOutletContext();
    const [openSnack, setOpenSnack] = useState(false);
    const [edited, setEdited] = useState(false);
    const [openProfilePicDialog, setOpenProfilePicDialog]= useState(false);
    const CHARACTER_LIMIT = 340;

    //SNACK
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    // NAME, JOB AND TAGLINE FUNCTIONS
    
    const firstnameChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        setLoadedUser({...loadedUser, "firstname":event.target.value});

    }
    const lastnameChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        setLoadedUser({...loadedUser, "lastname":event.target.value});
    }

    const namePrivateChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.name = !event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    const jobpositionChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        setLoadedUser({...loadedUser, "job.position":event.target.value});
    }

    const jobworkplaceChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        setLoadedUser({...loadedUser, "job.workplace":event.target.value});
    }
     
    const taglineChange = (event) =>{
        event.preventDefault();
        setEdited(true);
        setLoadedUser({...loadedUser, "tagline":event.target.value});
    }

    const handleProfilePicClose = (status, message) => {
        if (status && message){
            //console.log(status, message);
            setSeverity(status);
            setMessage(message);
            setOpenSnack(true);
            setLoadedUser(null);
        }
        setOpenProfilePicDialog(false);
        window.location.reload()

    };

     // SOCIAL FUNCTIONS

     const handleAddSocial = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldSocial = _.cloneDeep(loadedUser.social)
        const newSocial = {
            media :"",
            user:""
        }
        oldSocial.push(newSocial);
        setLoadedUser({...loadedUser, "social":oldSocial})
    }

    const handleDeleteSocial = (event) => {
        event.preventDefault();
        setEdited(true);
        const oldSocial = _.cloneDeep(loadedUser.social);
        oldSocial.pop();
        setLoadedUser({...loadedUser, "social": oldSocial}); 
    }

    const handleChangeSocialMedia = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldSocial = _.cloneDeep(loadedUser.social)
        oldSocial[index].media = event.target.value;
        setLoadedUser({...loadedUser, "social": oldSocial});       
    }

    const handleChangeSocialUser = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldSocial = _.cloneDeep( loadedUser.social ) 
        console.log(oldSocial);
        oldSocial[index].user = event.target.value;
        console.log(event.target.value);
        setLoadedUser({...loadedUser, "social": oldSocial}); 
    }

    // PHONES FUNCTIONS

    const handleAddPhone = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPhones = _.cloneDeep(loadedUser.phones)
        const newPhones = {
            phoneNumber :"",
            phoneDescription:""
        }
        oldPhones.push(newPhones);
        setLoadedUser({...loadedUser, "phones":oldPhones})
    }

    const handleDeletePhone = (event) => {
        event.preventDefault();
        setEdited(true);
        const oldPhones = _.cloneDeep(loadedUser.phones);
        oldPhones.pop();
        setLoadedUser({...loadedUser, "phones": oldPhones}); 
    }

    const handleChangePhoneNumber = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldPhones = _.cloneDeep(loadedUser.phones)
        oldPhones[index].phoneNumber = event.target.value;
        setLoadedUser({...loadedUser, "phones": oldPhones});       
    }

    const handleChangePhoneDescription = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldPhones = _.cloneDeep(loadedUser.phones);
        oldPhones[index].phoneDescription = event.target.value;
        console.log(event.target.value);
        setLoadedUser({...loadedUser, "phones": oldPhones}); 
    }

    const handlePhoneCheckbox = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.phones = !event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    // PHONES FUNCTIONS

    const handleAddEmail = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldMails = _.cloneDeep(loadedUser.emails)
        const newMail = {
            emailUrl :"",
            emailDescription:""
        }
        oldMails.push(newMail);
        setLoadedUser({...loadedUser, "emails":oldMails})
    }

    const handleDeleteEmail = (event) => {
        event.preventDefault();
        setEdited(true);
        const oldMails = _.cloneDeep(loadedUser.emails);
        oldMails.pop();
        setLoadedUser({...loadedUser, "emails": oldMails}); 
    }

    const handleChangeEmailUrl = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldMails = _.cloneDeep(loadedUser.emails)
        oldMails[index].emailUrl = event.target.value;
        setLoadedUser({...loadedUser, "emails": oldMails});       
    }

    const handleChangeEmailDescription = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldMails = _.cloneDeep(loadedUser.emails);
        oldMails[index].emailDescription = event.target.value;
        console.log(event.target.value);
        setLoadedUser({...loadedUser, "emails": oldMails}); 
    }

    const handleEmailCheckbox = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.emails = !event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    // BUTTON FUNCTIONS

    const handleSave = async (event)=>{
        console.log(loadedUser);
        event.preventDefault()
        await userUpdate(loadedUser).then((result)=>{
            console.log("RESULTADO OBTENIDO", result)
            if (result.status==="success"){
                setSeverity("success")
                setMessage(i18next.t("Your user has been udpated"));
                setOpenSnack(true)
                setEdited(false);

            }
            
        }).catch((error)=>{
            console.log(error);
            setSeverity("error")
            setMessage(i18next.t("Something has failed"));
            setOpenSnack(true)
        })
    }

    const handleCancel = (event)=>{
        setEdited(false);
        setLoadedUser(user);
        window.location.reload()
    }

    const handleProfilePicOpen = () => {
        setOpenProfilePicDialog(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

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
        <Grid container width={newWidth-32} >
            <Grid item xs={12}>
            <Alert sx={{mb:2}} severity={!edited?"info":"warning"}>{!edited?i18next.t("Without changes"):i18next.t("You need to save changes")}</Alert>            
            </Grid>
        </Grid>
        

        <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
            <Grid item xs={4} md={2}>
                    <Image alt='user' src={getHeadShot(loadedUser)} height={100} width={100} duration={0} 
                    style={{
                        borderRadius:"50%",
                        border: "3px solid #1f1a32",
                        marginLeft: 10,
                        '&:hover': {
                            cursor: "pointer"
                            }
                    }}
                    />
                </Grid>
                <Fab size="small" aria-label="edit-portrait-picture" 
                                onClick={handleProfilePicOpen}
                                sx={{
                                    position:"absolute",
                                    top:newWidth<500?350:280,
                                    left: newWidth<500?55:100,
                                    
                                }}>
                                <EditIcon />
                            </Fab>
            <Grid item xs={8}  md={10}>
            <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
                
                <Grid item xs={12} md={3}>
                <TextField
                    fullWidth
                    variant="standard"
                    id="username"
                    label={i18next.t("username")}
                    value={loadedUser.username}
                    
                />
                </Grid>
                <Grid item xs={12} md={3}>
                <TextField
                    fullWidth 
                    variant="standard"
                    id="firstname"
                    label={i18next.t("FirstName")}
                    defaultValue={loadedUser.firstname}
                    onChange={firstnameChange}
                />
                </Grid>
                <Grid item xs={12} md={4}>
                <TextField
                    fullWidth
                    variant="standard"
                    id="lastname"
                    label={i18next.t("LastName")}
                    defaultValue={loadedUser.lastname}
                    onChange={lastnameChange}
                />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={namePrivateChange} defaultValue={loadedUser.publicData.name} />} label={i18next.t("Private")} />
                </FormGroup>
                </Grid>
                
            </Grid>
            <Grid item mt={2}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    variant="standard"
                    id="jobposition"
                    label={i18next.t("Position")}
                    defaultValue= {loadedUser.job.position}
                    onChange={jobpositionChange}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    variant="standard"
                    id="jobworkplace"
                    label={i18next.t("Workplace")}
                    defaultValue= {loadedUser.job.workplace}
                    onChange={jobworkplaceChange}
                    />
                </Grid>
               
            </Grid>
            </Grid>
            </Grid>
        </Grid>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{mt:2}} width={newWidth-32} >
            <Grid item xs={12} sx={{mt:2}} >
            <TextField 
                    onChange={taglineChange} 
                    fullWidth
                    variant="standard" 
                    label={i18next.t("About me")}
                    defaultValue={loadedUser.tagline}
                    multiline
                    rows={newWidth<500?7:2}
                    inputProps={{
                        maxLength: CHARACTER_LIMIT
                      }}
                    helperText={`${loadedUser.tagline.length}/${CHARACTER_LIMIT}`}
                />
            </Grid>
          
        </Grid>

        {/* SOCIAL NETWORKDS */}

        <Grid container width={newWidth -32}>
           <Grid item xs={12} md={6} sx={{mt:2}} >
            <Typography variant='h4'>{i18next.t("Social networks")}</Typography>
                {loadedUser.social.map((snet, index)=>{
                    return(
                        
                    <React.Fragment key={index}>
                        <Grid container direction="row" sx={{mt:1}}>
                            <Grid item xs={4} md={2}>
                                <TextField
                                    fullWidth
                                    select
                                    variant="standard"
                                    defaultValue={snet.media}
                                    onChange={(e)=>{handleChangeSocialMedia(e,index)}}
                                >
                                        {socialNetworks.map((option) => (
                                        <MenuItem dense key={option.value} value={option.value}>
                                            <ListItemIcon sx={{my:-0.2, py:0}}>
                                                {option.icon}
                                                {option.value}
                                            </ListItemIcon>
                                        </MenuItem>  
                                        ))} 

                                </TextField>
                            </Grid>
                            <Grid item xs={6} md={4} sx={{ml:2}}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    onChange={(e)=>{handleChangeSocialUser(e,index)}}
                                    defaultValue={snet.user}
                                    margin="dense"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                                }}
                                >   

                                </TextField>
                            </Grid>
                            <Grid item xs={1} md={1}>
                            <IconButton aria-label="delete"  color="primary" onClick={handleDeleteSocial}>
                                <DeleteOutlineIcon />
                            </IconButton>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                    )
                })}
                <ButtonGroup orientation='vertical'>
                    <IconButton aria-label="add" color="secondary" onClick={handleAddSocial}>
                        <AddIcon />
                    </IconButton>
                </ButtonGroup>
           </Grid>
           <Grid item xs={12} md={6}>
            
            {/* PHONES */}

            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Typography variant='h4'>{i18next.t("Phones")}</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{ml:7}} onChange={handlePhoneCheckbox} checked={!loadedUser.publicData.phones} />} label={i18next.t("Keep private?")} />
                </FormGroup>                
            </Grid>
            {loadedUser.phones.map((snet, index)=>{
                return(
                    
                <React.Fragment key={index}>
                    <Grid container direction="row" sx={{mt:1}}>
                        <Grid item xs={4} md={2}>
                            <TextField
                                fullWidth
                                select
                                variant="standard"
                                defaultValue={snet.phoneDescription}
                                onChange={(e)=>{handleChangePhoneDescription(e,index)}}
                            >
                                    {phoneTypes.map((option) => (
                                    <MenuItem key={option.label} value={option.value}>
                                        <ListItemIcon>
                                            {option.label}
                                        </ListItemIcon>
                                    </MenuItem>
                                ))}  

                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={4} sx={{ml:2}}>
                            <TextField
                                fullWidth
                                variant="standard"
                                onChange={(e)=>{handleChangePhoneNumber(e,index)}}
                                defaultValue={snet.phoneNumber}
                                margin="dense"
                            >   

                            </TextField>
                        </Grid>
                        <Grid item xs={1}>
                        <IconButton aria-label="delete"  color="primary" onClick={handleDeletePhone}>
                            <DeleteOutlineIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                </React.Fragment>
                )
            })}
            <ButtonGroup orientation='vertical'>
                <IconButton aria-label="add" color="secondary" onClick={handleAddPhone}>
                    <AddIcon />
                </IconButton>
            </ButtonGroup>
           </Grid>


            {/* EMAILS */}
            <Grid item xs={12} md={6}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Typography variant='h4'>{i18next.t("Emails")}</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{ml:7}} onChange={handleEmailCheckbox} checked={!loadedUser.publicData.emails} />} label={i18next.t("Keep private?")} />
                </FormGroup>                
            </Grid>
            {loadedUser.emails.map((snet, index)=>{
                return(
                    
                <React.Fragment key={index}>
                    <Grid container direction="row" sx={{mt:1}}>
                        <Grid item xs={4} md={2}>
                            <TextField
                                fullWidth
                                select
                                variant="standard"
                                defaultValue={snet.emailDescription}
                                onChange={(e)=>{handleChangeEmailDescription(e,index)}}
                            >
                                    {phoneTypes.map((option) => (
                                    <MenuItem key={option.label} value={option.value}>
                                        <ListItemIcon>
                                            {option.label}
                                        </ListItemIcon>
                                    </MenuItem>
                                ))}  

                            </TextField>
                        </Grid>
                        <Grid item xs={6} md={4} sx={{ml:2}}>
                            <TextField
                                fullWidth
                                variant="standard"
                                onChange={(e)=>{handleChangeEmailUrl(e,index)}}
                                defaultValue={snet.emailUrl}
                                margin="dense"
                            >   

                            </TextField>
                        </Grid>
                        <Grid item xs={1}>
                        <IconButton aria-label="delete"  color="primary" onClick={handleDeleteEmail}>
                            <DeleteOutlineIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                </React.Fragment>
                )
            })}
            <ButtonGroup orientation='vertical'>
                <IconButton aria-label="add" color="secondary" onClick={handleAddEmail}>
                    <AddIcon />
                </IconButton>
            </ButtonGroup>
          
            </Grid>
            

        </Grid>
        <Grid container width={newWidth-32} >
            <Grid item xs={12}>
            <Alert sx={{mb:2}} severity={!edited?"info":"warning"}>{!edited?i18next.t("Without changes"):i18next.t("You need to save changes")}</Alert>            
            </Grid>            
        </Grid>

         {/* BUTTONS */}

         <Grid 
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{mt:2}}
            >
                <Grid item sx={{mr:2}}>
                    <Button disabled={!edited} onClick={handleSave} variant='contained' sx={{borderRadius:"20px"}}>{i18next.t("Accept")}</Button>
                </Grid>

                <Grid item>
                    <Button disabled={!edited} onClick={handleCancel} variant='contained' sx={{borderRadius:"20px"}}>{i18next.t("Cancel")}</Button>
                </Grid>
        
        </Grid> 

        {/* SNACKBAR */}

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>

        <PictureDialog
            user={user}
            open={openProfilePicDialog}
            onClose={handleProfilePicClose}
        />  
        
        
        
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