import * as React from 'react'
import { Avatar, Card, CardContent, CardHeader,  Grid, IconButton, Typography} from '@mui/material'

import { longDate } from 'src/utils/dateUtils';
import { FavoriteIcon } from '../favorites';

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