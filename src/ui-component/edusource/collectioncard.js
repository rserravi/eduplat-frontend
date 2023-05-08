import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ValorationMeanIcon } from 'src/components/favorites';
import { longDate } from 'src/utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { getRightPicture } from 'src/utils/picUtils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CopyIcon from '@mui/icons-material/FileCopy';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getShareUrl } from 'src/utils/rootTools';
import { themeOptions } from 'src/theme/theme';


export default function CollectionCard(props) {

  const {collection} = props;
  const [hovering, setHovering] = React.useState(false);
  const navigate = useNavigate();
  const subh =  longDate(collection.date);

  const visitPromoter = (event)=>{
    event.preventDefault();
    navigate("/user/"+collection.promoterId.username);
  }


  const handleCardClic = (event)=>{
    event.preventDefault();
    navigate("/collections/"+ collection.collectionURL);

  }

  const imgstyles = {
    media: {
      height: 160,
      objectFit:"cover"
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shareUrl = getShareUrl()+ collection.collectionURL

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    handleClose();
  };

  const handleEmail = () => {
    const subject = 'Check out this page!';
    const body = `I thought you might be interested in this page:\n\n${shareUrl}`;
    const mailToLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailToLink;
    handleClose();
  };

  const handleFacebook = () => {
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(fbShareUrl, '_blank');
    handleClose();
  };

  const handleTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(twitterShareUrl, '_blank');
    handleClose();
  };

  const handleLinkedIn = () => {
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(linkedinShareUrl, '_blank');
    handleClose();
  };

  return (
    <>
    <Card 
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        sx={{ minWidth:260,
            borderRadius:5,
        backgroundColor: themeOptions.palette.primary,
          position:"relative",
          '&:hover': {
          
            zIndex: 10,
        },
          
        }}
    >
      {hovering?<>
      <CardHeader
      sx={{height:80}}

        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{variant:'body1' }}
        title={collection.title.length>73?collection.title.substring(0,73)+" ...":collection.title}
        subheader= {subh}
      />
      </>:<>
      <CardHeader
        sx={{height:80}}
        titleTypographyProps={{variant:'body1' }}
        title={collection.title.length>75?collection.title.substring(0,75)+" ...":collection.title}
        subheader= {subh}
      />
      </>}
      {hovering?<>
      <CardMedia
        component="img"
        className='classes.media'
        style={imgstyles.media}
        onClick={handleCardClic}
        image={getRightPicture(collection.picture)}
        alt={collection.title}
        sx= {{cursor:"pointer",filter: "opacity(10%)"}}
      />
      </>:<>
      <CardMedia
        component="img"
        className='classes.media'
        style={imgstyles.media}
        onClick={handleCardClic}
        image={getRightPicture(collection.picture)}
        alt={collection.title}
        sx= {{cursor:"pointer",filter: "opacity(100%)"}}
        
      />
      </>
      }
      {hovering?<>
      <CardContent onClick={handleCardClic} style={{cursor:"pointer",position:"absolute", marginTop:-150}}>
      <Typography sx={{fontSize:10}} variant="p" color="text.terciary">
        {i18next.t("COLLECTION")}
       </Typography>
        <Typography sx={{fontSize:12}} variant="body2" color="text.secondary">
          {collection.description.length>240? collection.description.substring(0,240)+" ...":collection.description}
        </Typography>
      </CardContent>
      </>:<></>} 
      <CardActions disableSpacing>
        <Button size="small" onClick={visitPromoter}> {i18next.t("by")} @{collection.promoterId.username}</Button>
        
          <ValorationMeanIcon valorations={collection.valorations} />
       
        <IconButton aria-label="share" onClick={handleClickOpen}>
          <ShareIcon />
        </IconButton>
        <Typography variant='body2'>{i18next.t("COLLECTION")}</Typography>
        
      </CardActions>
     
    </Card>
    
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{i18next.t("Share this resource")}</DialogTitle>
        <DialogContent>
          <DialogContentText><Typography variant='h3'>{collection.title}</Typography></DialogContentText>
          <DialogContentText>&nbsp;</DialogContentText>
          <DialogContentText>{i18next.t("Select a sharing option")}:</DialogContentText>
          <Button startIcon={<FacebookIcon />} onClick={handleFacebook}>
            {i18next.t("Share on")} Facebook
          </Button>
          <Button startIcon={<TwitterIcon />} onClick={handleTwitter}>
          {i18next.t("Share on")} Twitter
          </Button>
          <Button startIcon={<LinkedInIcon />} onClick={handleLinkedIn}>
          {i18next.t("Share on")} LinkedIn
          </Button>
          <Button startIcon={<EmailIcon />} onClick={handleEmail}>
          {i18next.t("Share via")} Email
          </Button>
          <Button startIcon={<CopyIcon />} onClick={handleCopy}>
            {i18next.t("Copy link to Clipboard")}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{i18next.t("Cancel")}</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}