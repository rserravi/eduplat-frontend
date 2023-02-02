// material-ui
import { useTheme } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { Typography } from '@mui/material';
import React from 'react';


// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme(themeOptions);

    return (
        <React.Fragment>
        <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
        >
            FUTSTATS
        </Typography>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
        >
            FUTSTATS
        </Typography>
        </React.Fragment>
    );
};

export default Logo;
