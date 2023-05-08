import React, { Suspense } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Container, CssBaseline, Avatar, Box, Typography, Grid } from '@mui/material';
import { themeOptions } from 'src/theme/theme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from 'src/ui-component/Logo';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { sendSupportEmail } from 'src/api/emailApi';
import AlertSnackbar from 'src/components/alertSnakBar';
import { set } from 'lodash';
import Loader from 'src/ui-component/Loader';



const theme = createTheme(themeOptions);

const schema = yup.object().shape({
  subject: yup.string().required(i18next.t('Subject is required')),
  message: yup
    .string()
    .max(240, i18next.t('Message must be less than or equal to 240 characters'))
    .required(i18next.t('Message is required')),
});

const TechnicalSupport = () => {
    const user = useSelector(state => state.user)
    const [newWidth] = useOutletContext();
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');
    const [sent, setSent]= React.useState(false);
    const initialValues = {
    subject: '',
    message: '',
  };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    await sendSupportEmail(user.username, values.subject, values.message).then((result)=>{
        if (result.status ==="success"){
            setSeverity('success');
            setMessage("Email to support sent correctly");
            setSent(true);
            setOpen(true);
        }
        else {
            setSeverity('error');
            setMessage("We can't send the email right now. Try again later");
            setOpen(true);
        }

    })
    setSubmitting(false);
  };

  if (user && user._id!==""){

  
  if (sent){
    return(
    <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
            <CssBaseline />
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    width={newWidth}
                    ml={1}
                    > 
                    <Grid item>
                    
                        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
                            <SupportAgentIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h5" sx={{my:2}}>
                            {i18next.t("Send a Message")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="p" variant="body2" sx={{my:2, ml:1}}>
                            {i18next.t("The support team will be contacting you soon. Thanks for your contribution to Eduplat")}
                        </Typography>
                    </Grid>
                        
                </Grid>
                <AlertSnackbar
                    severity={severity}
                    message={message}
                    open={open}
                    handleClose={handleClose}
                />
                </Suspense>
            </ThemeProvider>
        )
    }
    else {

    return (
        <ThemeProvider theme={theme}>
              <Suspense fallback={<Loader />}>
            <CssBaseline />
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    width={newWidth}
                    ml={1}
                    > 
                    <Grid item>
                    
                        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
                            <SupportAgentIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h5" sx={{my:2}}>
                            {i18next.t("Send a Message")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="p" variant="body2" sx={{my:2, ml:1}}>
                            {i18next.t("If you need to comunicate with or technical team, for suggestions, complains or anything in beetween, feel free to write to us")}
                        </Typography>
                    </Grid>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={handleSubmit}
                        >
                                {({ values, isSubmitting }) => (
                                    <Form>
                                        <Grid item sx={{width:390}} >
                                    <Field name="subject">
                                        {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label={i18next.t("Subject")}
                                            error={meta.touched && Boolean(meta.error)}
                                            helperText={meta.touched && meta.error}
                                            sx={{ '& fieldset': {
                                                borderRadius: '20px',
                                                width:390, 
                                                my:1
                                            }}}
                                        />
                                        )}
                                    </Field>
                                    </Grid>
                                    <Grid item sx={{width:390}} >
                                    <Field name="message">
                                        {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label={i18next.t("Message")}
                                            multiline
                                        rows={4}
                                            sx={{ '& fieldset': {
                                                borderRadius: '20px',
                                                width:390,
                                                my:1
                                            }}}
                                            error={meta.touched && Boolean(meta.error)}
                                            helperText={meta.touched && meta.error}
                                        />
                                        )}
                                    </Field>
                                    </Grid>
                                    <Grid item >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        sx={{borderRadius:20}}
                                    >
                                        {i18next.t("Submit")}
                                    </Button>
                                    </Grid>
                                    </Form>
                                )}
                                </Formik>
                </Grid>
                <AlertSnackbar
                    severity={severity}
                    message={message}
                    open={open}
                    handleClose={handleClose}
                />
                </Suspense>
            </ThemeProvider>
        );
        }
    } else{
        return (
            
            <ThemeProvider theme={theme}>
                <Suspense fallback={<Loader />}>
            <CssBaseline />
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    width={newWidth}
                    ml={1}
                    > 
                    <Grid item>
                    
                        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
                            <SupportAgentIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h5" sx={{my:2}}>
                            {i18next.t("Send a Message")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="p" variant="body2" sx={{my:2, ml:1}}>
                            {i18next.t("You need to log in to send a message to the support team")}
                        </Typography>
                    </Grid>
                      
                </Grid>
                </Suspense>
            </ThemeProvider>
        )
    }
};

export default TechnicalSupport;
