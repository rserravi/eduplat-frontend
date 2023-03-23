import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Button, Grid } from '@mui/material';
import { Container } from '@mui/system';


export default function EduSourceList(props) {

   const {title, autor, autorAvatar, date, discipline, extract, labels, valorations} = props;

   const subh =   discipline + ",  " + date;
   
   const handleEdusourceLink = (event)=>{

   }

  return (
    <>
    <Container component="main" >
    <Grid 
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        
    >
        <Grid item>
        <Avatar 
            sx={{ bgcolor: red[500] }} 
            aria-label="autorAvatar"
            alt={autor}
            src={autorAvatar}
            >
            {autorAvatar?<></>:<>{autor.charAt(1).toUpperCase()}</>}
          </Avatar>
          </Grid>
        <Grid item>
            <Grid 
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid item>
                    <Button variant="text" size='big' onClick={handleEdusourceLink}>{title}</Button>
                </Grid>
                <Grid item>
                    <Typography variant="body2" gutterBottom sx={{pl:1}}>
                        {subh}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Typography>
        {extract}
    </Typography>
    <Typography variant='body2'>
        <Button>{autor}</Button> <i>{labels}</i>
    </Typography>
    
    </Container>
    </>
);
}