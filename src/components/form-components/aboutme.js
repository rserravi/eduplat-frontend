import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, ListItemIcon, MenuItem, Typography } from '@mui/material';
import { userUpdate } from 'src/api/userApi';
import { socialNetworks } from 'src/utils/social-networks-utils';
import { phoneTypes } from 'src/utils/phoneTypes';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export const AboutForm = (props) =>{
    const {handleAboutClose} = props;
  
    const CHARACTER_LIMIT = 340;
    const [edited, setEdited] = React.useState(false);
    const [loadedUser, setLoadedUser] = React.useState(props.user);

    const handleAcceptClick = async (event)=>{
        event.preventDefault();
        if (edited){
            const frmData = {
                "_id": loadedUser._id,
                "tagline": loadedUser.tagline,
                "social": loadedUser.social,
                "phones": loadedUser.phones,
                "publicData": loadedUser.publicData
            }
            await userUpdate(frmData).then((result)=>{
                console.log("RESULTADO OBTENIDO", result)
                if (result.status==="success"){
                    handleAboutClose("success", "About you has been udpated");
                }
                
            }).catch((error)=>{
                console.log(error);
                handleAboutClose("error", "Something has failed");
            })
        }
        handleAboutClose();
    }

    const taglineChange = (event) =>{
        setEdited(true);
        setLoadedUser({...loadedUser, "tagline": event.target.value})
    }

    // SOCIAL FUNCTIONS

    const handleAddSocial = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldSocial = loadedUser.social;
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
        const oldSocial = loadedUser.social;
        oldSocial.pop();
        setLoadedUser({...loadedUser, "social": oldSocial}); 
    }

    const handleChangeSocialMedia = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldSocial = loadedUser.social;
        oldSocial[index].media = event.target.value;
        setLoadedUser({...loadedUser, "social": oldSocial});       
    }

    const handleChangeSocialUser = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldSocial = loadedUser.social;
        oldSocial[index].user = event.target.value;
        console.log(event.target.value);
        setLoadedUser({...loadedUser, "social": oldSocial}); 
    }

    // PHONES FUNCTIONS

    const handleAddPhone = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPhones = loadedUser.phones;
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
        const oldPhones = loadedUser.phones;
        oldPhones.pop();
        setLoadedUser({...loadedUser, "phones": oldPhones}); 
    }

    const handleChangePhoneNumber = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldPhones = loadedUser.phones;
        oldPhones[index].phoneNumber = event.target.value;
        setLoadedUser({...loadedUser, "phones": oldPhones});       
    }

    const handleChangePhoneDescription = (event, index)=>{
        event.preventDefault();
        setEdited(true);
        const oldPhones = loadedUser.phones;
        oldPhones[index].phoneDescription = event.target.value;
        console.log(event.target.value);
        setLoadedUser({...loadedUser, "phones": oldPhones}); 
    }

    const handlePhoneCheckbox = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = loadedUser.publicData;
        oldPublicData.phones = !event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    /////////////////////////////////////////////////////////////////////////////////
    /////                                                                       /////
    /////                              RETURN                                   /////
    /////                                                                       /////
    /////////////////////////////////////////////////////////////////////////////////

    return (
        <>
        <Grid 
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{mt:2}}
            >
            <Grid item xs={12} sx={{mb:2}}>
                <TextField 
                    onChange={taglineChange} 
                    sx={{width:290}} 
                    variant="standard" 
                    label="About me" 
                    defaultValue={loadedUser.tagline}
                    multiline
                    rows={9}
                    inputProps={{
                        maxLength: CHARACTER_LIMIT
                      }}
                    helperText={`${loadedUser.tagline.length}/${CHARACTER_LIMIT}`}
                />
            </Grid>

            {/* SOCIAL NETWORKDS */}

            <Typography variant='h4'>Social networks</Typography>
            {loadedUser.social.map((snet, index)=>{
                return(
                    
                <React.Fragment key={index}>
                    <Grid container direction="row" sx={{mt:1}}>
                        <Grid item xs={4}>
                            <TextField
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
                        <Grid item xs={6} sx={{ml:2}}>
                            <TextField
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
                        <Grid item xs={1}>
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

            {/* PHONES */}
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Typography variant='h4'>Phones</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox sx={{ml:7}} onChange={handlePhoneCheckbox} checked={!loadedUser.publicData.phones} />} label="Keep private?" />
                </FormGroup>                
            </Grid>
            {loadedUser.phones.map((snet, index)=>{
                return(
                    
                <React.Fragment key={index}>
                    <Grid container direction="row" sx={{mt:1}}>
                        <Grid item xs={4}>
                            <TextField
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
                        <Grid item xs={6} sx={{ml:2}}>
                            <TextField
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

        {/* BUTTONS */}

        <Grid 
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{mt:2}}
            >
                <Grid item sx={{mr:2}}>
                <Button onClick={handleAcceptClick} variant='contained' sx={{borderRadius:"20px"}}>Accept</Button>
                </Grid>

                <Grid item>
                    <Button onClick={handleAboutClose} variant='contained' sx={{borderRadius:"20px"}}>Cancel</Button>
                </Grid>
        
        </Grid> 
        
       
        </>
    )
}