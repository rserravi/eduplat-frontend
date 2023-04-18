import * as React from 'react';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Badge, ButtonBase, Grid, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import i18next from 'i18next';
import { getHeadShot } from 'src/utils/picUtils';
import { shortDate } from 'src/utils/dateUtils';
import { useOutletContext } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { markAsReadedConversation, sendMessage } from 'src/api/messagesApi';
import _ from 'lodash';
import { MARK_CONVERSATION_AS_READED } from 'src/store/convesationSlice';


//const theme = createTheme(themeOptions);

const navigation = (payload) =>{
    console.log(payload)
    window.open(payload);
  }


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const ConversationComp = (props)=>{

    const {conversation, userId, reloadConv} = props;
    // eslint-disable-next-line 
    const [converstationObj, setConversationObj]= useState(conversation);
    const [theOther, setTheOther] = useState();
    const [theOser, setTheUser] = useState();
    const [lastMessage, setLastMessage] = useState()
    const [newWidth] = useOutletContext();
    const [unreaded, setUnreaded] = useState();
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const initialValues = {
        message: '',
      };

    const handleClickOpen = async (event) => {
        
        setOpen(true);
        //MARCAR COMO LEIDOS
        var newConversation = _.cloneDeep(converstationObj);
        for (let i = 0; i < newConversation.messages.length; i++) {
            newConversation.messages[i].readed = true;
        }
        setConversationObj(newConversation);
        await markAsReadedConversation(converstationObj._id, theOser.userId).then((result)=>{
            if (result.status==="success" || result.status==="succes") {
                dispatch(MARK_CONVERSATION_AS_READED({"conversationId":converstationObj._id, "userId":theOser.userId}))
                console.log(result);
            }
            else {
                console.log("Error updating messages")
            }
        })
       
       

      };

    
    const handleClose = () => {
        setOpen(false);
        //window.location.reload();
        reloadConv();

      };

    const submitMessageText = async (val)=>{
       console.log(val); 
       await sendMessage(theOser.userId, theOther.userId, val).then((data)=>{
            console.log(data);
            handleClose();
       }).catch((err)=>{
        console.log(err);
       })
       
    }
    
    useEffect(()=>{
       
        if (theOther==="" || theOther===null || theOther === undefined ||theOser==="" || theOser===null || theOser === undefined ){
            console.log("USE EFFECT")
            converstationObj.members.forEach(member => {
              //  console.log(member.userId, userId)
                if (member.userId !== userId){
                    setTheOther(member);
                //    console.log("THE OTHER", member)
                }
                else {
                    setTheUser(member);
                   console.log("THE USER", member)
                }

            });
        }

        if (lastMessage==="" || lastMessage===null || lastMessage === undefined){
            //console.log("LAST MESSAGE", converstationObj.messages[converstationObj.messages.length-1])
            setLastMessage(converstationObj.messages[converstationObj.messages.length-1])
        }

        if (unreaded===null || unreaded === undefined){
            var count = 0
            converstationObj.messages.forEach(mess => {
                if (!mess.readed && mess.senderId!==userId){
                    count++;
                }
            });
            setUnreaded(count);
        }
    },[theOther, theOser, lastMessage,userId, converstationObj.members, converstationObj.messages, unreaded])

    const Message = (props)=>{
        const {message} = props;
        
        return (
            <React.Fragment>
                   <Paper sx={{p:1,
                        borderRadius:5, 
                        mt:1,
                        ml: theOther.userId===message.senderId?0:5,
                        width: newWidth>500?400: newWidth-58,
                        backgroundColor:"background.terciary"
                    }} 
                    >

                         {/* CONTENEDOR PARA AVATAR + TEXTO */}
                        <Grid 
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{width: newWidth>500?400: newWidth-58,
                              
                            // direction: theOther.userId===message.senderId?"ltr":"rtl"
                            }}
                            
                        >
                            <Grid item xs={2}>
                                <IconButton 
                                    size='big' 
                                >
                                    
                                    <Avatar alt={message.senderId} src={getHeadShot(message.senderId===theOther.userId?theOther:theOser)}/> 
                               
                                </IconButton>
                            </Grid>

                            <Grid item xs={10}>
                                {/* CONTENEDOR DERECHA (VERTICAL*/}
                                <Grid container direction="column">
                                    <Grid item>
                                        {/* CONTENEDOR NOMBRE + DATE */}
                                        <Grid container direction="row"  justifyContent="space-between">
                                            <Grid item >
                                                <Typography variant='b'><b>{message.senderId===theOther.userId?theOther.username:theOser.username}</b></Typography>
                                            </Grid>
                                            <Grid item>
                                                  <Typography variant='body2' sx={{mr:2}}>{shortDate(message.timestamp)}</Typography>   
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                   
                                    <Grid item>
                                        <Typography variant='body1'>
                                            {message.message}
                                        </Typography>
                                    </Grid>
                                  
                                </Grid>
                            </Grid>
                            
                        </Grid>
                   </Paper>
            </React.Fragment>
        )
    }

    const Conversation = (props)=>{

        const onSubmit = (values, { resetForm }) => {
            submitMessageText(values.message);
            //resetForm();
          };

        return(
        <React.Fragment>
           <ButtonBase onClick={handleClickOpen} sx={{borderRadius:5}}>
             <Paper sx={{p:1,borderRadius:5}}>
            
            {/* CONTENEDOR PARA AVATAR + TEXTO */}
                <Grid 
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width: newWidth>500?400: newWidth-32}}
                    
                >
                    <Grid item xs={2}>
                        <IconButton 
                            size='small' 
                            onClick={handleClickOpen}
                        >
                            {lastMessage.readed?<>
                                <Avatar alt={theOther.username} src={getHeadShot(theOther)}/> 
                            </>:
                            <>
                             <Badge
                                overlap="circular" 
                                badgeContent={unreaded}
                       
                                color='success'
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                >
                                <Avatar alt={theOther.username} src={getHeadShot(theOther)}/> 
                            </Badge>
                            </>}
                            
                        </IconButton>
                    </Grid>

                    <Grid item xs={10}>
                        {/* CONTENEDOR DERECHA (VERTICAL*/}
                        <Grid container direction="column">
                            <Grid item>
                                {/* CONTENEDOR NOMBRE + DATE */}
                                <Grid container direction="row"  justifyContent="space-between">
                                    <Grid item >
                                        <Typography variant='b'><b>{theOther.username}</b></Typography>
                                    </Grid>
                                    <Grid item>
                                        {lastMessage?<>
                                            <Typography variant='body2' sx={{mr:2}}>{shortDate(lastMessage.timestamp)}</Typography>
                                        </>:<></>}
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            {lastMessage?<>
                            <Grid item>
                                <Typography variant='body1'>
                                   {lastMessage.senderId === theOther.userId?theOther.username +": " +  lastMessage.message.substring(0,60) :i18next.t("You") + ": "+  lastMessage.message.substring(0,60) }{lastMessage.message.length>60?"...":""}
                                </Typography>
                            </Grid>
                            </>:<></>}
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Paper>
            </ButtonBase>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                    </IconButton>
                   
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {i18next.t("Conversation with")} @{theOther.username}
                    </Typography>
                    <IconButton size='small' onClick={(e)=>{navigation("/user/"+theOther.username)}}>
                    <Avatar alt={theOther.username} src={getHeadShot(theOther)}/> 
                    </IconButton>
                    <Button color="inherit" onClick={(e)=>{navigation("/user/"+theOther.username)}}>
                        {theOther.username} {i18next.t("profile")}
                    </Button>
                </Toolbar>
                </AppBar>
                <Box p={1}>
                {converstationObj.messages.map((mes, index)=>{
                    return(
                    <React.Fragment key={index}>
                        
                        <Message message={mes} />
                    </React.Fragment>
                    )
                })}

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ values, handleSubmit }) => (
                        <Form>
                        <Field
                            name="message"
                            as={TextField}
                            label={i18next.t('Write a message')}
                            multiline
                            autoFocus
                            rows={8}
                            sx={{
                            mt: 2,
                            width: newWidth - 16,
                            backgroundColor: 'background.terciary',
                            }}
                        />
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            >
                                <Grid item>
                                <Button 
                                    type='submit'
                                    variant='contained' 
                                    sx={{mt:1}}
                                    disabled={!values.message.trim()}
                                >
                                    {i18next.t("Send")}
                                </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                    </Formik>
                
              
                </Box>
                {/* TODO: Botones para denunciar spam */}
            </Dialog>
        </React.Fragment>
        )
    }

    if(theOther){
        
        return (
            <>
             <Conversation />
             
            </>
        )
    }
    else return <>NO LAST MESSAGE</>

}