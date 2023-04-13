import * as React from 'react';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Link, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';
import { getHeadShot, getRightPicture } from 'src/utils/picUtils';
import { shortDate } from 'src/utils/dateUtils';
import { useOutletContext } from 'react-router-dom';

const theme = createTheme(themeOptions);

const navigation = (payload) =>{
    console.log(payload)
    window.open(payload);
  }


export const ConversationComp = (props)=>{

    const {conversation, userId} = props;
    const [converstationObj, setConversationObj]= useState(conversation);
    const [theOther, setTheOther] = useState();
    const [lastMessage, setLastMessage] = useState()
    const [newWidth] = useOutletContext();

    

    
    useEffect(()=>{
       
        if (theOther==="" || theOther===null || theOther === undefined){
            console.log("USE EFFECT")
            converstationObj.members.forEach(member => {
                console.log(member.userId, userId)
                if (member.userId !== userId){
                    setTheOther(member);
                }
            });
        }

        if (lastMessage==="" || lastMessage===null || lastMessage === undefined){
            console.log("LAST MESSAGE", converstationObj.messages[converstationObj.messages.length-1])
            setLastMessage(converstationObj.messages[converstationObj.messages.length-1])
        }
    },[theOther, lastMessage])

    const MessagesList = (props)=>{
        return(
        <React.Fragment>
           
             <Paper sx={{p:1,borderRadius:5}}>
            
            {/* CONTENEDOR PARA AVATAR + TEXTO */}
                <Grid 
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width: newWidth>500?400: newWidth-32}}
                    
                >
                    <Grid item xs="auto">
                        <IconButton 
                            size='small' 
                            onClick={(e)=>{e.preventDefault(); navigation("/user/"+theOther.username)}}
                        >
                        <Avatar alt={theOther.username} src={getHeadShot(theOther)}/> 
                        </IconButton>
                    </Grid>

                    <Grid item>
                        {/* CONTENEDOR DERECHA (VERTICAL*/}
                        <Grid container direction="column">
                            <Grid item>
                                {/* CONTENEDOR NOMBRE + DATE */}
                                <Grid container direction="row">
                                    <Grid item>
                                        <Typography variant='b'><b>{theOther.username}</b></Typography>
                                    </Grid>
                                    <Grid item>
                                        {lastMessage?<>
                                            <Typography>{shortDate(lastMessage.timestamp)}</Typography>
                                        </>:<></>}
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            {lastMessage?<>
                            <Grid item>
                                <Typography variant='body1'>
                                    {lastMessage.senderId === theOther.userId?theOther.username +": " +  lastMessage.message.substring(0,60) :i18next.t("You") + ": "+  lastMessage.message.substring(0,60) }{lastMessage.message.length>60?"...":"."}
                                </Typography>
                            </Grid>
                            </>:<></>}
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Paper>
        </React.Fragment>
        )
    }

    if(theOther){
        
        return (
            <>
             <MessagesList />
            </>
        )
    }
    else return <>NO LAST MESSAGE</>

}