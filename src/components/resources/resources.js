import { ButtonGroup, Grid, IconButton, Typography } from '@mui/material'
import * as React from 'react'
import fakeLastResources from 'src/assets/fakeLists/lastResources'
import GridOnIcon from '@mui/icons-material/GridOn';
import ViewListIcon from '@mui/icons-material/ViewList';
import EduSourceList from 'src/ui-component/edusource/edusourcelist';
import "./resources.css"
import Slider from '../NetflixSlider';
import { Box } from '@mui/system';



export const ResourcesNetflixGrid = (props) =>{
    var {edusourceList, title, newcolor, mt} = props;
    const {newWidth} = props;
    if (!edusourceList){
        
        edusourceList = fakeLastResources;
    }
    if (!title){
        title = "Last Resources"
    }
    if (!mt){
        mt=0;
    }

    const getInitialMode = () => {
        var result= "Grid"
        if (newWidth <500){
            result = "List"
        }
        return result
    }

  
    const [mode, setMode] = React.useState(getInitialMode());
   
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
                {edusourceList.map((edusource, index) => (

                    <Slider.Item edusource={edusource} key={index}>item1</Slider.Item>
                ))}
                </Slider>
                </Box>
                </>:<>
                <Grid container direction="column" sx={{mt:2, ml:2}} justifyContent="flex-start" alignItems="flex-start">
                    {edusourceList.map((edusource, index)=>{
                        return (
                            <React.Fragment key={index}>
                            <Grid item sx={{mb:2}} >
                                <EduSourceList edusource= {edusource} newWidth={newWidth} />                                   
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