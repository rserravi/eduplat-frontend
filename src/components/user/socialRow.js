import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { Box, CssBaseline } from '@mui/material';
import { findSocialIcon, getUserProfile } from 'src/utils/social-networks-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeOptions } from 'src/theme/theme';

const theme = createTheme(themeOptions);

export const SocialRow =(props) =>{

  const {user, type, sx} = props;

  console.log(user, type);

  const navigation = (payload) =>{
    console.log(payload)
    window.open(payload);
  }


  return (
    <>
    <ThemeProvider theme={theme}>
                <CssBaseline />
     {/* SOCIAL */}


   
    <Box sx={{ display: 'inline-flex',...sx}} >
        {user.social.map((snet, index)=>{
            return(
            <React.Fragment key={index}>
                
                <IconButton 
                    size='small'
                   
                    onClick={(e)=>{e.preventDefault(); {navigation(getUserProfile(snet.media,snet.user))}}}
                    style={{ color: type==="default"? "primary":user.secondaryColor}}
                    >
                   
                    {findSocialIcon(snet.media)} 
                
                </IconButton>
            
            </React.Fragment>
            )
    })}
    
    {/* EMAILS */}

    {user.publicData.emails?
    <>
        {user.emails.map((email, index)=>{
            return(
                <React.Fragment key={index}>
            
                <IconButton 
                    size='small'
                    onClick={(e)=>{e.preventDefault(); {navigation("mailto:"+email.emailUrl)}}}
                    style={{ color: type==="default"? "primary":user.secondaryColor}}
                    
                    >
                    <EmailIcon />
                </IconButton>
            
            </React.Fragment>
            )
        })}
    </>:<></>}

     {/* PHONES */}

    {user.publicData.phones?
    <>
        {user.phones.map((phone, index)=>{
            return(
                <React.Fragment key={index}>
            
                <IconButton 
                    size='small'
                    onClick={(e)=>{e.preventDefault(); {navigation("tel:"+phone.phoneNumber)}}}
                    style={{ color: type==="default"? "primary":user.secondaryColor}}
                    
                    >
                    <PhoneForwardedIcon />
                </IconButton>
            
            </React.Fragment>
            )
        })}
    </>:<></>}
    
    </Box>
    </ThemeProvider>
    </>
  )
}