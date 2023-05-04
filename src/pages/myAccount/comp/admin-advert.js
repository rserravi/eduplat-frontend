import { CheckBox } from '@mui/icons-material';
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react'
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';

const initAdvert = {
    "TextEN": "",
    "TextES": "",
    "TextIT": "",
    "TextCA": "",
    "TextPT": "",
    "TextFR": "",
    "Active": false,
    "From": Date.now,
    "To": Date.now,
}

export const AdminAdvertsControl= (props) =>{
    const {user} = props;
    const [newWidth] = useOutletContext();
    const [advert, setAdvert] = useState()
   

    if (user.isBoss){
    return(
        <>
  
            <Typography variant='h3'>Anuncios</Typography>

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              
              mt={1}
            >
              <Grid item>
                <TextField
                    label="Advert Text In English"
                    multiline
                    fullWidth
                    rows={4}
                />
               


              </Grid>
                    
                
            </Grid>
            <Divider />
            

        </>
    )
    }{
    return(
        <>
            <Typography variant='h3'>NOT AUTHORIZED</Typography>
        </>
    )

    }


    
}