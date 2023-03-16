import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';


const theme = createTheme(themeOptions);

export const CreateEdusource= () =>{

   
    return(
        <React.Fragment>
             <ThemeProvider theme={theme}>
                CREATING EDUSOURCE
            </ThemeProvider>
        </React.Fragment>
        
    )
}