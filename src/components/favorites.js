// imports
import * as React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import BlockIcon from '@mui/icons-material/Block';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import i18next from 'i18next';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Grid, IconButton } from '@mui/material';
import Favorite2Icon from '@mui/icons-material/Favorite';
import { setInFavorites } from 'src/api/userApi';
import { useDispatch } from 'react-redux';

export const customIcons = {
    0: {
      icon: <BlockIcon color="inherit" />,
      label: 'No valoration yet'
    },
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied / No useful at all'
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied / Not useful'
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral / Ok'
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied / Useful'
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied / Very useful'
    },
  };
  

export const FavoriteIcon = (props)=>{
    const {value}= props;
    try {
      return (<><Tooltip title={customIcons[value].label}>{customIcons[value].icon}</Tooltip></>)    
    } catch (error) {
      //console.error("Error en FavoriteIcon",error)
      return (<></>)
    }
  

}


export const ValorationMeanIcon = (props)=>{
  const {valorations} = props;
  //console.log("MEAN VALORATIONS", valorations)
  var count=0;
  var value=0;

  if (!valorations || valorations===undefined || valorations === null){
    return (<FavoriteIcon value={0} />)
  }
  
  for (let val = 0; val < valorations.length; val++) {
      count++;
      value = value + valorations[val].value;
  }
  var result;
  if (count===0){
    result = 0
  }
  else{
    result = Math.floor(value / count);
  }
  //console.log("RESULT EN MEAN",result)
  return(<FavoriteIcon value={result} />)
}

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const StyledRatingLigth = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.primary.contrastText,
  },
}));

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const acceptedValorations = (valorations)=>{
  var result = [];
  for (let i = 0; i < valorations.length; i++) {
    if (valorations[i].accepted){
      result.push(valorations[i])
    }
    
  }
  //console.log("ACCEPTED VALORATIONS", result)
  return result;
}

export const Favorites = (props)=>{
  const {defaultFav, valoration, changeFavoriteRating, mode, ml} = props;
  const [hover, setHover] = React.useState(-1);
  const [value, setValue]= React.useState(defaultFav);

  if (valoration){
    setValue(valoration.value);
  }


  const Textual = (props)=>{
    const {value}= props

    var Result;
    if (value && value!==null && value!==undefined){
      Result = customIcons[value].label;
    }
   
    if (hover !== -1){
            Result = customIcons[hover].label;
    }
  
  if(Result===null | Result===undefined || Result===0){return (<>{i18next.t("No valoration yet")}</>)}
    return (<>{i18next.t(Result)}</>);
  }

  return (
    <>
     <Box
      sx={{
        width: 500,
        display: 'flex',
        flexDirection:"column",
        alignItems: 'left',
        ml:ml?ml:0
      }}
    >
    {mode==="ligth" || mode ==="Ligth"?
    <StyledRatingLigth
      name="highlight-selected-only"
      value={defaultFav}
      onChange={(event, newValue) => {
          setValue(newValue);
          changeFavoriteRating(newValue);
        }}
      onChangeActive={(event, newHover) => {
          
          setHover(newHover);
        }}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
      size="large"
    />
    :
    <StyledRating
      name="highlight-selected-only"
      value={defaultFav}
      onChange={(event, newValue) => {
          setValue(newValue);
          changeFavoriteRating(newValue);
        }}
      onChangeActive={(event, newHover) => {
          
          setHover(newHover);
        }}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
      size="large"
    />}
    <Typography>
     <Textual value={defaultFav}/>
    </Typography>
    
    </Box>
    </>
  );
}


export const ValorateDialog = (props)=>{
  const CHARACTER_LIMIT = 250;
  const {open, handleAccept, handleClose, valoration, subject}=props;

  const [comment, setComment]= useState(valoration.comment);
  
  const commentChange = (event)=>{
    if (comment.length < CHARACTER_LIMIT){
        setComment(event.target.value)
    }
  }
  return (
    <>
   
     {/* VALORATIONS DIALOG */}

     <Dialog open={open} >
     <DialogTitle>{i18next.t("Value")} {subject}</DialogTitle>
     <DialogContent>
     <DialogContentText>
         <Box sx={{display: 'flex', alignItems:"center"}}>
         <FavoriteIcon value={valoration.value} /> <Typography variant='body1' ml={1}>{customIcons[valoration.value]!==undefined?i18next.t(customIcons[valoration.value].label):<></>}</Typography>
         
         </Box>
         <Typography variant='body1' sx={{mt:1}}> {i18next.t("Add a comment")}</Typography>
     </DialogContentText>
     <TextField
         autoFocus
         multiline
         margin="dense"
         id="userValoration"
         label={i18next.t("Valoration")}
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
     <Button onClick={(e)=>{e.preventDefault(); handleAccept(valoration.value, comment)}}>{i18next.t("Accept")}</Button>
     <Button onClick={handleClose}>{i18next.t("Cancel")}</Button>
     </DialogActions>
 </Dialog>
 </>)
}

export const ValorateCollection = (props) =>{
  //props : collection, textColor, backGroundcolor

  var {collection, user, textColor, backgroundColor, updateValoration} = props;
  const [userValorationObj, setUserValorationObj]= useState({
    value: 0,
    comment: ""
  });

  const [accepted, setAccepted] = useState(acceptedValorations(collection.valorations))

  //console.log("USERVALORATION", userValorationObj)
  const [dialogOpen, setDialogOpen]=useState(false);
  const [firstTime, setFirstTime]=useState(false);

  const handleValorationDialogOpen= ()=>{
   
    setDialogOpen(true);
  }
  const handleDialogAccept= (value, comment)=>{
    
    userValorationObj.value = value;
    userValorationObj.comment = comment;
    console.log("VALORATION IN CHILD",userValorationObj)
    updateValoration(userValorationObj, firstTime);
    setFirstTime(false);
    setDialogOpen(false);
  }

  const handleDialogClose= (event)=>{
    event.preventDefault();
    setDialogOpen(false);
  }

  const changeFavoriteRating = (newValue)=>{
    if (newValue!==null || newValue!==undefined){
        //console.log("ESTAMOS EN CHANGEFAVORITE",newValue)
        setUserValorationObj({...userValorationObj, "value": newValue});
        handleValorationDialogOpen();
    }
  }

  

  React.useEffect(()=>{
    const findCollectionVal = ()=>{
      const founded = collection.valorations.find(item=>item.senderId === user._id)
      if (founded){
        //console.log("FOUNDED VALORATION OF USER", founded)
        setUserValorationObj(founded);
      }
      else {
        //console.log("NO HAY VALORACIONES PREVIAS")
        setFirstTime(true);
      }
    }
   
    if(userValorationObj.comment==="" && userValorationObj.value===0){
      try {
           findCollectionVal();
      } catch (error) {
        console.log(error);
      }
    }
    
  },[collection, user._id, userValorationObj.comment, userValorationObj.value])

  return (
      <>
      {user._id && user._id!==null && user._id!==undefined?<>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          padding={2}
        >
          <Grid item  >
            <Grid container direction="column">
              <Grid item>
                <Typography><b>{i18next.t("Mean valoration")}:</b></Typography>
              </Grid>
              <Grid item>
                <Grid 
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  mb={2}
                >
                  <Grid item>
                      <ValorationMeanIcon valorations={accepted}/>
                  </Grid>
                  <Grid item>
                    <Typography> {i18next.t("of")} {accepted.length} {accepted.length===1?i18next.t("valoration"):i18next.t("valorations")}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>  
          </Grid>
          <Grid item >
            <Grid container direction="column">
              <Grid item>
                <Typography><b>{i18next.t("Your valoration")}:</b></Typography>
              </Grid>
              <Grid item mb={1}>
                <Favorites defaultFav={userValorationObj.value} changeFavoriteRating={changeFavoriteRating} mode={"dark"} />
              </Grid>
              <Grid item>
                <Typography variant='body1'><i>{userValorationObj.comment}</i></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
          <ValorateDialog 
            open={dialogOpen} 
            handleAccept={handleDialogAccept} 
            handleClose={handleDialogClose}
            valoration={userValorationObj}
            subject = {collection.title}
            />
            </>:<>
            <Typography variant='body1' m={2}>
            <i>{i18next.t("Register and LogIn to comment and valorate")}</i>
            </Typography>
            </>}
      </>
  )
}

export const ValorateEdusource = (props) =>{
  //props : collection, textColor, backGroundcolor

  var {edusource, user, textColor, backgroundColor, updateValoration} = props;
  const [userValorationObj, setUserValorationObj]= useState({
    value: 0,
    comment: ""
  });

  const [accepted, setAccepted] = useState(acceptedValorations(edusource.valorations))


  //console.log("USERVALORATION", userValorationObj)
  const [dialogOpen, setDialogOpen]=useState(false);
  const [firstTime, setFirstTime]=useState(false);

  const handleValorationDialogOpen= ()=>{
   
    setDialogOpen(true);
  }
  const handleDialogAccept= (value, comment)=>{
    
    userValorationObj.value = value;
    userValorationObj.comment = comment;
    console.log("VALORATION IN CHILD",userValorationObj)
    updateValoration(userValorationObj, firstTime);
    setFirstTime(false);
    setDialogOpen(false);
  }

  const handleDialogClose= (event)=>{
    event.preventDefault();
    setDialogOpen(false);
  }

  const changeFavoriteRating = (newValue)=>{
    if (newValue!==null || newValue!==undefined){
        //console.log("ESTAMOS EN CHANGEFAVORITE",newValue)
        setUserValorationObj({...userValorationObj, "value": newValue});
        handleValorationDialogOpen();
    }
  }

  React.useEffect(()=>{
    const findCollectionVal = ()=>{
      const founded = edusource.valorations.find(item=>item.senderId === user._id)
      if (founded){
        //console.log("FOUNDED VALORATION OF USER", founded)
        setUserValorationObj(founded);
      }
      else {
        //console.log("NO HAY VALORACIONES PREVIAS")
        setFirstTime(true);
      }
    }
   
    if(userValorationObj.comment==="" && userValorationObj.value===0){
      try {
           findCollectionVal();
      } catch (error) {
        console.log(error);
      }
    }
    
  },[edusource, user._id, userValorationObj.comment, userValorationObj.value])

  return (
      <>
      {user._id && user._id!==null && user._id!==undefined?<>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          padding={2}
          
        >
          <Grid item mr={2}  >
            <Grid container direction="column">
              <Grid item>
                <Typography><b>{i18next.t("Mean valoration")}:</b></Typography>
              </Grid>
              <Grid item>
                <Grid 
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  mb={2}
                >
                  <Grid item>
                      <ValorationMeanIcon valorations={accepted}/>
                  </Grid>
                  <Grid item>
                    <Typography> {i18next.t("of")} {accepted.length} {accepted.length===1?i18next.t("valoration"):i18next.t("valorations")}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>  
          </Grid>
          <Grid item >
            <Grid container direction="column">
              <Grid item>
                <Typography><b>{i18next.t("Your valoration")}:</b></Typography>
              </Grid>
              <Grid item mb={1}>
                <Favorites defaultFav={userValorationObj.value} changeFavoriteRating={changeFavoriteRating} mode={"dark"} />
              </Grid>
              <Grid item>
                <Typography variant='body1'><i>{userValorationObj.comment}</i></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
          <ValorateDialog 
            open={dialogOpen} 
            handleAccept={handleDialogAccept} 
            handleClose={handleDialogClose}
            valoration={userValorationObj}
            subject = {edusource.title}
            />
            </>:<>
            <Typography variant='body1' m={2}>
            <i>{i18next.t("Register and LogIn to comment and valorate")}</i>
            </Typography>
            </>}
      </>
  )
}

export const AddToFav= (props)=>{

  const {edusource,user} = props;
  const dispatch = useDispatch();

  

  const [selected, setSelected]=useState(false)

  const onFavClick = async (event)=>{
    event.preventDefault();
    
    await setInFavorites(user._id, edusource._id, !selected, dispatch); 
    setSelected(!selected);
  }

  React.useEffect(()=>{

    const checkIfInUser = () =>{
      console.log("IS CHECKING IF FAVORITE IS IN USER")
      if (!user.favorites || user.favorites===undefined ||user.favorites ===null){
        console.log("IT IS NOT")
        return false;
      }
      else{
        console.log("FAV STATE",user.favorites.includes(edusource._id))
        return (user.favorites.includes(edusource._id))
      }
    }

    const favInUser = checkIfInUser()
    console.log("EN USE EFFECT FAVSTATE", favInUser)
    setSelected(favInUser)
  },[selected, user])


  return(
    <>
    <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          padding={2}
          
        >
        <Grid item mr={2}  >
          <Grid container direction="column">
            <Grid item>
              <Typography><b>{selected?i18next.t("Already in Favorites"):i18next.t("Add to favorites")}:</b></Typography>
            </Grid>
            <Grid item mb={1}>
              <IconButton onClick={onFavClick}>
                {selected?<>
                <Favorite2Icon style={{ color: 'red' }} />
                </>:<>
                <FavoriteBorderIcon />
                </>}
                
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
    </Grid>
    </>
  )
}