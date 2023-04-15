import * as React from 'react';
import { ButtonBase, Button, Grid, Input, Avatar, DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Webcam from "react-webcam";
import FileResizer from 'react-image-file-resizer';



//ICONS
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import i18next from 'i18next';
import { userUpdate } from 'src/api/userApi';
import Image from 'mui-image';

export const PictureDialog = (props) => {
    const { onClose, user, open } = props;
    const picture = user.picture.type==="link"?user.picture.fileName:user.picture.file
    const [imageInDiag, setImageInDiag]= React.useState(picture);
  
    const handleClose = async () => {
        console.log("IMAGEN SUBIDA", imageInDiag)
      const frmData = {
        "_id": user._id,
        "picture":{
            "file":imageInDiag,
            "uploadTime": Date.now(),
            "type": "buffer"
        }
        
      }
        await userUpdate(frmData).then((result)=>{
            console.log("RESULTADO OBTENIDO", result)
            if (result.status==="success"){
                onClose("success", i18next.t("Your picture has been udpated"));
            }
            
        }).catch((error)=>{
            console.log(error);
            onClose("error",i18next.t("Something has failed"));
        })

       onClose(imageInDiag);
      
    };

    const handleCancel = ()=>{
        setImageInDiag(picture);
        onClose("warning", i18next.t("Editing canceled"))
    }

    const [webcamShow, setWebcamShow] = React.useState(false); 

    const resizeFile = (file) => new Promise(resolve => {
        FileResizer.imageFileResizer(file, 160, 160, 'JPEG', 100, 0,
        uri => {
        resolve(uri);
        }, 'base64' );
    });

    const videoConstraints = {
        width: 160,
        height: 160,
        facingMode: "user"
    };
     
    const webcamRef = React.useRef(null);
    
    const  handleFileChange = async (e) =>{
        const file = e.target.files[0];
        const base64 = await resizeFile(file)
        setImageInDiag(base64); 
        //dispatch(nc_image_Commit(base64))
        }

    const getWebcamShot = ()=>{
        if (!webcamShow){
            setImageInDiag(null);
            setWebcamShow(true);
    }
        else {
            const image = capture();
            console.log("IMAGEN EN WEBCAM",image)
            setImageInDiag(image);
            setWebcamShow(false);
        }
    }

    const hiddenFileInput = React.useRef(null);
     
    const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
          //dispatch(nc_image_Commit(imageSrc));
          return imageSrc
        },
        [webcamRef]
    );
    
    const deletePicture = () =>{
        setImageInDiag("")
    }
    
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{i18next.t("Picture Profile")}</DialogTitle>  
        <DialogContent>
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
           
            <Grid item xs={12} sm={12} md={12} >
                <ButtonBase height="150" width="150" sx={{m:2}} onClick={webcamShow?getWebcamShot:null}>
                    
                    {webcamShow ? <Webcam
                        audio={false}
                        height={160}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={160}
                        videoConstraints={videoConstraints}
                    /> :
                    <Image width={160} height={160} src={imageInDiag} alt="Upload" duration={0} 
                    style={{
                        borderRadius:"50%",
                        border: "3px solid #1f1a32",
                       
                    }}
                    />
                    }
                </ButtonBase>
                <Grid container direction="row" justifyContent="space-around" alignItems="flex-end">
                    <label htmlFor="upload-button">
                        <Input accept="image/*" id="upload-button" type="file" style={{display: 'none'}} ref={hiddenFileInput} onChange={handleFileChange}/> 
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <UploadIcon />
                        </IconButton>
                    </label>
                    <label htmlFor="camera-button">
                        <IconButton color={!webcamShow?"primary":"success"} aria-label="make picture" component="span" onClick={getWebcamShot}>
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <IconButton color="primary" aria-label="make picture" component="span" onClick={deletePicture}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            
        </Grid>
        </DialogContent>
        <DialogActions>
          
          <Button disabled={!imageInDiag || imageInDiag===undefined ||imageInDiag===null} variant='contained' sx={{borderRadius:"20px"}} onClick={handleClose} autoFocus>{i18next.t("Accept")}</Button>
          <Button variant='contained' sx={{borderRadius:"20px"}} onClick={handleCancel} >{i18next.t("Cancel")}</Button>
        </DialogActions>
    </Dialog>
    );
  }

export const ImageComponent = (props) =>{
    //const dispatch = useDispatch();
    const data = props.data;
    const updateP = props.updateParent;

    //const user =  useSelector(state => state.user);
    const [image, setImage] = React.useState(data);
    const [firstLoad, setFirstLoad] = React.useState(true)

    const [dialogOpen, setDialogOpen] = React.useState(false);
    
    
    React.useEffect (()=>{
      if (firstLoad){ 
        if (props.image){
          setImage(props.image)
        }
       // console.log(image)
        setFirstLoad(false);
      }
    
    },[props,data, image, firstLoad])
    
    

    const handleAvatarClickOpen = (event) => {
        event.preventDefault();
        setDialogOpen(true);
      };
    const handleAvatarClose = (value) => {
        setDialogOpen(false);
        setImage(value);
        updateP(value);
    };


    return(
        <React.Fragment>
           
            <Grid container direction="column">
                    <Grid item xs={12} sm={12} md={12} >
                        <IconButton onClick={handleAvatarClickOpen}>
                            <Avatar
                                src={image}
                                sx={{ width: 56, height: 56 }}
                            >
                            </Avatar>
                        </IconButton>
                    </Grid>
            </Grid>  
            <PictureDialog
                picture={image}
                open={dialogOpen}
                onClose={handleAvatarClose}
            />  
        </React.Fragment>
    )
  }

  