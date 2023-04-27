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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Logo from 'src/ui-component/Logo';
import i18next from 'i18next';
import { useParams } from 'react-router-dom';
import { resendVerificationLink } from 'src/api/userApi';
import { useNavigate } from 'react-router-dom';




const theme = createTheme(themeOptions);


export const NotVerified = (props) =>{
    const {email}= useParams();
    const [msg, setMsg]= React.useState("");
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = (event)=>{
        setOpen(false);
        navigate("/login");
    }

    const resend = async (event) =>{
        
        await resendVerificationLink(email).then((result)=>{
            if (result.status === "success"){
                setMsg(()=>{ return i18next.t("We have sent a new link to your email. Please, check as well the spam folder")})
                setOpen(true);
            }
            else {
                setMsg(()=>{ return result.message});
                setOpen(true);
            }

        }).catch((err)=>{
            setMsg(()=>{ return err.message});
            setOpen(true);
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
                        {i18next.t("Not verified")}
                    </Typography>


                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <Grid item mt={3}>
                                <Typography align="center">
                                {i18next.t("Check your email and your spam, and follow the link that we have sent to you")}.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='outlined'
                                    sx={{ mt: 3, mb: 2, borderRadius:5 }}
                                    onClick={resend}
                                >
                                    {i18next.t("Resend Verification Link")}
                                </Button>
                            </Grid>
                            <Grid container>
                                            <Grid item xs>
                                                <Link href="/forgotpassword" variant="body2">
                                                {i18next.t("forgotPassword")}
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
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Link sent to you"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {msg}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleAccept}>{i18next.t("Accept")}</Button>
                    </DialogActions>
                </Dialog>
                <Copyright sx={{ mt: 5 }} short="true" />
            </Container>
        </ThemeProvider>
    );
}