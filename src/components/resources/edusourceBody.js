import * as React from 'react'
import { Alert, Badge, Button, Container,  Paper, Typography } from '@mui/material'
//import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ResourceValorations } from '../pageStruct/valorations';
import { Box } from '@mui/system';
import i18next from 'i18next';
import { embedGoogleDriveUrl, ExtractEmbedUrlWordWallFromImage, YoutubeLinkToIframeLink } from 'src/utils/stringOperations';


export const EdusourceBody= (props) =>{
   // const user = useSelector(state => state.user)
    const {edusource, newWidth } = props;
    const [showing, setShowing] = React.useState(false);
    const [valorationsShow, setValorationShow] = React.useState(true);
    //const custom = useSelector(state => state.custom)
    //const [error, setError]= React.useState("");
    const [contentAllowed, setContentAllowed] = React.useState(true);

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
        paddingBottom: "56.25%",
        overflow: 'hidden',
        width : '100%',
    }
    
    const videoIframe = {
        overflow: 'hidden',
        border: 0,
        alignSelf: 'center',
        position: 'static',
        width: '100%',
        height: "calc((100vw * 0.5625)"
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
    

    //console.log(videoIframe.width);
    const ResourceWeb = ()=>{
        const [allowed, setAllowed] = React.useState(true);
        const handleIFrameLoad = () => {
            const iFrame = document.getElementById('iframe');
            const iFrameWindow = iFrame.contentWindow;

            //console.log("IFRAME",iFrame, iFrameWindow)
        
            try {
              // Check if the external website implements x-frame options or a content security policy
              const frameOptions = iFrameWindow.frameElement.getAttribute('allow');
              console.log ("FRAME OPTIONS", frameOptions)
              if (!frameOptions || frameOptions.indexOf('allow-forms') === -1) {
                if (
                    edusource.linktype==="Website" || 
                    edusource.linktype==="Website"
                    
                    ){
                    setAllowed(false);
                    setContentAllowed(false);
                }
              }
            } catch (error) {
                if (
                    edusource.linktype==="Website" || 
                    edusource.linktype==="Website"
                   
                    ){
                    setAllowed(false);
                    setContentAllowed(false);
                }
            }
          };
        
        
        switch (edusource.linktype) {
          
            case "Youtube":
                console.log("LINK EN EDUSOURCE.BODY", edusource.link)
                return (
                    <>
                    <Container sx={{mt:2}}>
                        <div style={{videoWrapper}}>
                            <iframe 
                                src={YoutubeLinkToIframeLink(edusource.link)} 
                                style={videoIframe} 
                                allowFullScreen 
                                frameBorder={"0"} 
                                allow={"autoplay"} 
                                title={"YOUTUBE"}/>
                        </div>
                    </Container>
                    </>
                )
                
            case "Vimeo":
                return (
                    <Container sx={{mt:2, p:1, pb:"56.25%"}}>
                        <div style={{videoWrapper}}>
                            <iframe 
                                src={edusource.link} 
                                style={videoIframe} 
                                allowFullScreen  
                                frameBorder={"0"}
                                allow={"autoplay"} 
                                title={"VIMEO"}/>
                        </div>
                    </Container>
                )
        
            case "Google Drive":
                return (
                    <Container sx={{mt:2}}>
                        <div style={{divStyle}}>
                            <iframe 
                                src={embedGoogleDriveUrl(edusource.link)} 
                                style={iframeStyle} 
                                allowFullScreen  
                                width={newWidth/2} 
                                height={newWidth*0.66}  
                                title={"Google Drive Document"}/>
                        </div>
                    </Container>
                )
            case "Wordwall":
                if (edusource.picture.fileName)
                return (
                    <>
                    <Container sx={{mt:2}}>
                        <div style={{divStyle}}>
                            <iframe 
                                src={ExtractEmbedUrlWordWallFromImage(edusource.picture.fileName)} 
                                style={iframeStyle} 
                                allowFullScreen 
                                height="400"
                                frameBorder={"0"} 
                                title={"WORDWALL"}/>
                        </div>
                    </Container>
                    </>
                ) 
                break;
            default:
                console.log("IN DEFAULT RESOURCEWEB")
                if (allowed){
                return (
                    <Paper sx={{mt:2, p:1}}>
                    <div style={{divStyle}}>
                        <iframe
                            id = "iframe"
                            onLoad={handleIFrameLoad}
                            src={edusource.link}
                            style={iframeStyle}
                            height={800}
                            title={"WEBSITE"}
                        />
                       
                    </div>
                    </Paper>
                )}else{
                    return(
                    
                        <Alert severity='warning' sx={{m:2}}>
                    
                        <Typography>
                            {i18next.t("This website cannot be displayed in an iframe due to security policies, implemented by the owner.")}
                        </Typography>
                        <Typography>
                            {i18next.t("Use the 'visit' button to open a new browser window to see the resource")}
                        </Typography>
                        </Alert>
                    
                 
                    )
                }
        }  
    }

    return (
        <>
        
        <Box sx={{mt:1}}>
          
            <Button variant='outlined' onClick={visitResource} endIcon={<ArrowCircleRightIcon />} sx={{ borderRadius:"20px", mr:1, mt:1}}>{i18next.t("Visit")}</Button>
            <Button variant={showing?'contained':'outlined'} onClick={showEdusource} endIcon={<VisibilityIcon />} sx={{ borderRadius:"20px", mr:1, mt:1}}>{i18next.t("Show")}</Button>
            {acceptedValorations()>0?<Button variant={valorationsShow?'contained':'outlined'} onClick={showValorations} endIcon={<Badge badgeContent={acceptedValorations()} color="primary"></Badge>} sx={{ borderRadius:"20px", mt:1}}>{i18next.t("Comments")}</Button>:<></>}
            
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