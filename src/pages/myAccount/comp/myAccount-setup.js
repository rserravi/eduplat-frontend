import { Grid, Button, Typography, TextField, FormControlLabel, Checkbox, FormGroup, Alert,  MenuItem, Snackbar,  Divider, Box } from '@mui/material';
import * as React from 'react'
import i18next from 'i18next';
import {  useState } from 'react';

import { useOutletContext } from 'react-router-dom';
import Loader from 'src/ui-component/Loader';
import _ from 'lodash';
import { userUpdate } from 'src/api/userApi';
import { languagesCodes } from 'src/utils/countries';


export const MyAccountSetup = (props) =>{
    const {user} = props;
    const [loadedUser, setLoadedUser] = useState(user);
    const [newWidth] = useOutletContext();
    const [openSnack, setOpenSnack] = useState(false);
    const [edited, setEdited] = useState(false);

    //SNACK
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    //CHANGE FUNCT.
    

    const handleSelectLang = (event, code)=>{
        event.preventDefault();
        setEdited(true);
        setLoadedUser({...loadedUser, "language":code});
        i18next.changeLanguage(code.toLowerCase());
        //REFRESH LANGUAGE
        console.log("CODIGO", code)
      }
    

    const namePrivateChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.name = event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    const emailsPrivateChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.emails = event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    const socialPrivateChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.social = event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    const phonesPrivateChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.phones = event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    const lastLoginPrivateChange = (event)=>{
        event.preventDefault();
        setEdited(true);
        const oldPublicData = _.cloneDeep(loadedUser.publicData);
        oldPublicData.lastLogin = event.target.checked;
        setLoadedUser({...loadedUser, "publicData": oldPublicData}); 
    }

    
    // BUTTON FUNCTIONS

    const handleSave = async (event)=>{
        console.log(loadedUser);
        event.preventDefault()
        const frmData ={
            _id: loadedUser._id,
            
            publicData: loadedUser.publicData,
            language: loadedUser.language
        }
        await userUpdate(frmData).then((result)=>{
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

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

    //console.log(loadedUser);
    if (loadedUser && loadedUser._id !==""){
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

        {/* PRIVACITY */}

        <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
            <Grid item xs={12} md={12}>
            <Typography variant='h4'>{i18next.t("Privacity")}</Typography>
            </Grid>
                
            <Grid item xs={12}  md={12}>
            <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
                <Grid item xs={12} md={12}>
                    <Typography variant='body2' color="primary"><i>{i18next.t("privacityInstructions")}</i></Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={namePrivateChange}  checked={loadedUser.publicData.name} />} label={i18next.t("Name")} />
                        <FormControlLabel control={<Checkbox onChange={emailsPrivateChange}  checked={loadedUser.publicData.emails} />} label={i18next.t("Emails")} />
                        <FormControlLabel control={<Checkbox onChange={socialPrivateChange}  checked={loadedUser.publicData.social} />} label={i18next.t("Social")} />
                        <FormControlLabel control={<Checkbox onChange={phonesPrivateChange}  checked={loadedUser.publicData.phones} />} label={i18next.t("Phones")} />
                        <FormControlLabel control={<Checkbox onChange={lastLoginPrivateChange} checked={loadedUser.publicData.lastLogin} />} label={i18next.t("Last Login")} />
                    </FormGroup>
                </Grid>
                
            </Grid>
           
            </Grid>
        </Grid>
        

         {/* LANGUAGE */}
        
         <Grid container spacing={{ xs: 2, md: 3 }} width={newWidth-32} >
            <Grid item xs={12} md={12}>
            <   Typography variant='h4'>{i18next.t("Language")}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                    <Typography variant='body2' color="primary"><i>{i18next.t("languageInstructions")}</i></Typography>
                </Grid>
                
            <Grid item xs={4}  md={4}>
                <TextField
                    id="languages-selector"
                    select
                    fullWidth
                    label={i18next.t("Languages")}
                    defaultValue={user.language}

               >
                <MenuItem onClick={(e)=>{handleSelectLang(e, "BROWSER")}}  key={"BROWSER"} value={"BROWSER"}>{i18next.t("Browser Default")}</MenuItem>
                <Divider />
                  {languagesCodes.map((option)=>{
                        return(
                        <MenuItem onClick={(e)=>{handleSelectLang(e, option.code)}}  key={option.code} value={option.code}>{i18next.t(option.label)}</MenuItem>
                        )
                    })} 
                    
               </TextField>
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