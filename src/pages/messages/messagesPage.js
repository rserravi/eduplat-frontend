import { Grid, Typography, Alert,  Snackbar, Box, Container } from '@mui/material';
import * as React from 'react'
import i18next from 'i18next';
import {  useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useOutletContext } from 'react-router-dom';
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import { GET_CONVERSATIONS, SET_CONVERSATIONS } from 'src/store/convesationSlice';
import { useDispatch } from 'react-redux';
import { getMessages } from 'src/api/messagesApi';
import { ConversationComp } from 'src/components/messages/message-comp';

const theme = createTheme(themeOptions);


export const Messages= () =>{
    const user = useSelector(state => state.user)
    const [newWidth] = useOutletContext();
    const [openSnack, setOpenSnack] = useState(false);
    const [conversations, setConversation ]= useState(useSelector(state=> state.conversation));
    const [fire, setFire] =useState(false);
    const dispatch = useDispatch();
  

    //SNACK
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    //CHANGE FUNCT.
    
        
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
      };

    const reloadConv = () =>{
        setConversation(dispatch(GET_CONVERSATIONS()))
        setFire(true);
    }

    
    useEffect(()=>{
        

       // console.log("Messages useEffect")
        if (!conversations || conversations === undefined || conversations.length===0 || fire){
            try {
                //console.log("GETTTING.")
                getMessages(user._id)
                .then((result)=>{
                    //console.log(result.conversation);
                    if (result.status==="success"){
                        //console.log(result);
                        dispatch(SET_CONVERSATIONS(result.conversation));
                        setConversation(result.conversation)
                    }
                    setFire(false);
    
                }).catch((err)=>{
                    console.error(err);
                })
            } catch (error) {
                console.error(error);
            }
        }
       
    },[dispatch, conversations, fire, user._id])

    if (user && user._id !=="" ){
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <Container width={newWidth-32}>
                <CssBaseline />
                <Box
                    sx={{
                        
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "center",
                        p:1,
                        ml: newWidth>500?((newWidth/2) -200)/8:0
                    }}
                    >
                
        {/* MESSAGES VAL */}
                
        <Grid item>
            <Typography variant='h3' sx={{my:2}}>{i18next.t("Conversations")}</Typography>
        </Grid>
        {conversations && conversations.length >0?<>
            {conversations.map((conv, index)=>{
                return (
                        <React.Fragment key={index}>
                            <Grid item mb={1}>
                            <ConversationComp conversation={conv} userId={user._id} reloadConv={reloadConv}/>
                            </Grid>
                        </React.Fragment>
                )
            })}
        </>:<>
            <Loader />
        </>}
        

       

        {/* SNACKBAR */}

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>  
        </Box>
        </Container>
        </ThemeProvider>
        </React.Fragment>
    )
   }
    else {
        <>
            <Loader />
        </>
    }
}