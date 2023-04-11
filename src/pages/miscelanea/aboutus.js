import { CssBaseline } from '@mui/material';
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const theme = createTheme(themeOptions);

export const AboutUs = () =>{


    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                ABOUT US
                ABOUT US
                ABOUT US
                ABOUT US
                ABOUT US
                ABOUT US
                ABOUT US
                ABOUT US

            </ThemeProvider>
        </React.Fragment>
    )
}