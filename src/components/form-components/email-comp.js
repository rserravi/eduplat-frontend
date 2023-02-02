import * as React from 'react';
import { phoneTypes } from 'src/utils/phoneTypes';
import MenuItem from '@mui/material/MenuItem';
import {TextField, Grid} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/system';


/// INTERFACE:
///  <SocialForm data={socialInx} frmIndex={1} updateParent = {FunctionOnParents} />

export const EmailForm = (props) =>{
    const data = props.data;
    const frmNumber = props.frmIndex;
    const updateP = props.updateParent;


    //console.log(data, frmNumber);

    const [emailFrmData, setEmailFrmData]= React.useState(data);
    
    const handleChangeEmailUrl = (event)=>{
        event.preventDefault();
        setEmailFrmData({...emailFrmData, "emailUrl": event.target.value});
        updateP({"data":{"emailUrl":event.target.value, "emailDescription":emailFrmData.emailDescription}, "index":frmNumber});
        
    }

    const handleChangeEmailType = (event)=>{
        event.preventDefault();
        setEmailFrmData({...emailFrmData, "emailDescription": event.target.value});
        updateP({"data":{"emailUrl":emailFrmData.emailUrl, "emailDescription":event.target.value}, "index":frmNumber});
    }

    return (
        <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2}}> 
                    <Grid container direction="row" justifyContent="space-between" >
                        <Grid item xs={12} sm={5.5} md={5.5}>
                            <TextField
                                id="type"
                                label="Email Type"
                                name= "type"
                                select
                                variant="standard"
                                value={emailFrmData.emailDescription}
                                onChange={handleChangeEmailType}
                                fullWidth
                                sx = {{mr:2, textAlign:'left'}}
                                >
                                {phoneTypes.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    <ListItemIcon>
                                        {option.label}
                                    </ListItemIcon>
                                </MenuItem>
                                ))}  
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={5.5} md={5.5}>
                        
                            <TextField
                                id="emailUrl"
                                name="emailUrl"
                                label="Email"
                                variant="standard"
                                value={emailFrmData.emailUrl}
                                fullWidth
                                onChange={handleChangeEmailUrl}
                                                   
                                />
                        </Grid>
                    </Grid>
                </Box>
        </React.Fragment>
    )
}