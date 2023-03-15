import * as React from 'react'
import {  Avatar,  Grid, Link, Typography } from '@mui/material'
import {Image} from 'mui-image';
import { longDate } from 'src/utils/dateUtils';
import { themeOptions } from 'src/theme/theme';

export const EdusourceHeader= (props) =>{
    const {edusource, promoter} = props;
   
    console.log(promoter);

    const visitAutor= (e)=>{
        console.log("VISIT", e.target.textContent)
    }

    return (
        <React.Fragment>
         
            <Grid container>
            <Grid item sx={{mr:2}}>
                <Image src={edusource.picture.fileName} width={150} duration={0} sx={{borderRadius:5}} ></Image>
            </Grid>
            <Grid item>
            <Grid 
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                >
                
                    
                <Grid item>
                <Typography variant="h2" component="h1" sx={{mb:1}}>
                    {edusource.title}
                </Typography>
                </Grid>
                <Grid container alignItems="flex-end">
                    <Avatar alt={promoter.firstname + " " + promoter.lastname} src={promoter.picture.fileName}  sx={{ width: 24, height: 24 }} />
                    <Typography variant="body1" onClick={visitAutor}>
                        <Link href={"/user/" + promoter.username} > @{promoter.username}</Link>, level: <i style={{color:themeOptions.palette.primary.main}}>{promoter.editingLevel}</i>, karma: <i style={{color:themeOptions.palette.primary.main}}>{promoter.karma}</i>
                    </Typography>
                </Grid>
                <Grid item>
                <Typography variant="body1">
                     Category: <Link href={'/discipline/'+edusource.discipline}>{edusource.discipline}</Link> - ( 
                     {edusource.theme?
                            edusource.theme.map((tema, index)=>{
                                
                                return(<React.Fragment key={index}><i><Link href={"/theme/" + tema}> #{tema} </Link></i></React.Fragment>)
                            })
                        :<></>}
                     )
                </Typography>
                </Grid>
                <Typography variant="body1">
                    Autors: 
                    {edusource.autors.map((autor, index)=>{
                        return (<React.Fragment key={index}>
                                &nbsp; <Link  href='/'>@{autor.autorName}</Link>
                                </React.Fragment>
                        )
                    })}
                    
                </Typography>
                <Typography>
                    <i>
                {longDate(edusource.date)}
                    </i>
                </Typography>
            </Grid> 
            </Grid>     

            </Grid>
                 

        </React.Fragment>
    )
}
