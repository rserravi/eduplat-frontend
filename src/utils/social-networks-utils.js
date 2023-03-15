import * as React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const socialNetworks = [
    {
      value: 'Facebook',
      icon: <React.Fragment><FacebookIcon /></React.Fragment>,
    },
    {
      value: 'Twitter',
      icon: <React.Fragment><TwitterIcon /></React.Fragment>,
    },
    {
      value: 'Instagram',
      icon: <React.Fragment><InstagramIcon /></React.Fragment>,
    },
    {
      value: 'LinkedIn',
      icon: <React.Fragment><LinkedInIcon /></React.Fragment>,
    },
    {
      value: 'Pinterest',
      icon: <React.Fragment><PinterestIcon /></React.Fragment>,
    },
    {
      value: 'Reddit',
      icon: <React.Fragment><RedditIcon /></React.Fragment>,
    },
    {
      value: 'Youtube',
      icon: <React.Fragment><YouTubeIcon /></React.Fragment>,
    },
    {
      value: 'Twitch',
      icon: <React.Fragment><ErrorOutlineIcon /></React.Fragment>
    },
    {
      value: 'Discord',
      icon: <React.Fragment><ErrorOutlineIcon /></React.Fragment>
    }
];

export const findSocialIcon= (socialNet) =>{

  const str = socialNet;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);

  const iconFragment = socialNetworks.find(o => o.value === str2 );

  if (iconFragment){
    return iconFragment.icon
  }else{
    return <React.Fragment><ErrorOutlineIcon /></React.Fragment>
  }

  
}

export const getUserProfile = (network, user) =>{
  var result = ""
  switch (network) {
    case "Facebook":
      result= "https://www.facebook.com/"+user
      break;
    case "Twitter":
      result= "https://twitter.com/"+user;
      break;
    case "Instagram":
      result="https://www.instagram.com/"+user;
      break;
    case "Linkedin":
      result="https://www.linkedin.com/in/"+user;
      break;
    case "Pinterest":
      result="https://www.pinterest.com/"+user;
      break;
    case "Reddit":
      result ="https://www.reddit.com/user/"+user;
      break;
    case "Youtube":
      result ="https://www.youtube.com/channel/"+user;
      break;
    case "Twitch":
      result ="https://www.twitch.tv/"+user;
      break;
    default:
      result ="https://eduplat.org";
      break;
  }
  return result;
}