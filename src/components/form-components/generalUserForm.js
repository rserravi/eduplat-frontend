import * as React from 'react';
import { useSelector } from 'react-redux';
import { ButtonGroup, Paper, Typography } from "@mui/material";
import { useFormik } from 'formik';
import {TextField} from '@mui/material';
import {Grid} from '@mui/material';
import { AddressForm } from './address-comp';
import { SocialForm } from './social-comp';
import { PhoneForm } from './phone-comp';
import { EmailForm } from './email-comp';
import { ImageComponent } from './image-comp';
import {Card} from '@mui/material';
import {IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState} from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BrowserView, MobileView } from 'react-device-detect';

  
export const GeneralUserForm = (props)=> {
    const updateUser = props.updateUser;
    const storedUser = useSelector(state => state.user)
    const [user, setUser] = useState(JSON.parse(JSON.stringify(storedUser)));

    const formik = useFormik({
        initialValues: {
          username: user.username,
          picture: user.picture.fileName,
          firstname: user.firstname,
          lastname: user.lastname,
          emails: user.emails,
          address: user.address,
          phones: user.phones,
          social: user.social,
          birthdate: user.birthdate,
        },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });


    const handleUsernameChange = (event)=>{
        event.preventDefault();
        setUser({...user, "username": event.target.value})
    }

    const handleFirstnameChange = (event)=>{
        event.preventDefault();
        setUser({...user, "firstname": event.target.value})
    }

    const handleLastnameChange = (event)=>{
        event.preventDefault();
        setUser({...user, "lastname": event.target.value})
    }

    const handleBirthdateChange = (event)=>{
        //event.preventDefault();
        console.log(event._d)
        setUser({...user, "birthdate": event.format()})
    }

    const handleAddSocial = (event)=>{
        event.preventDefault();
        const oldSocial = user.social;
        const newSocial = {
            media :"",
            user:""
        }
        oldSocial.push(newSocial);
        setUser({...user, "social":oldSocial})
    }

    const handleDeleteSocial = (event) => {
        event.preventDefault();
        const oldSocial = user.social;
        oldSocial.pop();
        setUser({...user, "social": oldSocial});
        

    }
    const updateSocial = (props) =>{
    
        const oldSocial = user.social;
        oldSocial[props.index] = props.data;
        setUser({...user, "social":oldSocial})
        console.log("UPDATE SOCIAL");
        
    }

    const handleAddPhone = (event)=>{
        event.preventDefault();
        const oldPhones = user.phones;
        const newPhones = {
            phoneNumber :"",
            phoneDescription:""
        }
        oldPhones.push(newPhones);
        setUser({...user, "phones":oldPhones})
    }

    const handleDeletePhone = (event) => {
        event.preventDefault();
        const oldPhones = user.phones;
        oldPhones.pop();
        setUser({...user, "phones":oldPhones})
        

    }
    const updatePhones = (props) =>{
        const oldPhones = user.phones;
        oldPhones[props.index] = props.data;
        setUser({...user, "phones":oldPhones})
        console.log("UPDATE PHONES");
    }

    const handleAddEmail = (event)=>{
        event.preventDefault();
        const oldEmails = user.emails;
        const newEmails = {
            emailUrl :"",
            emailDescription:""
        }
        oldEmails.push(newEmails);
        setUser({...user, "email":oldEmails})
    }

    const handleDeleteEmail = (event) => {
        event.preventDefault();
        const oldEmails = user.emails;
        oldEmails.pop();
        setUser({...user, "email":oldEmails})
        

    }
    const updateEmails = (props) =>{
        const oldEmails = user.emails;
        oldEmails[props.index] = props.data;
        setUser({...user, "email":oldEmails})
        console.log("UPDATEEMAILS");
    }

    const updateImage = (props) =>{
        console.log("UPDATING IMAGE",props);
    }

    const updateAddress = (props) =>{
        const oldAd = user.address;
        oldAd[0] = props.data;
        setUser({...user, "address":oldAd})
       
    }

    useEffect(() =>{
       
        console.log("EN USE EFFECT DE GENERAL USER FORM")
        updateUser(user);
       
        
    },[user, updateUser])
        
    return (
        <React.Fragment>
            <Typography variant="h3" color="text.secondary" align="center" sx={{mb:2}} {...props}>
                Main Data
            </Typography>
            
                <Grid 
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={1} sm={1}>
                        <ImageComponent data={user.picture.fileName} updateParent={updateImage}/>
                    </Grid>
                    <Grid item xs={11} sm={2}>
                        <TextField
                            fullWidth
                            variant='standard'
                            id="username"
                            name="username"
                            label="User Name"
                            value={user.username}
                            onChange={handleUsernameChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            fullWidth
                            required
                            variant='standard'
                            id="firstname"
                            name="firstname"
                            label="First Name"
                            value={user.firstname}
                            onChange={handleFirstnameChange}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            required
                            variant='standard'
                            id="lastname"
                            name="lastname"
                            label="Last Name"
                            value={user.lastname}
                            onChange={handleLastnameChange}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <BrowserView>
                                <DesktopDatePicker
                                    label="Birthdate"
                                    inputFormat="DD/MM/YYYY"
                                    value={user.birthdate}
                                    onChange={handleBirthdateChange}
                                    renderInput={(params) => <TextField variant='standard' {...params} />}
                                />
                            </BrowserView>
                            <MobileView>
                                <MobileDatePicker
                                    label="Date mobile"
                                    inputFormat="DD/MM/YYYY"
                                    value={user.birthdate}
                                    onChange={handleBirthdateChange}
                                    renderInput={(params) => <TextField variant='standard' {...params} />}
                                    />
                            </MobileView>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" component="h3" color="text.secondary" >Phones</Typography>
                        <Paper sx={{ display: 'flex',  width: '100%', flexWrap: 'wrap' }}>
                            {formik.values.phones.map((phonesInx, index)=>{
                                return(
                                    <Grid item xs={12} sm={3.8}>
                                    <Card sx={{ display: 'flex',  width: '100%',m:0.3 }}>
                                        <PhoneForm data={phonesInx} frmIndex={index} updateParent = {updatePhones} />
                                    </Card>
                                </Grid> 
                                )
                            })}
                            <ButtonGroup orientation='vertical'>
                                <IconButton aria-label="delete"  color="primary" onClick={handleDeletePhone}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                                <IconButton aria-label="add" color="secondary" onClick={handleAddPhone}>
                                    <AddIcon />
                                </IconButton>
                            </ButtonGroup>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" component="h3" color="text.secondary" >Emails</Typography>
                        <Paper sx={{ display: 'flex',  width: '100%', flexWrap: 'wrap' }}>
                            {formik.values.emails.map((emailsInx, index)=>{
                                return(
                                    <Grid item xs={12} sm={3.8}>
                                    <Card sx={{ display: 'flex',  width: '100%', m:0.3 }} >
                                        <EmailForm data={emailsInx} frmIndex={index} updateParent = {updateEmails} />
                                    </Card>
                                </Grid> 
                                )
                            })}
                            <ButtonGroup orientation='vertical'>
                                <IconButton aria-label="delete"  color="primary" onClick={handleDeleteEmail}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                                <IconButton aria-label="add" color="secondary" onClick={handleAddEmail}>
                                    <AddIcon />
                                </IconButton>
                            </ButtonGroup>
                        </Paper>
                    </Grid>
                   
                    <Grid item xs={12} sm={12}>
                    <Typography variant="h4" component="h3" color="text.secondary" >Address</Typography>
                        <AddressForm data={user.address} updateParent={updateAddress}/>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4" component="h3" color="text.secondary" >Social</Typography>
                        <Paper sx={{ display: 'flex',  width: '100%', flexWrap: 'wrap' }}>
                            {formik.values.social.map((socialInx, index)=>{
                                return(
                                    <Grid item xs={12} sm={3.8}>
                                    <Card sx={{ display: 'flex',  width: '100%', m:0.3  }}>
                                        <SocialForm data={socialInx} frmIndex={index} updateParent = {updateSocial} />
                                    </Card>
                                </Grid> 
                                )
                            })}
                            <ButtonGroup orientation='vertical'>
                                <IconButton aria-label="delete"  color="primary" onClick={handleDeleteSocial}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                                <IconButton aria-label="add" color="secondary" onClick={handleAddSocial}>
                                    <AddIcon />
                                </IconButton>
                            </ButtonGroup>
                        </Paper>
                    </Grid>
                </Grid>
               

            
        </React.Fragment>
    );
  }
  