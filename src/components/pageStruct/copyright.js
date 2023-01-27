import * as React from 'react';
import { Typography } from "@mui/material";
import {Link} from "@mui/material";


export const Copyright = (props)=> {
    return (
        <React.Fragment>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://rubotic.com/">
                    Rubotic.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </React.Fragment>
    );
  }
  