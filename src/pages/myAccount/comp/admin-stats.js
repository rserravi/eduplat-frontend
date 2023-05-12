import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';
import { useOutletContext } from 'react-router-dom';
import { StatsUserTable } from './stats-comps/stats-usertable';

const theme = createTheme(themeOptions);

export const AdminStats = (props) =>{
    const [newWidth] = useOutletContext();

    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{width: newWidth}}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="center"
                        >

                        <Grid item xs={8}>
                        <Typography variant='h3'>
                            {i18next.t("Users table")}
                        </Typography>
                        </Grid>   
                        <StatsUserTable />
                    </Grid> 
              
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}