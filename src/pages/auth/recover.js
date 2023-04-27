import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { Alert, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setNewPassword } from 'src/api/userApi';



const theme = createTheme(themeOptions);

const validationSchema = Yup.object({
    password: Yup.string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

const PasswordField = ({ showPassword, toggleShowPassword, ...props }) => (
    <TextField
        type={showPassword ? 'text' : 'password'}
        sx={{ mt:1,
            '& fieldset': {
            borderRadius: '20px',
        },}}
        InputProps={{
        endAdornment: (
            <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            </InputAdornment>
        ),
        }}
        {...props}
    />
);

export const RecoverPassword = (props) =>{
    const {pin, email} = useParams();
    const [msg, setMsg]= React.useState("");
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
  
    const formik = useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: async (values) => {
       // alert(JSON.stringify(values, null, 2));
      
             
              await setNewPassword(email, pin, values.password).then((result)=>{
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
        


      },
    });


    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

    const isDisabled = (errors.confirmPassword && touched.confirmPassword) || (values.password==="" || values.confirmPassword==="")
    
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
                        {i18next.t("Password recovery")}
                    </Typography>


                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <Grid item mt={3}>
                                <Typography align="center">
                                {i18next.t("Write a new Password")}.
                                </Typography>
                            </Grid>
                            <form onSubmit={handleSubmit}>
                                <Grid item mt={3}>
                                <PasswordField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    showPassword={showPassword}
                                    toggleShowPassword={toggleShowPassword}
                                />
                                </Grid>
                                <Grid item mt={1}>
                                <PasswordField
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    showPassword={showPassword}
                                    toggleShowPassword={toggleShowPassword}
                                />
                                </Grid>
                                <Grid item my={2}>
                                    <Button disabled={isDisabled} variant='outlined' sx={{borderRadius:5}} type="submit">{i18next.t("Submit")}</Button>
                                </Grid>
                            </form>
                            


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