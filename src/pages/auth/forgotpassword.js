import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { Copyright } from 'src/components/pageStruct/copyright';


import Logo from 'src/ui-component/Logo';
import i18next from 'i18next';
import { sendResetPasswordEmail } from 'src/api/userApi';
import { Alert, TextField } from '@mui/material';




const theme = createTheme(themeOptions);


export const ForgotPassword = (props) =>{
    const [msg, setMsg]= React.useState("");
    const [email, setEmail]= React.useState("");
    const [errors, setErrors]= React.useState();

 
    const onChangeEmail = (event)=>{
        event.preventDefault();
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)) {
            setErrors(i18next.t("Invalid email address"));
          }
        else{
            setErrors("")
        }
        setEmail(event.target.value);
    }

    const resend = async (event) =>{
        
        await sendResetPasswordEmail(email).then((result)=>{
            if (result.status === "success"){
                setMsg(i18next.t(result.message))
               // setOpen(true);
            }
            else {
                setMsg(()=>{ return result.message});
                //setOpen(true);
            }

        }).catch((err)=>{
            setMsg(()=>{ return err.message});
            //setOpen(true);
        })
    }
   
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p:2
                    }}
                    >
                    <Logo size={300} />
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {i18next.t("Forgot password?")}
                    </Typography>


                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <Grid item mt={3}>
                                <Typography align="center">
                                {i18next.t("Write the email that you used to register")}.
                                </Typography>
                            </Grid>
                            <Grid item mt={1}>
                                <TextField 
                                    error={errors!==""}
                                    variant="standard"
                                    onChange={onChangeEmail}
                                    label={i18next.t("Email")}
                                    helperText={errors?errors:""}
                                    sx={{ mt:1,
                                        '& fieldset': {
                                        borderRadius: '20px',
                                    },}}
                                >

                                </TextField>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='outlined'
                                    sx={{ mt: 3, mb: 2, borderRadius:5 }}
                                    onClick={resend}
                                >
                                    {i18next.t("Send")}
                                </Button>
                            </Grid>
                            <Grid >
                                {msg!==""?<>
                               <Alert sx={{my:2}} severity="warning">{msg}</Alert> 
                               </>:<></>}
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                <Link href="/login" target="_blank" variant="body2">
                                {i18next.t("AlreadyHaveAnAccount?")}  {i18next.t("signUp")}
                                </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                    {i18next.t("DontHaveAnAccount?")} {i18next.t("signIn")}
                                    </Link>
                                </Grid>
                            </Grid>
                            
                    </Grid>
                </Box>
               
                <Copyright sx={{ mt: 5 }} short="true" />
            </Container>
        </ThemeProvider>
    );
}