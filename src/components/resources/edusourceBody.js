import * as React from 'react'
import { Button, ButtonGroup, Container,  Link, Paper } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { ResourceValorations } from '../pageStruct/valorations';
import { Box } from '@mui/system';


const theme = createTheme(themeOptions);

export const EdusourceBody= (props) =>{
    const {edusource, promoter} = props;
    const [showing, setShowing] = React.useState(false);
    const [valorationsShow, setValorationShow] = React.useState(true);
    const custom = useSelector(state => state.custom)
    
    const visitResource = (e) =>{
        console.log("Visitando ", e.target.value);
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
        
        <ButtonGroup sx={{mt:2}}>
            <Button onClick={visitResource} endIcon={<ArrowCircleRightIcon />} sx={{ borderRadius:"20px"}}>Visit resource</Button>
            <Button onClick={showEdusource} endIcon={<VisibilityIcon />} sx={{ borderRadius:"20px"}}>Show resource</Button>
            {edusource.valorations.length>0?<Button onClick={showValorations} endIcon={<VolunteerActivismIcon /> } sx={{ borderRadius:"20px"}}>Show comments</Button>:<></>}
        </ButtonGroup>
        {edusource.valorations.length===0?<Link sx={{ml:2}}>Be the first to value this resource</Link>:<></>}
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