import { Box, CssBaseline } from '@mui/material';
import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const theme = createTheme(themeOptions);

export const Cookies = () =>{


    return (
        <React.Fragment>
             <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{p:2}}>
                <h1>Cookies</h1>
<div>
<div>
<div>
<div>
<div>
<section>
<div>
<div>
<div>
<div>
<div>
<div>
<p>The use of cookies on Eduplat Internet sites.</p>
<p>This page explains what cookies are and the types of cookies used by Eduplat on its Internet sites.</p>
<h2>What is a cookie?</h2>
<p>Cookies are small files which Internet sites place on your computer hard disk when you visit them for the first time.</p>
<p>A cookie is like a key which is unique to you. Its job is to create a link between your computer and a site and to tell the site that you are a returning visitor.</p>
<p>Cookies can help you to be more efficient and benefit from &laquo;&nbsp;memory&nbsp;&raquo; functions such as when a site remembers your shopping basket from a previous visit.</p>
<p>Cookies enable you to store your preferences, to save products and services and to customise pages.</p>
<h2>Does Eduplat use cookies on its Internet Sites?</h2>
<p>Yes. Eduplat uses cookies on its sites in order to provide services and functionalities to its users.</p>
<p><strong>You can restrict or disable the use of cookies via your Internet browser but without cookies you will not be able to use all the functionalities of our sites.</strong></p>
<h2>What types of cookies are used on Eduplat Internet sites?</h2>
<ul>
<li><strong>Strictly necessary cookies</strong><br />Cookies which are essential for the management of your connection status.</li>
<li><strong>Functional Cookies</strong><br />These cookies enable an Internet site to remember your previous actions in order to provide you with advanced functionalities.</li>
<li><strong>Analytical Cookies</strong><br />These cookies enable us to collect data about your use of an Internet site in order to improve its performance and design. To disable Google Analytics cookies, please download and install <a href="http://tools.google.com/dlpage/gaoptout">this plugin</a>.</li>
</ul>
<h2>How can I disable or delete cookies?</h2>
<p>Every Internet browser provides ways to limit and delete cookies.</p>
<p>For further information on how to manage cookies, click on the appropriate link below or get information on the settings of your browser if it is not in this list.</p>
<ul>
<li><a href="http://windows.microsoft.com/en-GB/windows7/How-to-manage-cookies-in-Internet-Explorer-9">Explorer Internet (9)</a></li>
<li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer?redirectlocale=en-US&amp;redirectslug=Cookies">Firefox</a></li>
<li><a href="https://support.google.com/accounts/answer/61416">Google Chrome</a></li>
<li><a href="http://support.apple.com/kb/PH17191">Safari</a></li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
</div>
</div>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}