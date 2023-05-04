import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import * as React from 'react'
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';
//npm buimport _ from 'lodash';

import { ResourcesNetflixGrid } from 'src/components/resources/resources';
import { AdminAdvertsControl } from './admin-advert';

export const MyAccountAdministration= (props) =>{
    const {user} = props;
    const [newWidth] = useOutletContext();
    const [tab, setTab]= useState("Adverts");
   

    if (user.isBoss){
    return(
        <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minWidth: {newWidth} -32,
                p:2
            }}
        > 
            <Typography variant='h3'>Administration</Typography>

            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              
              mt={1}
            >
                <Grid item>
                    <Grid 
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid item mr={2}>
                            <Typography variant='h4'>Comunicación</Typography>
                        </Grid>
                        <Grid item>
                            <Button  >Anuncios</Button>
                        </Grid>
                        <Grid item>
                            <Button  >Texto Portada</Button>
                        </Grid>
                        <Grid item>
                            <Button  > Enviar Email</Button>
                        </Grid>
                        <Grid item>
                            <Button  >Email masivo</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid 
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid item mr={2}>
                            <Typography variant='h4'>Eventos</Typography>
                        </Grid>
                        <Grid item>
                            <Button  >Crear</Button>
                        </Grid>
                        <Grid item>
                            <Button  >Editar</Button>
                        </Grid>
                        <Grid item>
                            <Button  >Ver eventos</Button>
                        </Grid>
                     
                    </Grid>
                </Grid>
                
            </Grid>
            <Divider />
            {tab==="Adverts"?<><AdminAdvertsControl user={user} /> </>:<></>}

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