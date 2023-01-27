import * as React from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';


const theme = createTheme(themeOptions);

export const LoginPage = () =>{
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                LOGIN PAGE
            </ThemeProvider>

        </React.Fragment>
    )
}