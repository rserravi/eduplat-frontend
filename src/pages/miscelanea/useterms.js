import { CssBaseline } from '@mui/material';
import * as React from 'react'
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const theme = createTheme(themeOptions);

export const UseTerms = () =>{


    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
            </ThemeProvider>
        </React.Fragment>
    )
}