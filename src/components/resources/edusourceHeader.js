import * as React from 'react'
import {  Avatar,  Box,  Grid, Link, Typography } from '@mui/material'
import {Image} from 'mui-image';
import { longDate } from 'src/utils/dateUtils';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';

export const EdusourceHeader= (props) =>{
    const {edusource, promoter, newWidth} = props;

    const visitAutor= (e)=>{
        console.log("VISIT", e.target.textContent)
    }


    if (newWidth>500){

        return (
            <React.Fragment>
                 <Typography variant="h2" component="h1" sx={{mb:1}}>
                    {edusource.title}
                </Typography>
                <Box component="main" 
                    width={newWidth-32} 
                    sx={{border:1, borderRadius:5,p:1, borderColor:'lightgray',
                        }}
                    >
            
                <Grid container>
                <Grid item sx={{mr:2}}>
                    <Image src={edusource.picture.fileName} width={150} height={85} duration={0} sx={{borderRadius:5}} ></Image>
                </Grid>
                <Grid item>
                <Grid 
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    >
 
                    <Grid container alignItems="flex-end">
                        <Avatar alt={promoter.firstname + " " + promoter.lastname} src={promoter.picture.fileName}  sx={{ width: 24, height: 24 }} />
                        <Typography variant="body1" onClick={visitAutor}>
                            <Link href={"/user/" + promoter.username} > @{promoter.username}</Link>, {i18next.t("level")}: <i style={{color:themeOptions.palette.primary.main}}>{promoter.editingLevel}</i>, {i18next.t("karma")}: <i style={{color:themeOptions.palette.primary.main}}>{promoter.karma}</i>
                        </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant="body1">
                        {i18next.t("Category")}: <Link href={'/discipline/'+edusource.discipline}>{edusource.discipline}</Link> - ( 
                        {edusource.theme?
                                edusource.theme.map((tema, index)=>{
                                    
                                    return(<React.Fragment key={index}><i><Link href={"/theme/" + tema}> #{tema} </Link></i></React.Fragment>)
                                })
                            :<></>}
                        )
                    </Typography>
                    </Grid>
                    <Typography variant="body1">
                        {i18next.t("Authors")}: 
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
                </Box> 

            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>               
                <Typography variant="h2" component="h1" sx={{mb:1}}>
                    {edusource.title}
                </Typography>
                <Box component="main" 
                    width={newWidth-32} 
                    sx={{border:1, borderRadius:5,p:1, borderColor:'lightgray',
                        }}
                    >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    >
                        
                    <Grid item xs="auto" sx={{mr:2}}>
                        <Image src={edusource.picture.fileName} width={120} height={68} duration={0} sx={{borderRadius:5}} ></Image>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid 
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            >                    
                            <Grid item>
                            <Avatar alt={promoter.firstname + " " + promoter.lastname} src={promoter.picture.fileName}  sx={{ width: 24, height: 24 }} />
                            </Grid>
                            <Grid item sx={{mr:1}}>
                            <Typography variant="body1" onClick={visitAutor}>
                                <Link href={"/user/" + promoter.username} > @{promoter.username}</Link> 
                            </Typography>
                            </Grid>
                            <Grid item sx={{mr:1}}>
                            {i18next.t("level")}: <i style={{color:themeOptions.palette.primary.main}}>{promoter.editingLevel}</i>,
                            </Grid>
                            <Grid item sx={{mr:1}}>
                            {i18next.t("karma")}: <i style={{color:themeOptions.palette.primary.main}}>{promoter.karma}</i>
                            </Grid>
                        </Grid>     
                    </Grid>
                    <Grid item sx={{mt:1}}> 
                    <Typography variant="body1">
                        {i18next.t("Category")}: <Link href={'/discipline/'+edusource.discipline}>{edusource.discipline}</Link> - ( 
                        {edusource.theme?
                                edusource.theme.map((tema, index)=>{
                                    
                                    return(<React.Fragment key={index}><i><Link href={"/theme/" + tema}> #{tema} </Link></i></React.Fragment>)
                                })
                            :<></>}
                        )
                    </Typography>
                    </Grid>
                    <Typography variant="body1">
                        {i18next.t("Authors")}: 
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
                </Box>         

            </React.Fragment>
        )
    }
}
