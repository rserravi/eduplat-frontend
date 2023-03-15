import { ButtonGroup, Container, CssBaseline, Grid, IconButton, Typography } from '@mui/material'
import * as React from 'react'

import fakeLastResources from 'src/assets/fakeLists/lastResources'
import GridOnIcon from '@mui/icons-material/GridOn';
import ViewListIcon from '@mui/icons-material/ViewList';
import EduSourceCard from 'src/ui-component/edusource/edusourcecard'
import EduSourceList from 'src/ui-component/edusource/edusourcelist';
import { useNavigate } from 'react-router-dom';
import "./resources.css"
import Slider from '../NetflixSlider';
import { Box } from '@mui/system';

export const ResourcesGrid= (props) =>{
    var {edusourceList, title} = props;
    if (!edusourceList){
        
        edusourceList = fakeLastResources;
    }
    if (!title){
        title = "Last Resources"
    }

    const [mode, setMode] = React.useState("Grid");
  
    const HandelGridClick = (event)=>{
        setMode("Grid")
        //console.log("Grid")
    }

    const HandleListClick = (event)=>{
        setMode("List")
    }

    return (
        <>
        <Container maxWidth="xl"sx={{ display: 'flex', mt:2 }}>
            <CssBaseline />
            <Grid container>
                <Grid container direction="row"  justifyContent="flex-start" alignItems="center">
                    <Grid item>
                        <Typography variant='h2' component='h2'>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ButtonGroup>
                            <IconButton color={mode==="Grid"?"primary":""} onClick={HandelGridClick}>
                                <GridOnIcon />
                            </IconButton>
                            <IconButton color={mode==="List"?"primary":""} onClick={HandleListClick}>
                                <ViewListIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                {mode==="Grid"?
                <>
                <Grid container sx={{mt:2, ml:2}} justifyContent="center" alignItems="flex-start">
                    {edusourceList.map((eduSource)=>{
                        return (
                            <Grid item xs={12} sm={8} md={3} mb={2}  key={eduSource.key}>
                                <EduSourceCard 
                                    title={eduSource.title} 
                                    autor={eduSource.autor}
                                    autorAvatar={eduSource.autorAvatar} 
                                    date={eduSource.date} 
                                    discipline={eduSource.discipline} 
                                    extract={eduSource.extract}
                                    image={eduSource.image}
                                    labels={eduSource.labels}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                </>:<>
                <Grid container direction="column" sx={{mt:2, ml:2}} justifyContent="flex-start" alignItems="flex-start">
                    {edusourceList.map((eduSource)=>{
                        return (
                            <Grid item sx={{mb:2}} key={eduSource.key}>
                                <EduSourceList 
                                    title={eduSource.title} 
                                    autor={eduSource.autor}
                                    autorAvatar={eduSource.autorAvatar} 
                                    date={eduSource.date} 
                                    discipline={eduSource.discipline} 
                                    extract={eduSource.extract}
                                    image={eduSource.image}
                                    labels={eduSource.labels}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                </>}
            </Grid>
        
     
  
            
        </Container>
        
        </>
    )
}

export const ResourcesNetflixGrid = (props) =>{
    var {edusourceList, title, newcolor, mt} = props;
    if (!edusourceList){
        
        edusourceList = fakeLastResources;
    }
    if (!title){
        title = "Last Resources"
    }
    if (!mt){
        mt=0;
    }

    const [mode, setMode] = React.useState("Grid");
   
    const HandelGridClick = (event)=>{
        setMode("Grid")
        //console.log("Grid")
    }

    const HandleListClick = (event)=>{
        setMode("List")
    }

    return (
        <>
        <Grid container sx={{backgroundColor:newcolor, mt:mt}}>
        <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
           
            
            >
            <Grid item><Typography variant='h3' sx={{ml:2}}>{title}</Typography></Grid>
            <Grid item>
                <ButtonGroup>
                    <IconButton color={mode==="Grid"?"primary":""} onClick={HandelGridClick}>
                        <GridOnIcon />
                    </IconButton>
                    <IconButton color={mode==="List"?"primary":""} onClick={HandleListClick}>
                        <ViewListIcon />
                    </IconButton>
                </ButtonGroup>
            </Grid>
        </Grid>
            {mode!=="List"?
                <>
                
                <Box width="100%">
                <Slider>
                {edusourceList.map(edusource => (

                    <Slider.Item edusource={edusource} key={edusource.key}>item1</Slider.Item>
                ))}
                </Slider>
                </Box>
                </>:<>
                <Grid container direction="column" sx={{mt:2, ml:2}} justifyContent="flex-start" alignItems="flex-start">
                    {edusourceList.map((eduSource)=>{
                        return (
                            <React.Fragment key={eduSource.key}>
                            <Grid item sx={{mb:2}} >
                                <EduSourceList 
                                    title={eduSource.title} 
                                    autor={eduSource.autor}
                                    autorAvatar={eduSource.autorAvatar} 
                                    date={eduSource.date} 
                                    discipline={eduSource.discipline} 
                                    extract={eduSource.extract}
                                    image={eduSource.image}
                                    labels={eduSource.labels}
                                />
                            </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
                </>}
        </Grid>
        </>
    )
}