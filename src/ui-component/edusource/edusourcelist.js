import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, Button, Divider, Grid, IconButton } from '@mui/material';
import { shortDate } from 'src/utils/dateUtils';
import { useNavigate } from 'react-router-dom';


export default function EdusourceList(props) {

   const {edusource, newWidth} = props;
   const navigate = useNavigate();
   const subh =   edusource.discipline.charAt(0).toUpperCase() + edusource.discipline.slice(1) + ",  " + shortDate(edusource.date);
   const [hovering, setHovering] = React.useState(false);
   const handleEdusourceLink = (event)=>{
      navigate("/resources/"+ edusource.resourceURL);
   }

   const handlePromoterClick = (event)=>{
    navigate("/user/"+edusource.promoterId.username);
   }

   const imgstyles = {
    media: {
      height: 80,
      width: 142,
      objectFit:"cover",
      borderRadius:15,
      boxShadow: "1px 1px grey"
      
    }
    }


  if (newWidth>500){
    //console.log(newWidth)

    return (
        <>
       <Box component="main" 
         width={newWidth-32} 
         sx={{border:1, borderRadius:5,p:1, borderColor:'lightgray',
            '&:hover': {
            transform: 'scale(1.01) !important',
            zIndex: 10,
        },}}
    >
        <Grid 
            container
            direction="row"
            jjustifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item  xs="auto" >
                <img style={imgstyles.media} src={edusource.picture.fileName} alt="" />
            </Grid>
            <Grid item xs={9} sx={{ml:2, mt:-1}}>
                <Grid 
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    
                >
                    <Grid item>
                        <IconButton onClick={handlePromoterClick}>
                            <Avatar 
                                sx={{ bgcolor: red[500] }} 
                                aria-label="autorAvatar"
                                alt={edusource.promoterId.username}
                                src={edusource.promoterId.picture.fileName}
                                >
                                {edusource.promoterId.picture.fileName?<></>:<>{edusource.promoterId.username.charAt(1).toUpperCase()}</>}
                            </Avatar>
                    </IconButton>
                    </Grid>
                    <Grid item>
                        <Grid 
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Button variant="text" size='big' onClick={handleEdusourceLink}>{edusource.title}</Button>
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
                    {edusource.description}
                </Typography>
                <Typography variant='body2'>
                    <Button>{edusource.promoterId.username}</Button> <i>{edusource.theme[0]}</i>
                </Typography>
            </Grid>
        </Grid>
        <Divider />
        </Box>
        </>
    );
    } else { return(
        <>
    <Box component="main" 
         width={newWidth-32} 
         sx={{border:1, borderRadius:5,p:1, borderColor:'lightgray',
            '&:hover': {
            transform: 'scale(1.01) !important',
            zIndex: 10,
        },}}
    >
    <Grid 
        container
        direction="row"
        jjustifyContent="flex-start"
        alignItems="flex-start"
    >
        <Grid item  xs="auto" >
            <img style={imgstyles.media} src={edusource.picture.fileName} alt="" />
        </Grid>
        <Grid item xs={6} sx={{ml:2, mt:-1}}>
            <Grid 
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                
            >
                <Grid item>
                    <Grid 
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Button variant="text" size='big' onClick={handleEdusourceLink}>{edusource.title}</Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" gutterBottom sx={{pl:1}}>
                                {subh}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
        <Typography>
                {edusource.description}
            </Typography>
            <Typography variant='body2'>
                <Button onClick={handlePromoterClick}>{edusource.promoterId.username}</Button> <i>{edusource.theme[0]}</i>
            </Typography>
    </Grid>

    </Box>
    </>)
    }
}