// imports
import * as React from 'react'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import BlockIcon from '@mui/icons-material/Block';
import { Tooltip } from '@mui/material';

export const customIcons = {
    0: {
      icon: <BlockIcon color="primary" />,
      label: 'No valoration yet',
    },
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied / No useful at all',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied / Not useful',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral / Ok',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied / Useful',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied / Very useful',
    },
  };
  

export const FavoriteIcon = (props)=>{
    const {value}= props;

  return (<><Tooltip title={customIcons[value].label}>{customIcons[value].icon}</Tooltip></>)

}

export const ValorationMeanIcon = (props)=>{
  const {valorations} = props;
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
  console.log(customIcons[result]);
  return(<FavoriteIcon value={result} />)
}