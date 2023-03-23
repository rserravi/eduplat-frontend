import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Avatar, Badge,  Grid, Paper, styled } from '@mui/material';
import { SocialRow } from './socialRow';


export const UserCard =(props) =>{

  const {user} = props;

  //console.log("RECIBIDO USER EN USERCARD", user)

  const navigation = (payload) =>{
    console.log(payload)
    window.open(payload);
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 0,
      top: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


  return (
    <Paper sx={{m:1, p:1, borderRadius:5, '&:hover': {
            transform: "scale(1.01) !important",
            zIndex: 4,
          }}}>
       
        <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{p:1}}
        >
            <Grid item xs="auto">
                <IconButton 
                    size='small' 
                    onClick={(e)=>{e.preventDefault(); navigation("/user/"+user.username)}}
                >
                <Avatar alt={user.username} src={user.picture.fileName}/>
                </IconButton>
            </Grid>
            <Grid item xs={10} sx={{ml:1}}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography 
                            variant='body2' 
                            onClick={(e)=>{e.preventDefault(); navigation("/user/"+user.username)}}
                            sx={{
                                fontWeight:"bold", 
                                fontSize:18, 
                                '&:hover': {
                                    textDecoration:"underline",
                                    cursor: "pointer"
                                    }
                                }}
                            >
                                {user.publicData.name?user.firstname + " " + user.lastname: user.username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography 
                            variant='body2'  
                            sx={{
                                fontWeight:"bold",
                                '&:hover': {
                                    textDecoration:"underline",
                                    cursor: "pointer"
                                    }
                            }}
                        >{user.publicData.name? "@"+ user.username:<></>}</Typography>
                    </Grid>
                    <Grid item > 
                        <Typography variant='body2' color="secondary">{user.job.position} at {user.job.workplace}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{
                            mt:1,
                            ml:2,
                            fontStyle:"italic"
                        }}>"{user.tagline}"</Typography>
                    </Grid>
                    <Grid item sx={{mt:1}}>  
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Grid item>
                                <Typography>Karma: {user.karma}. - Level: {user.editingLevel}</Typography>
                            </Grid>
                            <Grid item sx={{ml:2}}>
                                <SocialRow user={user} type={"default"}/>
                            </Grid>
                        </Grid>        
                    </Grid>

                        <Grid item sx={{ml:-1}}>
                            <StyledBadge color="secondary" badgeContent={user.resourcesCount} sx={{mr:1}}>
                            <Typography color="primary" ><b>Resources</b></Typography>
                            </StyledBadge>
                            <StyledBadge color="secondary" badgeContent={user.collectionsCount} sx={{mr:1}}>
                            <Typography sx={{ml:2}} color="primary" ><b>Collections</b></Typography>
                            </StyledBadge>
                            <StyledBadge color="secondary" badgeContent={user.valorationsCount} sx={{mr:1}}>
                            <Typography sx={{ml:2}} color="primary" ><b>Valorations</b></Typography>
                            </StyledBadge>
                        </Grid>

                </Grid>
            </Grid>

        </Grid>

    </Paper>

  );
}