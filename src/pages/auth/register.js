import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { Copyright } from 'src/components/pageStruct/copyright';
import { strengthColor, strengthIndicator } from 'src/utils/password-strength';
import { userGoogleRegistrationAPI } from 'src/api/userApi';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';


const theme = createTheme(themeOptions);

export const RegisterPage = () =>{
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

    const handleGoogle = async (response) => {
        const result = await userGoogleRegistrationAPI(response);
        console.log('AHORA CARGAMOS LA PÁGINA DE EDICIÓN DE USUARIO');
        console.log(result);
    };
    
    useEffect(() => {
        /* global google */
        const googleId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
        if (window.google) {
            google.accounts.id.initialize({
                client_id: googleId,
                callback: handleGoogle
            });

            google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
                //type: 'standard',
                theme: 'outline',
                // size: "small",
                text: 'signup_with',
                shape: 'square'
            });
            //google.accounts.id.prompt();
        }
    }, [handleGoogle]);

    useEffect(() => {
        changePassword('123456');
    }, []);
    
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
                    }}
                    >
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            FUTSTATS
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            FUTSTATS
                        </Typography>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>

                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                        <Grid item xs={12} sm={12} sx={{mt:5}}>
                            <Typography variant="body2">
                                If you have a Google / Gmail account, register here
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{mt:2}}>
                            <div id="signUpDiv" data-text="signup_with"></div>
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{mt:2}}>
                            <Typography variant="body2">
                            or sign up with Email address:
                            </Typography>
                        </Grid>
                    </Grid>
                    
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign Up
                        </Button>
                        
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}