import * as React from 'react';
import { ButtonBase, Button, Grid, Input, Avatar, DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Webcam from "react-webcam";
import FileResizer from 'react-image-file-resizer';



//ICONS
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';

const SimpleDialog = (props) => {
    const { onClose, picture, open } = props;

    const [imageInDiag, setImageInDiag]= React.useState(picture);
  
    const handleClose = () => {
      onClose(imageInDiag);
    };

    const handleCancel = ()=>{
        setImageInDiag(picture);
        handleClose();
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
            setWebcamShow(true);
    }
        else {
            const image = capture();
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
        <DialogTitle>Picture</DialogTitle>  
        <DialogContent>
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
           
            <Grid item xs={12} sm={12} md={12} >
                <ButtonBase height="150" width="150" sx={{m:2}}>
                    
                    {webcamShow ? <Webcam
                        audio={false}
                        height={160}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={160}
                        videoConstraints={videoConstraints}
                    /> :
                    <img width={145} height={165} src={imageInDiag} alt="Upload"></img>
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
          <Button onClick={handleClose} autoFocus>Accept</Button>
          <Button onClick={handleCancel} >Cancel</Button>
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
            <SimpleDialog
                picture={image}
                open={dialogOpen}
                onClose={handleAvatarClose}
            />  
        </React.Fragment>
    )
  }