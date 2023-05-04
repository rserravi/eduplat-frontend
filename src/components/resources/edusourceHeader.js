import * as React from 'react'
import {  Avatar,  Box,  Grid, Link, Typography } from '@mui/material'
import {Image} from 'mui-image';
import { longDate } from 'src/utils/dateUtils';
import { themeOptions } from 'src/theme/theme';
import i18next from 'i18next';
import { karmaLevel } from 'src/utils/karma';
import { getHeadShot, getRightPicture } from 'src/utils/picUtils';
import { replaceSpacesWithUnderscores } from 'src/utils/stringOperations';
import { getIscedFromCode } from 'src/utils/isced';
import { useSelector } from 'react-redux';

//TODO: Add link to Author Social Network

export const EdusourceHeader= (props) =>{
    const {edusource, promoter, newWidth} = props;


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
                    <Image src={getRightPicture(edusource.picture)} width={150} height={85} duration={0} sx={{borderRadius:5}} ></Image>
                </Grid>
                <Grid item>
                <Grid 
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    >
 
                    <Grid container alignItems="flex-end">
                        <Avatar alt={promoter.firstname + " " + promoter.lastname} src={getHeadShot(promoter)}  sx={{ width: 24, height: 24 }} />
                        <Typography variant="body1">
                            <Link href={"/user/" + promoter.username} > @{promoter.username}</Link>, {i18next.t("level")}: <i style={{color:themeOptions.palette.primary.main}}>{karmaLevel(promoter.karma)}</i>, {i18next.t("karma")}: <i style={{color:themeOptions.palette.primary.main}}>{promoter.karma}</i>
                        </Typography>
                    </Grid>
                        <Grid item>
                        <Typography variant="body1">
                            {i18next.t("Category")}: <Link href={'/discipline/'+ replaceSpacesWithUnderscores(edusource.discipline)}>{i18next.t(edusource.discipline)}</Link> - ( 
                            {edusource.theme?
                                    edusource.theme.map((tema, index)=>{
                                        
                                        return(<React.Fragment key={index}><i><Link href={"/theme/" + tema}> #{tema}</Link></i> </React.Fragment>)
                                    })
                                :<></>}
                            )
                        </Typography>
                        </Grid>
                        <Grid item>
                    <Typography variant="body1">
                        {i18next.t("Authors")}: 
                        {edusource.autors.map((autor, index)=>{
                            return (<React.Fragment key={index}>
                                    &nbsp; <i>{autor.autorName}</i>
                                    </React.Fragment>
                            )
                        })} 
                        &nbsp; &nbsp;
                        {edusource.level && edusource.level !==undefined && edusource.level!==null?<>
                        {i18next.t("Level")} <i><Link href={"/level/" + edusource.level }>{i18next.t(getIscedFromCode(edusource.level))}</Link></i>
                        </>:
                        <>
                        {i18next.t("Level")} <i>{i18next.t("Not Specified")}</i>
                        </>} 
                    </Typography>
                    </Grid>
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
                            <Avatar alt={promoter.firstname + " " + promoter.lastname} src={getHeadShot(promoter)}  sx={{ width: 24, height: 24 }} />
                            </Grid>
                            <Grid item sx={{mr:1}}>
                            <Typography variant="body1">
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
                                    &nbsp; <Link  href=''>@{autor.autorName}</Link>
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

export const EdusourceHeaderForCollection= (props) =>{
    const {edusource, newWidth} = props;
    const custom = useSelector(state => state.custom)
    const drawerWidth = custom.drawerWidth;


    if (newWidth>500){

        return (
            <React.Fragment>
                
                <Box component="main" 
                    width={newWidth-38-drawerWidth} 
                    sx={{border:1, borderRadius:5,p:1, borderColor:'lightgray',
                        }}
                    >
            
                <Grid container>
                
                <Grid item sx={{mr:2}}>
                    <Image src={getRightPicture(edusource.picture)} width={150} height={85} duration={0} sx={{borderRadius:5}} ></Image>
                </Grid>
                <Grid item>
                <Grid 
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    >
 
                    <Grid container alignItems="flex-end">
                    <Grid item mr={2}>
                       <b> {edusource.title} </b>
                    </Grid>
                        
                        <Typography variant="body1">
                            <Link href={"/user/" + edusource.promoterId.username} > @{edusource.promoterId.username}</Link>
                        </Typography>
                    </Grid>
                        <Grid item>
                        <Typography variant="body1">
                            {i18next.t("Category")}: <Link href={'/discipline/'+ replaceSpacesWithUnderscores(edusource.discipline)}>{i18next.t(edusource.discipline)}</Link> - ( 
                            {edusource.theme?
                                    edusource.theme.map((tema, index)=>{
                                        
                                        return(<React.Fragment key={index}><i><Link href={"/theme/" + tema}> #{tema}</Link></i> </React.Fragment>)
                                    })
                                :<></>}
                            )
                        </Typography>
                        </Grid>
                        <Grid item>
                    <Typography variant="body1">
                        {i18next.t("Authors")}: 
                        {edusource.autors.map((autor, index)=>{
                            return (<React.Fragment key={index}>
                                    &nbsp; <i>{autor.autorName}</i>
                                    </React.Fragment>
                            )
                        })} 
                        &nbsp; &nbsp;
                        {edusource.level && edusource.level !==undefined && edusource.level!==null?<>
                        {i18next.t("Level")} <i><Link href={"/level/" + edusource.level }>{i18next.t(getIscedFromCode(edusource.level))}</Link></i>
                        </>:
                        <>
                        {i18next.t("Level")} <i>{i18next.t("Not Specified")}</i>
                        </>} 
                    </Typography>
                    </Grid>
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
                            <Avatar alt={edusource.promoterId.firstname + " " + edusource.promoterId.lastname} src={getHeadShot(edusource.promoterId)}  sx={{ width: 24, height: 24 }} />
                            </Grid>
                            <Grid item sx={{mr:1}}>
                            <Typography variant="body1">
                                <Link href={"/user/" + edusource.promoterId.username} > @{edusource.promoterId.username}</Link> 
                            </Typography>
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
                                    &nbsp; <Link  href=''>@{autor.autorName}</Link>
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
