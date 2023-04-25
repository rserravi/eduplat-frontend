// imports
import * as React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import BlockIcon from '@mui/icons-material/Block';
import { Tooltip, Typography } from '@mui/material';
import i18next from 'i18next';
import { Box } from '@mui/system';

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
  //console.log("MEAN ICON",valorations)
  var count=0;
  var value=0;

  if (!valorations || valorations===undefined || valorations === null){
    return (<FavoriteIcon value={0} />)
  }
  
  for (let val = 0; val < valorations.length; val++) {
    if (valorations[val].accepted){
      count++;
      value = value + valorations[val].value +1;
    }
  }
  var result;
  if (count===0){
    result = 0
  }
  else{
    result = Math.floor(value / count);
  }
  //console.log(customIcons[result]);
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

export const Favorites = (props)=>{
  const {defaultFav, changeFavoriteRating, mode, ml} = props;
  const [hover, setHover] = React.useState(-1);
  const [value, setValue]= React.useState(defaultFav);

  //console.log("VALOR POR DEFECTO EN FAVORITES",defaultFav)

  const Textual = ()=>{
    var Result = null
   
    if (hover !== -1){
            Result = customIcons[hover].label;
    }
    else {
      if (value && value!==undefined && value!==null){
        Result = customIcons[value].label;
      }
      else {
        Result = "No valoration yet"
      }
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
     <Textual/>
    </Typography>
    
    </Box>
    </>
  );
}