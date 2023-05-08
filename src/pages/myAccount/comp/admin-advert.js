import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
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
  
            <Typography variant='h3'>Adverts</Typography>
            <Box border={1} borderRadius={10} p={2} my={2}>
            <Typography variant='h4'>
                    Advert to be shown in the main page
                </Typography>
                <FormControlLabel control={<Checkbox  />} label="Enable main page advert" />

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              
              mt={1}
            >
             <Grid item>
                
             </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In English"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Spanish"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Italian"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Portuguese"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Catalan"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In French"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              
                    
                
            </Grid>
            <Divider />
            <Typography variant='h4'>
                    Advert to be shown in all pages, in the footer over the copyright.
                </Typography>
                <FormControlLabel control={<Checkbox  />} label="Enable footer advert" />

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              
              mt={1}
            >
             <Grid item>
                
             </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In English"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Spanish"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Italian"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Portuguese"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In Catalan"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              <Grid item>
                <TextField
                    label="Advert Text In French"
                    multiline
                    fullWidth
                    rows={4}
                />
              </Grid>
              
                    
                
            </Grid>
            <Divider />
            </Box>
            

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