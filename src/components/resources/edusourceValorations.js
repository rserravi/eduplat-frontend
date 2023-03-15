import * as React from 'react'
import { Badge, Button, ButtonGroup, Grid, IconButton, Typography } from '@mui/material'
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';

export const EdusourceValorations= (props) =>{
    const {edusource} = props;
    const valorationNumber = edusource.valorations.length;

    const seeValorations = (e)=>{

    }

    const addOk = (e) =>{

    }

    const addNotOk = (e)=>{

    }

    const reportBrokenLink = (e) =>{

    }
    return(
        <>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <Typography variant='body1'>
                        Value the resource
                    </Typography>
                </Grid>
                <Grid item>
                    <ButtonGroup>
                        
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
                        
                        <Button variant='text' onClick={reportBrokenLink}>
                            Broken Link?
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </>
    )
}