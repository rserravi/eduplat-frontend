import * as React from 'react';
import { useState } from 'react';
import { socialNetworks } from 'src/utils/social-networks-utils';
import MenuItem from '@mui/material/MenuItem';
import {TextField, Grid} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/system';


/// INTERFACE:
///  <SocialForm data={socialInx} frmIndex={1} updateParent = {FunctionOnParents} />

export const SocialForm = (props) =>{
    //const user =  useSelector(state => state.user);
    const data = props.data;
    const frmNumber = props.frmIndex;
    const updateP = props.updateParent;

    //console.log(data, frmNumber);

    const [socialFrmData, setSocialFrmData]= useState(data);
    
    const handleChangeSocialMedia = (event)=>{
        event.preventDefault();
        setSocialFrmData({...socialFrmData, "media": event.target.value});
        updateP({"data":{"media":event.target.value, "user": socialFrmData.user}, "index":frmNumber});
        
    }

    const handleChangeSocialUser = (event)=>{
        event.preventDefault();
        setSocialFrmData({...socialFrmData, "user": event.target.value});
        updateP({"data":{"media":socialFrmData.media, "user": event.target.value}, "index":frmNumber});
        
    }
   
    return (
        <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2}}> 
                    <Grid container direction="row" justifyContent="space-between" >
                        <Grid item xs={12} sm={5.5} md={5.5}>
                            <TextField
                                id="social"
                                label="Social Media"
                                name= "social"
                                select
                                variant="standard"
                                value={socialFrmData.media}
                                onChange={handleChangeSocialMedia}
                                fullWidth
                                sx = {{mr:2, textAlign:'left'}}
                                >
                                {socialNetworks.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <ListItemIcon>
                                        {option.icon}
                                        {option.value}
                                    </ListItemIcon>
                                </MenuItem>
                                ))}  
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={5.5} md={5.5}>
                        
                            <TextField
                                id="socialUser1"
                                name="socialUser1"
                                label="User"
                                variant="standard"
                                value={socialFrmData.user}
                                fullWidth
                                onChange={handleChangeSocialUser}
                                                   
                                />
                        </Grid>
                    </Grid>
                </Box>
        </React.Fragment>
    )
}