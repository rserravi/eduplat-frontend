import * as React from 'react'
import { Avatar, Card, CardContent, CardHeader,  Grid, IconButton} from '@mui/material'

import ThumbUpOffAltTwoToneIcon from '@mui/icons-material/ThumbUpOffAltTwoTone';
import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';
import { longDate } from 'src/utils/dateUtils';


export const ResourceValorations= (props) =>{
    const valorations = props.edusource.valorations;
    return(
        <>
        <Grid container>
        {valorations.map((valoration)=>{
            console.log("VALORACIONES ", valoration)
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
                                {valoration.value>0?<ThumbUpOffAltTwoToneIcon />:<ThumbDownOffAltTwoToneIcon />}
                            </>
                            }
                            title= {"@"+valoration.senderUser }
                            subheader={longDate(valoration.date)}
                        />
                         <CardContent>
                         {valoration.comment}
                         </CardContent>
                     
                    </Card>
                </React.Fragment>
                )
            })
        }
        </Grid>
        </>
    )

}