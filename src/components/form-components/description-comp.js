import * as React from 'react';
import TextField from '@mui/material/TextField';
import {  Button, Grid } from '@mui/material';
import { userUpdate } from 'src/api/userApi';
import i18next from 'i18next';


export const DescriptionForm = (props) =>{
    const {user, handleDescriptionClose} = props
    const [position, setPosition] = React.useState(user.job.position);
    const [workplace, setWorkplace] =  React.useState(user.job.workplace);
    const [edited, setEdited] = React.useState(false);

    const handleAcceptClick = async (event)=>{
        event.preventDefault();
       
        if (edited){
            // UPDATE DATA BASE
            const frmData = {
                "_id": user._id,
                "job": {
                    "position": position,
                    "workplace": workplace
                }
            }
            await userUpdate(frmData).then((result)=>{
                console.log("RESULTADO OBTENIDO", result)
                if (result.status==="success"){
                    handleDescriptionClose("success", i18next.t("Your description has been udpated"));
                }
                
            }).catch((error)=>{
                console.log(error);
                handleDescriptionClose("error", i18next.t("Something has failed"));
            })
        }
        handleDescriptionClose();
    }

    const postionChange = (event) =>{
        setEdited(true);
        setPosition(event.target.value)
    }

    const workplaceChange = (event) =>{
        setEdited(true);
        setWorkplace(event.target.value)
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
                <TextField onChange={postionChange} sx={{width:290}} variant="standard" label={i18next.t("Position")} defaultValue={user.job.position}></TextField>
            </Grid>
            <Grid item sx={{mb:2}}>
                <TextField onChange={workplaceChange} sx={{width:290}}  variant="standard" label={i18next.t("Workplace")} defaultValue={user.job.workplace}></TextField>
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
                    <Button onClick={handleDescriptionClose} variant='contained' sx={{borderRadius:"20px"}}>{i18next.t("Cancel")}</Button>
                </Grid>
        
        </Grid> 
        
       
        </>
    )
}