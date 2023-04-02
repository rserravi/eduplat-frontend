import * as React from 'react';
import { phoneTypes } from 'src/utils/phoneTypes';
import MenuItem from '@mui/material/MenuItem';
import {TextField, Grid} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/system';
import i18next from 'i18next';


/// INTERFACE:
///  <SocialForm data={socialInx} frmIndex={1} updateParent = {FunctionOnParents} />

export const PhoneForm = (props) =>{
    const data = props.data;
    const frmNumber = props.frmIndex;
    const updateP = props.updateParent;


    //console.log(data, frmNumber);

    const [phoneFrmData, setPhoneFrmData]= React.useState(data);
    
    const handleChangePhoneType = (event)=>{
        event.preventDefault();
        setPhoneFrmData({...phoneFrmData, "phoneDescription": event.target.value});
        updateP({"data":{"phoneDescription": event.target.value, "phoneNumber":phoneFrmData.phoneNumber}, "index":frmNumber});
        
    }

    const handleChangePhoneNumber = (event)=>{
        event.preventDefault();
        setPhoneFrmData({...phoneFrmData, "phoneNumber": event.target.value});
        updateP({"data":{"phoneDescription": phoneFrmData.phoneDescription, "phoneNumber":event.target.value}, "index":frmNumber});
    }

    return (
        <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2}}> 
                    <Grid container direction="row" justifyContent="space-between" >
                        <Grid item xs={12} sm={5.5} md={5.5}>
                            <TextField
                                id="type"
                                label={i18next.t("Phone Type")}
                                name= "type"
                                select
                                variant="standard"
                                value={phoneFrmData.phoneDescription}
                                onChange={handleChangePhoneType}
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
                                id="phoneNumber"
                                name="phoneNumber"
                                label={i18next.t("Phone Number")}
                                variant="standard"
                                value={phoneFrmData.phoneNumber}
                                fullWidth
                                onChange={handleChangePhoneNumber}
                                                   
                                />
                        </Grid>
                    </Grid>
                </Box>
        </React.Fragment>
    )
}