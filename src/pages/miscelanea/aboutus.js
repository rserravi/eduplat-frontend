import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';
import Image from 'mui-image';
import logoColor from 'src/assets/images/Eduplat-horizontal.png'
import bienesdar from 'src/assets/images/logo-bienesdar-horizontal.png'
import europe from 'src/assets/images/EN-Co-Funded-by-the-EU_POS.png'

const theme = createTheme(themeOptions);
var newWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


export const AboutUs = () =>{


    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{width: newWidth}}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '50vh' }}
                    >

                    <Grid item xs={8}>
                    <Typography variant={newWidth>500?'h5':'h3'}>
                        {i18next.t("About us text")}
                    </Typography>
                    </Grid>   
                    
                    </Grid> 
                <Grid
                 container
                 spacing={0}
                 direction="row"
                 alignItems="center"
                 justifyContent="center"
                >
                    <Grid item xs={3}>
                        <Grid container direction="column" alignItems="center" justifyContent="center">
                            <Grid item>
                                {i18next.t("Organized by")}
                            </Grid>
                            <Grid item>
                                <Image src={logoColor} duration={325} height={40}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                            <Grid item>
                                {i18next.t("Promoted by")}
                            </Grid>
                            <Grid item>
                                <Image src={bienesdar} duration={325}  height={40}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                            <Grid item>
                                {i18next.t("Subsidized by")}
                            </Grid>
                            <Grid item>
                                <Image src={europe} duration={325}  height={40}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
                    </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}