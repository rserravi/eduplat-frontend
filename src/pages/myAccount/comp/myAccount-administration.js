import { Box, Button, ButtonGroup, Divider, Grid, Typography } from '@mui/material';
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
            <Box border={1} borderRadius={10} p={2} my={2}>

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
                            justifyContent="space-between"
                            alignItems="center"
                            columnSpacing={1}
                            rowSpacing={1}
                        >
                            <Grid item mr={2} xs={2}>
                                <Typography variant='h4'>Communication</Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <ButtonGroup>
                                    <Button variant='contained' sx={{borderRadius:5}}  onClick={(e)=>{e.preventDefault();setTab("Adverts")}} >Adverts and alerts</Button>
                                    <Button variant='contained' sx={{borderRadius:5}} onClick={(e)=>{e.preventDefault();setTab("SendEmail")}}  > Send Email</Button>                            
                                    <Button variant='contained' sx={{borderRadius:5}} onClick={(e)=>{e.preventDefault();setTab("SendMassiveEmail")}} >Send massive email</Button>
                                </ButtonGroup>
                            </Grid>
                        
                            <Grid item mr={2} xs={2}>
                                <Typography variant='h4'>Events</Typography>
                            </Grid>
                           <Grid item xs={10}>
                                <ButtonGroup>
                                    <Button variant='contained' sx={{borderRadius:5}}  onClick={(e)=>{e.preventDefault();setTab("CreateEvent")}}  >Create</Button>
                                    <Button variant='contained' sx={{borderRadius:5}}  onClick={(e)=>{e.preventDefault();setTab("EditEvent")}}  >Edit</Button>
                                    <Button variant='contained' sx={{borderRadius:5}}  onClick={(e)=>{e.preventDefault();setTab("SeeEvents")}}  >See programmed event</Button>
                                </ButtonGroup>
                            </Grid>

                            <Grid item mr={2} xs={2}>
                                <Typography variant='h4'>Statistics</Typography>
                            </Grid>
                            <Grid item xs={10}>
                            <Button variant='contained' sx={{borderRadius:5}}  onClick={(e)=>{e.preventDefault();setTab("Statistics")}}  >See</Button>
                            </Grid>
                        
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Box>
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