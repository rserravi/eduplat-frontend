import * as React from 'react'
import { Badge, Button, ButtonGroup, Container,  Link, Paper, TextField, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ResourceValorations } from '../pageStruct/valorations';
import { Box } from '@mui/system';
import { customIcons, FavoriteIcon, Favorites, ValorationMeanIcon } from '../favorites';
import i18next from 'i18next';
import { addValoration, changeValoration, findValoration } from 'src/api/edusourceApi';
import { shortDate } from 'src/utils/dateUtils';


const theme = createTheme(themeOptions);

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
        console.log("RESULTADO EN USERHASCOMMENTED",result, "con valor", valor);
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
    

    //console.log(videoIframe.width);
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
            {edusource.valorations.length===0?<Button sx={{ml:2, mt:1}}>{i18next.t("Be the first to value this resource")}</Button>:<></>}
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