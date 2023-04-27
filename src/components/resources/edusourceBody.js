import * as React from 'react'
import { Alert, Badge, Button, Container,  Paper, TextField, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import { createTheme } from '@mui/material/styles';
//import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ResourceValorations } from '../pageStruct/valorations';
import { Box } from '@mui/system';
import { customIcons, FavoriteIcon, Favorites, ValorationMeanIcon } from '../favorites';
import i18next from 'i18next';
import { addValoration, changeValoration, } from 'src/api/edusourceApi';
import { shortDate } from 'src/utils/dateUtils';
import { ExtractEmbedUrlWordWallFromImage, YoutubeLinkToIframeLink } from 'src/utils/stringOperations';


//const theme = createTheme(themeOptions);

export const EdusourceBody= (props) =>{
    const user = useSelector(state => state.user)
    const {edusource, promoter, newWidth } = props;
    const [showing, setShowing] = React.useState(false);
    const [valorationsShow, setValorationShow] = React.useState(true);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [valoration, setValoration] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const [valDate, setValDate] = React.useState();
    const [alreadyCommented, setAlreadyCommented]= React.useState(false);
    const custom = useSelector(state => state.custom)
    const CHARACTER_LIMIT = 250;
    const [error, setError]= React.useState("");
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

    const changeFavoriteRating = (newValue)=>{
        if (newValue!==null || newValue!==undefined){
            console.log("ESTAMOS EN CHANGEFAVORITE",newValue)
            setValoration(newValue);
            handleDialogClickOpen();
        }
    }

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
      };
    
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogCancel = () => {
        setDialogOpen(false);
        setValoration(0);
        setComment("");
    };

    const handleDialogAccept= async (event)=>{
        //TODO: Meter en base de datos
        const frmData = {
            edusourceId: edusource._id,
            senderId: user._id,
            comment: comment,
            value: valoration,
        }

        if (alreadyCommented){
            await changeValoration(frmData).then((result)=>{
                console.log(result);
                handleDialogClose();
            }).catch((error)=>{
                console.log(error);
                setError(error)
            })
        }else{
        await addValoration(frmData).then((result)=>{
            console.log(result);
            handleDialogClose();
        }).catch((error)=>{
            console.log(error);
            setError(error)
        })
        }
    }

    const commentChange = (event)=>{
        if (comment.length < 300){
            setComment(event.target.value)
        }
    }

    React.useEffect(()=>{
        var result= false
        var valor = 0;
        //console.log("EN userHasCommented", edusource.valorations)
        if (edusource.valorations.length >0){
            for (let val = 0; val < edusource.valorations.length; val++) {
                if (edusource.valorations[val].senderUser===user.username){
                    setValoration(edusource.valorations[val].value);
                    setComment(edusource.valorations[val].comment);
                    setValDate(edusource.valorations[val].date);
                    valor = edusource.valorations[val].value
                    result = true;
                    break;
                }
            }
        }
        //console.log("RESULTADO EN USERHASCOMMENTED",result, "con valor", valor);
        setAlreadyCommented(result);
    },[edusource.valorations, user.username])

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
                setAllowed(false);
                setContentAllowed(false);
              }
            } catch (error) {
                setAllowed(false);
                setContentAllowed(false);
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
            {user && user._id!=="" && user.username!==promoter.username?
            <Favorites defaultFav={valoration} changeFavoriteRating={changeFavoriteRating}/>
            :<></>}
            {alreadyCommented?<>
                <Paper sx={{width:newWidth-32, p:1, mt:1}}>
                    <Typography variant='body2'>{shortDate(valDate)} {i18next.t("you commented")}:</Typography> <Typography variant='body2'><i>"{comment}"</i></Typography>
                </Paper>
            </>:<></>}
            <Button variant='outlined' onClick={visitResource} endIcon={<ArrowCircleRightIcon />} sx={{ borderRadius:"20px", mr:1, mt:1}}>{i18next.t("Visit")}</Button>
            <Button variant={showing?'contained':'outlined'} onClick={showEdusource} endIcon={<VisibilityIcon />} sx={{ borderRadius:"20px", mr:1, mt:1}}>{i18next.t("Show")}</Button>
            {acceptedValorations()>0?<Button variant={valorationsShow?'contained':'outlined'} onClick={showValorations} endIcon={<Badge badgeContent={acceptedValorations()} color="primary"><ValorationMeanIcon valorations={edusource.valorations} /> </Badge>} sx={{ borderRadius:"20px", mt:1}}>{i18next.t("Comments")}</Button>:<></>}
            
        </Box>
        
        {showing?<>
            <ResourceWeb />
        </>:<></>}
        {valorationsShow?<>
            <Box sx={{mt:2}}>
                <ResourceValorations edusource={edusource}/>
            </Box>
        </>:<></>}

        {/* VALORATIONS DIALOG */}

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{i18next.t("Value the resource")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box sx={{display: 'flex', alignItems:"center"}}>
            <FavoriteIcon value={valoration} /> <Typography variant='body1' ml={1}>{customIcons[valoration]!==undefined?i18next.t(customIcons[valoration].label):<></>}</Typography>
            
            </Box>
            <Typography variant='body1' sx={{mt:1}}> {i18next.t("Add a comment about the user")}</Typography>
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="valoration"
            label="Valoration"
            fullWidth
            variant="standard"
            defaultValue={comment}
            rows={4}
            onChange={commentChange}
            helperText={comment.length + "/ "+CHARACTER_LIMIT}
            inputProps={{
                maxLength: CHARACTER_LIMIT
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogAccept}>{i18next.t("Accept")}</Button>
          <Button onClick={handleDialogClose}>{i18next.t("Cancel")}</Button>
        </DialogActions>
      </Dialog>
        </>
        
    )
}