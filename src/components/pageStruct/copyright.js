import * as React from 'react';
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Link} from "@mui/material";
import Logo from 'src/ui-component/Logo';
import { FollowUs } from './sharebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';


const theme = createTheme(themeOptions);

export const Copyright = (props)=> {
    const {short} = props;

    if (short) {
        return (
            <>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                        {'Copyright © '}
                        <Link color="inherit" href="https://eduplat.org/">
                            EduPlat.org
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
            </>
        )
    }
    else
    return (
        <React.Fragment>
             <ThemeProvider theme={theme} >
            <Box sx={{ display: 'flex', backgroundColor:'primary.light', maxWidth:"xs" }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{my:2}}
                >
                <Grid  md={2} xs={12} p={2}>
                    <Grid 
                        container
                        direction="column"
                        alignItems="center"
                        >
                        <Grid item>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Logo color="black" />
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <Logo color="black" size="350"/>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant='body2'>{i18next.t("Follow us")}</Typography>
                        </Grid>
                        <Grid item>
                            <FollowUs />
                        </Grid>


                    </Grid>
                </Grid>
                <Grid  md={2} xs={12} p={2}>
                    <Grid 
                        container
                        direction="column"
                        alignItems="center"
                        >
                        <Grid item>
                            <Link href='/legal/helpcenter' underline="hover">
                            <Typography>{i18next.t("Help Center")}</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='/legal/useterms' underline="hover">
                            <Typography>{i18next.t("Use Terms")}</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='/legal/privacity' underline="hover">
                            <Typography>{i18next.t("Privacity")}</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='/legal/cookies' underline="hover">
                            <Typography>{i18next.t("Cookies")}</Typography>
                            </Link>
                        </Grid>

                    </Grid>
                </Grid>
               
                <Grid  md={2} xs={12} p={2}>
                    <Grid 
                        container
                        direction="column"
                        alignItems="center"
                        >
                        <Grid item>
                            <Link href='https://www.bienesdar.org/' target="_blank" rel="noopener" underline="hover">
                            <Typography>Bienesdar.org</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='https://eduplat.org/' target="_blank" rel="noopener" underline="hover">
                            <Typography>Eduplat.org</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='https://eduplat.org/es/feriarecursoseducativos/' underline="hover">
                            <Typography>{i18next.t("Events")}</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href='https://docs.google.com/forms/d/e/1FAIpQLScCMmoGNuMGmMGQdsUGqtSqO-UhzQZrMey9UgEBjWSJd4KHHw/viewform/' target="_blank" rel="noopener" underline="hover">
                            <Typography>{i18next.t("How to collaborate?")}</Typography>
                            </Link>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid md={12} xs={12} sx={{my:2}}>
                    <Typography variant="body2" color="text.secondary" align="center" {...props}>
                        {'Copyright © '}
                        <Link color="inherit" href="https://eduplat.org/" target="_blank" rel="noopener" underline="hover">
                            EduPlat.org
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Grid>
            
        </Grid>
        </Box>
        </ThemeProvider>
        </React.Fragment>
    );
  }
  