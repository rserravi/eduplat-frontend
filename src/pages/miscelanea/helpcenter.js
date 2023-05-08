import { Box, CssBaseline, Typography } from '@mui/material';
import * as React from 'react'
import Loader from 'src/ui-component/Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TechnicalSupport from './techincal-support';

const theme = createTheme(themeOptions);

export const HelpCenter = () =>{


    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        p:2
                    }}
                    >
                 <Typography mb={2} variant='h2' component='h2'>
                    {i18next.t("Help Center")}
                 </Typography>

                 <Typography mb={2}variant='body1' component='p'>
                    {i18next.t("Welcome to Eduplat Help Center. Here, you will find a FAQ and answers to some common doubts. If ypu don find what you need, dont hesitate on writing us")}
                 </Typography>

                 <Typography mb={2} variant='h3' component='h3'>
                    {i18next.t("FAQ")}
                 </Typography>
                 <Accordion mb={2}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>{i18next.t("I cant log in with my Google Account")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        {i18next.t("Make sure that you are in the safe address https://eduplat.org.es. Google need safe addresses to allow the login")}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>{i18next.t("Why my resource is not showing")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        {i18next.t("Some webistes do not allow their resources to be shown in other websites. In this case, you can use the 'visit' button.")}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography>{i18next.t("If I register, I'm going to receive lots of mails?")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                       {i18next.t("Of course not. We are a non proffit organization, so we do not need to do aggressive marketing. You are safe with us. You can read our Terms and Conditions here.")} 
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                    >
                    <Typography>{i18next.t("Who are you?")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        {i18next.t("Eduplat.org and the FRRE are non profit initiatives under the NGO BienesDar. The Association's mission is to improve the welfare of society by sharing activities, resources, skills and knowledge.")}
                        
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Typography my={2} variant='h3' component='h3'>
                    {i18next.t("Videos")}
                 </Typography>
                 <Typography my={2} variant='h4' component='h4'>
                    {i18next.t("How to share Google Documents")}
                 </Typography>
                 <iframe width="560" height="315" referrerpolicy="no-referrer-when-downgrade" src="https://www.youtube.com/embed/fV_hbCl31G0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                 <Typography my={2} variant='h4' component='h4'>
                    {i18next.t("How to share a Kahoot")}
                 </Typography>
                 <iframe width="560" height="315" referrerpolicy="no-referrer-when-downgrade"  src="https://www.youtube.com/embed/gddd_aMpM7Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                 <TechnicalSupport />
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}