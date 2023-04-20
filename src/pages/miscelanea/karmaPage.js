import { Box, CssBaseline, Typography } from '@mui/material';
import * as React from 'react'
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';

const theme = createTheme(themeOptions);

export const KarmaPage = () =>{


    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{p:2}}>
                <Typography variant='h2'>Karma:</Typography>
                <Typography variant='body1' mt={2}>{i18next.t("You will win Karma for any good deed that you do en Eduplat.")}</Typography>
                <Typography variant='body1' >{i18next.t("You will gain levels as your karma improves.")} {i18next.t("Those are the avaliable levels:")}</Typography>
                <Typography variant='body1'>
                <ul>
                <li>0-250 Karma -&gt; {i18next.t("Enthusuatic Newbie")}</li>
                <li>251-500 Karma -&gt; {i18next.t("Curious Explorer")}</li>
                <li>501-1000 Karma -&gt; {i18next.t("Publication Hunter")}</li>
                <li>1001-2000 Karma -&gt; {i18next.t("Publication Master")}</li>
                <li>2001-3000 Karma -&gt; {i18next.t("Publication Ninja")}</li>
                <li>3001-4000 Karma -&gt; {i18next.t("Eduplatter boss")}</li>
                <li>4001-5500 Karma -&gt; {i18next.t("Eduplatter magician")}</li>
                <li>5501-7000 Karma -&gt; {i18next.t("Eduplatter master")}</li>
                <li>7001-8500 Karma -&gt; {i18next.t("Eduplatter supreme master")}</li>
                <li>8501-10000 Karma -&gt;{i18next.t("Eduplatter deity")}</li>
                </ul>
                </Typography>
                <Typography variant='body1'>{i18next.t("In each level, you will win a new look for your main page, and privileges for editing.")}</Typography>
                <Typography variant='h4'>{i18next.t("Enjoy, and keep the good karma up.")}</Typography>

                </Box> 
            </ThemeProvider>
        </React.Fragment>
    )
}