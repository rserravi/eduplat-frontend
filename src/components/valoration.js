import * as React from 'react';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Paper } from '@mui/material';
import { fetchUserbyId } from 'src/api/userApi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { FavoriteIcon } from './favorites';
import i18next from 'i18next';
import { karmaLevel } from 'src/utils/karma';
import { getHeadShot } from 'src/utils/picUtils';

const theme = createTheme(themeOptions);

export const Valoration =(props) =>{

  const {valoration, textColor, backgroundColor} = props;

  const [sender, setSender] = useState();
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const primary= textColor?textColor:theme.palette.primary;
  const secondary = backgroundColor?backgroundColor: theme.palette.secondary;

  
  const navigation = (payload) =>{
    console.log(payload)
    window.open(payload);
  }

  
  useEffect(() =>{
      
    if(valoration || valoration!==null){
         try {

            fetchUserbyId(valoration.senderId).then((response)=>{
                //console.log(response);
                 setSender(response.user) 
                 console.log("USUARIO ENCONTRADO!",response.user);
                 
             }).catch(error=>{
                 console.log(error);
                 setError(error);
             })
             
         } catch (error) {
             setError(error);
         }
     }
             

 },[valoration])

  if (valoration.accepted){
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

    </Paper>
    
    </>:<></>}
    
    </>
  );
                        }
                        else{
                            return(<></>)
                        }
}