import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material'
import * as React from 'react'
import EduSourceCard from 'src/ui-component/edusource/edusourcecard'
import fakeLastResources from 'src/assets/fakeLists/lastResources'


export const Resources= (props) =>{
    var {edusourceList} = props;
    if (!edusourceList){
        
        edusourceList = fakeLastResources;
    }

    return (
        <>

        <Container maxWidth="xl"sx={{ display: 'flex', mt:2 }}>
            <CssBaseline />
            <Grid container >
                <Grid item sx={12} sm={12}>
                    <Typography variant='h2' component='h2'>
                        Last Resources
                    </Typography>
                </Grid>
                <Grid container sx={{mt:2, ml:2}} justifyContent="center" alignItems="flex-start">
                    {edusourceList.map((eduSource)=>{
                        return (
                            <Grid xs={12} sm={8} md={3} mb={2} >
                                <EduSourceCard 
                                    title={eduSource.title} 
                                    autor={eduSource.autor}
                                    autorAvatar={eduSource.autorAvatar} 
                                    date={eduSource.date} 
                                    discipline={eduSource.discipline} 
                                    extract={eduSource.extract}
                                    image={eduSource.image}
                                    labels={eduSource.labels}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        
     
  
            
        </Container>
        
        </>
    )
}