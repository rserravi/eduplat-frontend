import * as React from 'react';
import TextField from '@mui/material/TextField';
import {  Button, Grid, InputAdornment } from '@mui/material';
import { userUpdate } from 'src/api/userApi';
import i18next from 'i18next';


export const NameForm = (props) =>{
    const {user, handleNameClose} = props;
    const [firstname, setFirstName] = React.useState(user.firstname);
    const [lastname, setLastName] =  React.useState(user.lastname);
    const [username, setUsername] =  React.useState(user.username);
    const [edited, setEdited] = React.useState(false);

    const handleAcceptClick = async (event)=>{
        event.preventDefault();
        console.log(firstname, lastname, username);
        if (edited){
            const frmData = {
                "_id": user._id,
                "firstname": firstname,
                "lastname": lastname,
                "username": username
            }
            await userUpdate(frmData).then((result)=>{
                console.log("RESULTADO OBTENIDO", result)
                if (result.status==="success"){
                    handleNameClose("success", i18next.t("Your name has been udpated"));
                }
                
            }).catch((error)=>{
                console.log(error);
                handleNameClose("error",i18next.t("Something has failed"));
            })
        }
        handleNameClose();
    }

    const firstnameChange = (event) =>{
        setEdited(true);
        setFirstName(event.target.value)
    }

    const lastnameChange = (event) =>{
        setEdited(true);
        setLastName(event.target.value)
    }

    const usernameChange = (event) =>{
        setEdited(true);
        setUsername(event.target.value);
    }

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
                <TextField onChange={firstnameChange} sx={{width:290}} variant="standard" label={i18next.t("FirstName")} defaultValue={user.firstname}></TextField>
            </Grid>
            <Grid item sx={{mb:2}}>
                <TextField onChange={lastnameChange} sx={{width:290}}  variant="standard" label={i18next.t("LastName")} defaultValue={user.lastname}></TextField>
            </Grid>
            <Grid item xs={12} sx={{mb:2}}>
                <TextField onChange={usernameChange}  sx={{width:290}}  variant="standard" label={i18next.t("username")} defaultValue={user.username}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}/>
            </Grid>
        </Grid>
        <Grid 
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            sx={{mt:2}}
            >
                <Grid item sx={{mr:2}}>
                <Button onClick={handleAcceptClick} variant='contained' sx={{borderRadius:"20px"}}>{i18next.t("Accept")}</Button>
                </Grid>

                <Grid item>
                    <Button onClick={handleNameClose} variant='contained' sx={{borderRadius:"20px"}}>{i18next.t("Cancel")}</Button>
                </Grid>
        
        </Grid> 
        
       
        </>
    )
}