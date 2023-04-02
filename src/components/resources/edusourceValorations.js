import * as React from 'react'
import { Badge, Button, ButtonGroup, Grid, IconButton, Typography } from '@mui/material'
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import i18next from 'i18next';

export const EdusourceValorations= (props) =>{
    const {edusource} = props;
    const valorationNumber = edusource.valorations.length;

    const seeValorations = (e)=>{
        //TODO:
    }

    const addOk = (e) =>{
        //TODO:
    }

    const addNotOk = (e)=>{
        //TODO:
    }

    const reportBrokenLink = (e) =>{
        //TODO:
    }
    return(
        <>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <Typography variant='body1'>
                        {i18next.t("Value the resource")}
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
                            {i18next.t("Broken Link?")}
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </>
    )
}