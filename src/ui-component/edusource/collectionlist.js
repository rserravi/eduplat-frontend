import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, Button, Divider, Grid, IconButton, Link } from '@mui/material';
import { longDate } from 'src/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { getHeadShot, getRightPicture } from 'src/utils/picUtils';
//import i18next from 'i18next';


export default function CollectionList(props) {

   const {collection, newWidth} = props;
   const navigate = useNavigate();
   const subh =  longDate(collection.date);
   //const [hovering, setHovering] = React.useState(false);
   const handlecollectionLink = (event)=>{
      navigate("/resources/"+ collection.resourceURL);
   }

   //console.log("collection en collectionList", collection)

   const handlePromoterClick = (event)=>{
    navigate("/user/"+collection.promoterId.username);
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
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid item  xs="auto" >
                <img style={imgstyles.media} src={getRightPicture(collection.picture)} alt="" onClick={handlecollectionLink}/>
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
                                alt={collection.promoterId.username}
                                src={getHeadShot(collection.promoterId)}
                                >
                                {collection.promoterId.picture.fileName?<></>:<>{collection.promoterId.username.charAt(1).toUpperCase()}</>}
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
                                <Button variant="text" size='big' onClick={handlecollectionLink}>{collection.title}</Button>
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
                    {collection.description}
                </Typography>
                <Typography variant='body2'>
                    <Button onClick={handlePromoterClick}>{collection.promoterId.username}</Button>  {collection.type} </Typography>
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
        justifyContent="flex-start"
        alignItems="flex-start"
    >
        <Grid item  xs="auto" >
            <img style={imgstyles.media} src={collection.picture.fileName} alt="" />
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
                            <Button variant="text" size='big' onClick={handlecollectionLink}>{collection.title}</Button>
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
                {collection.description}
            </Typography>
            <Typography variant='body2'>
                <Button onClick={handlePromoterClick}>{collection.promoterId.username}</Button> 
            </Typography>
    </Grid>

    </Box>
    </>)
    }
}