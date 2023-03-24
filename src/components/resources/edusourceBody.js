import * as React from 'react'
import { Badge, Button, ButtonGroup, Container,  Link, Paper } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ResourceValorations } from '../pageStruct/valorations';
import { Box } from '@mui/system';
import { ValorationMeanIcon } from '../favorites';


const theme = createTheme(themeOptions);

export const EdusourceBody= (props) =>{
    const {edusource } = props;
    const [showing, setShowing] = React.useState(false);
    const [valorationsShow, setValorationShow] = React.useState(true);
    const custom = useSelector(state => state.custom)

    const navigation = (payload) =>{
        console.log(payload)
        window.open(payload);
      }
    
    const visitResource = (e) =>{
        e.preventDefault();
        navigation(edusource.link);
    }

    const showEdusource = (e)=>{
        setShowing(!showing);
    }

    const showValorations = (e)=>{
        setValorationShow(!valorationsShow);
    }

    const divStyle = {
  
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%'
      }
      
      const iframeStyle = {
    
        top: 0,
        left: 0,
        width: '100%'
      }
    
    const videoWrapper = {
        position: 'relative',
        paddingBottom: "400px",
        overflow: 'hidden',
        width : '90%',
    }
    
    const videoIframe = {
        overflow: 'hidden',
        border: 0,
        alignSelf: 'center',
        position: 'static',
    
        width: "calc(100vw - "+custom.drawerWidth+"px - 130px )",
        height: "calc((100vw - "+custom.drawerWidth+"px - 130px ) * 0.5625)"
    }
    
    const vimeoIframe = {
        overflow: 'hidden',
        border: 0,
        alignSelf: 'center',
        position: 'static',
    
        width: "calc(100vw - "+custom.drawerWidth+"px - 130px )",
        height: "calc((100vw - "+custom.drawerWidth+"px - 130px ) * 0.5625)"
    }
    
    const acceptedValorations = ()=>{
        var count = 0;

        for (let val = 0; val < edusource.valorations.length; val++) {
            if (edusource.valorations[val].accepted){
                count++;
            }
        }
        return count;
    }
    

    console.log(videoIframe.width);
    const ResourceWeb = ()=>{
        
        switch (edusource.linktype) {
            case "Webpage":
                return (
                    <Paper sx={{mt:2, p:1}}>
                    <div style={{divStyle}}>
                        <iframe src={edusource.link} style={iframeStyle} height={800} title={"WEBSITE"}/>
                       
                    </div>
                    </Paper>
                )
            case "Youtube":
                return (
                    <>
                    <Container sx={{mt:2}}>
                        <div style={{videoWrapper}}>
                            <iframe src={edusource.link} style={videoIframe} allowFullScreen frameBorder={"0"} allow={"autoplay"} title={"YOUTUBE"}/>
                        </div>
                    </Container>
                    </>
                )
            case "Vimeo":
                return (
                    <Container sx={{mt:2, p:1, pb:"56.25%"}}>
                        <div style={{videoWrapper}}>
                            <iframe src={edusource.link} style={vimeoIframe} allowFullScreen  frameBorder={"0"} allow={"autoplay"} title={"VIMEO"}/>
                        </div>
                    </Container>
                )
        
            default:
                break;
        }  
    }

    return (
        <>
        
        <Box sx={{mt:1}}>
            <Button variant='outlined' onClick={visitResource} endIcon={<ArrowCircleRightIcon />} sx={{ borderRadius:"20px", mr:1, mt:1}}>Visit</Button>
            <Button variant={showing?'contained':'outlined'} onClick={showEdusource} endIcon={<VisibilityIcon />} sx={{ borderRadius:"20px", mr:1, mr:1, mt:1}}>Show</Button>
            {acceptedValorations()>0?<Button variant={valorationsShow?'contained':'outlined'} onClick={showValorations} endIcon={<Badge badgeContent={acceptedValorations()} color="primary"><ValorationMeanIcon valorations={edusource.valorations} /> </Badge>} sx={{ borderRadius:"20px", mt:1}}>Comments</Button>:<></>}
            {edusource.valorations.length===0?<Button sx={{ml:2, mt:1}}>Be the first to value this resource</Button>:<></>}
        </Box>
        
        {showing?<>
            <ResourceWeb />
        </>:<></>}
        {valorationsShow?<>
            <Box sx={{mt:2}}>
                <ResourceValorations edusource={edusource}/>
            </Box>
        </>:<></>}
        </>
        
    )
}