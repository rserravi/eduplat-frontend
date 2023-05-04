import * as React from 'react';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Link, Paper } from '@mui/material';
import { fetchUserbyId, setUserAcceptedRejected } from 'src/api/userApi';
import { createTheme } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { FavoriteIcon } from '../../../components/favorites';
import i18next from 'i18next';
import { karmaLevel } from 'src/utils/karma';
import { getHeadShot, getRightPicture } from 'src/utils/picUtils';
import Image from 'mui-image';
import { longDate } from 'src/utils/dateUtils';
import { setAcceptedRejected } from 'src/api/edusourceApi';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const theme = createTheme(themeOptions);

const navigation = (payload) =>{
    console.log(payload)
    window.open(payload);
  }


  export const Valoration =(props) =>{

    //ACCEPTED MODE: (all, accepted, noaccepted)
    //EDITING: when true, show editing buttons to show or hide in profile.
  const {valoration, textColor, backgroundColor, acceptedMode, editing} = props;

  const [sender, setSender] = useState();
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const primary= textColor?textColor:theme.palette.primary;
  const secondary = backgroundColor?backgroundColor: theme.palette.secondary;
  //const mode = acceptedMode && acceptedMode!==""?acceptedMode:"all";

  

  const acceptButton = (event)=>{
    //TODO: ACCEPT VALORATION
  }

  const rejectButton = (event)=>{
    //TODO: HIDE VALORATION.
  }

  
  useEffect(() =>{
      
    if(valoration || valoration!==null){
         try {

            fetchUserbyId(valoration.senderId).then((response)=>{
                //console.log(response);
                 setSender(response.user) 
                 //console.log("USUARIO ENCONTRADO!",response.user);
                 
             }).catch(error=>{
                 console.log(error);
                 setError(error);
             })
             
         } catch (error) {
             setError(error);
         }
     }
             

 },[valoration])

  if ((valoration.accepted && acceptedMode==="accepted") || (!valoration.accepted && acceptedMode==="noaccepted") || acceptedMode==="all"){
  return (
    <>
    {sender && sender._id!==""?<>
    <Paper sx={{m:1, p:1, borderRadius:5,  backgroundColor: secondary}}>
       
        <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{p:1}}
        >
            <Grid item xs="auto">
                <IconButton 
                    size='small' 
                    onClick={(e)=>{e.preventDefault(); navigation("/user/"+sender.username)}}
                >
                <Avatar alt={sender.username} src={getHeadShot(sender)}/>
                </IconButton>
            </Grid>
            <Grid item xs={10} sx={{ml:1}}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography 
                            variant='body2'
                            color={primary}
                            onClick={(e)=>{e.preventDefault(); navigation("/user/"+sender.username)}}
                            sx={{
                                fontWeight:"bold", 
                                fontSize:18, 
                                '&:hover': {
                                    textDecoration:"underline",
                                    cursor: "pointer"
                                    }
                                }}
                            >
                                {sender.publicData.name?sender.firstname + " " + sender.lastname: sender.username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography 
                            variant='body2'
                            color={primary}
                            sx={{
                                fontWeight:"bold",
                                '&:hover': {
                                    textDecoration:"underline",
                                    cursor: "pointer"
                                    }
                            }}
                        >{sender.publicData.name? "@"+ sender.username:<></>}</Typography>
                    </Grid>
            
                    <Grid item sx={{mt:1}}>  
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Grid item>
                                <Typography color={primary}>{i18next.t("Karma")}: {sender.karma}. - {i18next.t("Level")}: {karmaLevel(sender.karma)}</Typography>
                            </Grid>
                        </Grid>        
                    </Grid>
                    <Grid item>
                        <Typography color={primary}variant='body1' sx={{fontSize:15, fontWeight:'bold', ml:2, my:1}} ><i>"{valoration.comment}"</i></Typography>
                    </Grid>
                    <Grid>
                        <FavoriteIcon value={valoration.value+1} />
                    </Grid>

                        
                </Grid>
            </Grid>

        </Grid>
        {editing?<>
             <Button size='small' onClick={acceptButton} color='success' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("Accept")}</Button>
             <Button size='small' onClick={rejectButton} color='warning' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("Reject")}</Button>
             </>
       :<></>}

    </Paper>
    
    </>:<></>}
    
    </>
  );
                        }
                        else{
                            return(<></>)
                        }
}

export const ExtendedResourceValorations = (props)=>{
    const {vals} = props;
    const [openDialog, setOpenDialog]= useState(false);

    const handleClose = (event)=>{
        setOpenDialog(false)
        navigation('/myaccount/valorations')
    }
   
    const acceptButton = async (event)=>{
        
       await setAcceptedRejected(vals.edu_id,vals.val_id, true, false).then((data)=>{
            if (data.status ==="success"){
                console.log("ACTUALIZADO")
                setOpenDialog(true);
            }
            else {
                console.log ("ERROR", data.message)
            }
       }) 

    }

    const rejectButton = async (event)=>{
        await setAcceptedRejected(vals.edu_id,vals.val_id, false, true).then((data)=>{
            if (data.status ==="success"){
                console.log("ACTUALIZADO")
                setOpenDialog(true);

            }
            else {
                console.log ("ERROR", data.message)
            }
       })
    }

    return(
        <>

            <Paper 

                sx={{border:1, borderRadius:5,p:1, borderColor:'lightgray',
                   mb:2 }}
                >
        
                <Grid container>
                    <Grid item xs={5} md={2} sx={{mr:2}}>
                        <Image src={getRightPicture(vals.eduPicture)} width={150} height={85} duration={0} sx={{borderRadius:5}} ></Image>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Grid 
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            >
                             <Grid item>
                                    <Typography variant='h4' ><b>{vals.eduTitle}</b></Typography>
                            </Grid>
                            <Grid item >
                                    <Typography >{vals.eduDescription.substring(0,130)} ...</Typography><Button size='small'>{i18next.t("read more")}...</Button>
                            </Grid>
                           
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container alignItems="flex-end">
                                
                                <Avatar alt={vals.senderUser} src={getRightPicture(vals.senderPicture)}  sx={{ width: 24, height: 24 }} />
                                <Grid item>
                                    <Link ><i>@{vals.senderUser}</i></Link> {i18next.t("has commented the")} {longDate(vals.date)}
                                </Grid> 
                                
                            </Grid>
                            <Grid item>
                                <Typography variant='body2' mt={1}><i><b>"{vals.comment}"</b></i></Typography>
                                <FavoriteIcon value={vals.value+1} />
                            </Grid>
                <Button size='small' disabled={vals.accepted} onClick={acceptButton} color='success' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("Accept")}</Button>
                <Button size='small' onClick={rejectButton} color='warning' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("Reject")}</Button>
                
            </Paper> 
     
                <ValorationDialog open = {openDialog} handleClose={handleClose} />
     
            
        </>  
    )
}

export const ExtenderUserValorations = (props)=>{
    const {vals, user_id} = props;
    const [sender, setSender] = useState();
    // eslint-disable-next-line
    const [error, setError] = useState("");

    //console.log("EXTENDED USER",vals, user_id)


    const [openDialog, setOpenDialog]= useState(false);

    const handleClose = (event)=>{
        setOpenDialog(false)
        navigation('/myaccount/valorations')
    }
   
    const acceptButton = async (event)=>{
        
       await setUserAcceptedRejected(user_id, vals._id, true, false).then((data)=>{
            if (data.status ==="success"){
                console.log("ACTUALIZADO")
                setOpenDialog(true);
            }
            else {
                console.log ("ERROR", data.message)
            }
       }) 

    }

    const rejectButton = async (event)=>{
        await setUserAcceptedRejected(user_id, vals._id, false, true).then((data)=>{
            if (data.status ==="success"){
                console.log("ACTUALIZADO")
                setOpenDialog(true);

            }
            else {
                console.log ("ERROR", data.message)
            }
       })
    }

    useEffect(() =>{
      
        if(vals || vals!==null){
            //console.log("ENCONTRANDO EL SENDER", vals.senderId)
             try {
    
                fetchUserbyId(vals.senderId).then((response)=>{
                    //console.log(response);
                     setSender(response.user) 
                     //console.log("USUARIO ENCONTRADO!",response.user);
                     
                 }).catch(error=>{
                     console.log(error);
                     setError(error);
                 })
                 
             } catch (error) {
                 setError(error);
             }
         }
                 
    
     },[vals])

    return(
        <>
    {sender && sender._id!==""?<>
    <Paper sx={{mb:2, p:1, borderRadius:5,  backgroundColor: "secondary"}}>
       
        <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{p:1}}
        >
            <Grid item xs="auto">
                <IconButton 
                    size='small' 
                    onClick={(e)=>{e.preventDefault(); navigation("/user/"+sender.username)}}
                >
                <Avatar alt={sender.username} src={getHeadShot(sender)}/>
                </IconButton>
            </Grid>
            <Grid item xs={10} sx={{ml:1}}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography 
                            variant='body2'
                      
                            onClick={(e)=>{e.preventDefault(); navigation("/user/"+sender.username)}}
                            sx={{
                                fontWeight:"bold", 
                                fontSize:18, 
                                '&:hover': {
                                    textDecoration:"underline",
                                    cursor: "pointer"
                                    }
                                }}
                            >
                                {sender.publicData.name?sender.firstname + " " + sender.lastname: sender.username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography 
                            variant='body2'
                    
                            sx={{
                                fontWeight:"bold",
                                '&:hover': {
                                    textDecoration:"underline",
                                    cursor: "pointer"
                                    }
                            }}
                        >{sender.publicData.name? "@"+ sender.username:<></>}</Typography>
                    </Grid>
            
                    <Grid item sx={{mt:1}}>  
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Grid item>
                                <Typography color={"primary"}>{i18next.t("Karma")}: {sender.karma}. - {i18next.t("Level")}: {karmaLevel(sender.karma)}</Typography>
                            </Grid>
                        </Grid>        
                    </Grid>
                    <Grid item>
                        <Typography variant='body1' sx={{fontSize:15, fontWeight:'bold', ml:2, my:1}} ><i>"{vals.comment}"</i></Typography>
                    </Grid>
                    <Grid>
                        <FavoriteIcon value={vals.value+1} />
                    </Grid>

                        
                </Grid>
            </Grid>

        </Grid>
        
             <Button disabled={vals.accepted} size='small' onClick={acceptButton} color='success' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("Accept")}</Button>
             <Button size='small' onClick={rejectButton} color='warning' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("Reject")}</Button>
       
    </Paper>
    <ValorationDialog open = {openDialog} handleClose={handleClose} />
    
    </>:<></>}
    
    </> 
    )
}


const ValorationDialog = (props)=>{
    const {open, handleClose}= props;
    console.log(open);


  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="updated-dialog-title"
        aria-describedby="updated-dialog-description"
      >
        
        <DialogContent>
          <DialogContentText id="updated-dialog-description">
            {i18next.t("The valuation has been updated")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{i18next.t("Accept")}</Button>
        </DialogActions>
      </Dialog>
  );
}
