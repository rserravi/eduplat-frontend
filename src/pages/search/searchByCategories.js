import { Box,  CssBaseline, Grid, Typography } from '@mui/material';
import * as React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const theme = createTheme(themeOptions);

export const SearchByCategories = () =>{

    const {terms} = useParams();

    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
            </ThemeProvider>
        </React.Fragment>
    )
}