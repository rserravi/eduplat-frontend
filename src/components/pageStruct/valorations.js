import * as React from 'react'
import { Avatar,  Button, Card, CardContent, CardHeader,  Grid, IconButton, Link, Paper, Typography} from '@mui/material'

import { longDate } from 'src/utils/dateUtils';
import { FavoriteIcon } from '../favorites';
import Image from 'mui-image';
import {  getRightPicture } from 'src/utils/picUtils';
import i18next from 'i18next';

export const ResourceValorations= (props) =>{
    const valorations = props.edusource.valorations;
    return(
        <>
        <Grid container>
        {valorations.map((valoration, index)=>{
            //console.log("VALORACIONES ", valoration)
                if (valoration.accepted){
                return(
                    <React.Fragment key={valoration._id}>
                        <Card sx={{ width: 240, mr:1, borderRadius:4}}>
                        <CardHeader
                            avatar={
                                <IconButton>
                                    <Avatar alt={valoration.senderUser} src={valoration.senderAvatar} />
                                </IconButton>
                            }
                            action={
                            <>
                                <FavoriteIcon value={valoration.value +1}/>
                            </>
                            }
                            title= {"@"+valoration.senderUser }
                            subheader={longDate(valoration.date)}
                        />
                         <CardContent>
                         <Typography variant='body1'>"<i>{valoration.comment}"</i></Typography>
                         </CardContent>
                     
                    </Card>
                </React.Fragment>
                )}
                else{
                    return(<React.Fragment key={index}></React.Fragment>)
                }
            })
        }
        </Grid>
        </>
    )

}

export const ExtendedResourceValorations = (props)=>{
    const {vals} = props;

    const showButton = (event)=>{
        //TODO
    }

    const hideButton = (event)=>{
        //TODO
    }

    return(
        <>

            <Paper 

                sx={{border:1, borderRadius:5,p:1, borderColor:'lightgray',
                    }}
                >
        
                <Grid container>
                    <Grid item xs={5} md={2} sx={{mr:2}}>
                        <Image src={getRightPicture(vals.eduPicture)} width={150} height={85} duration={0} sx={{borderRadius:5}} ></Image>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <Grid 
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            >
                             <Grid item>
                                    <Typography variant='h4' ><b>{vals.eduTitle}</b></Typography>
                            </Grid>
                            <Grid item >
                                    <Typography >{vals.eduDescription.substring(0,130)} ...</Typography><Button size='small'>{i18next.t("read more")}...</Button>
                            </Grid>
                           
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container alignItems="flex-end">
                                
                                <Avatar alt={vals.senderUser} src={getRightPicture(vals.senderPicture)}  sx={{ width: 24, height: 24 }} />
                                <Grid item>
                                    <Link ><i>@{vals.senderUser}</i></Link> {i18next.t("has commented the")} {longDate(vals.date)}
                                </Grid> 
                                
                            </Grid>
                            <Grid item>
                                <Typography variant='body2' mt={1}><i><b>"{vals.comment}"</b></i></Typography>
                                <FavoriteIcon value={vals.value+1} />
                            </Grid>
                <Button size='small' disabled={vals.accepted} onClick={showButton} color='success' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("show")}</Button>
                <Button size='small' disabled={!vals.accepted} onClick={hideButton} color='warning' variant='contained' sx={{ m:1, borderRadius:5 }} >{i18next.t("hide")}</Button>
                
            </Paper> 
             </>  
    )
}