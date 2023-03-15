import * as React from 'react'
import { Avatar, Badge, Button, Card, CardActions, CardHeader, Chip, Grid, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';


export const PromoterCard= (props) =>{
    const {promoter} = props;
    const valorationNumber = promoter.valorations.length;

    const visitPromoter = (e)=>{
        console.log("VISIT", e.target.textContent)
    }

    const seeValorations = (e)=>{

    }

    const addOk = (e) =>{

    }

    const addNotOk = (e)=>{

    }

    return (
        <React.Fragment>
            <Grid 
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Card>
                <CardHeader
                    avatar={
                       
                    <Avatar  aria-label="avatarimage" src={promoter.picture.fileName} onClick={visitPromoter}>
                        
                    </Avatar>
                   
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={"by " + promoter.firstname + " "+ promoter.lastname + " @"+ promoter.username}
                    subheader={"Level: master"}
                />
                 

                 <CardActions disableSpacing>
                        
                        <Button variant='text' onClick={seeValorations}>
                            <Badge color="secondary" badgeContent={valorationNumber} showZero max={99}>
                                <CommentTwoToneIcon />
                            </Badge>
                        </Button>
                    
                        <IconButton onClick={addOk}>
                            <ThumbUpAltTwoToneIcon color='secondary'/>
                        </IconButton>
                        <IconButton onClick={addNotOk}>
                            <ThumbDownAltTwoToneIcon color='primary'/>
                        </IconButton>
                        <Chip label="Karma: 1000" color="secondary"></Chip>
                </CardActions>
                 </Card>
            </Grid>

        </React.Fragment>
    )
}
