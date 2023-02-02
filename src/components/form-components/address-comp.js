import * as React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Autocomplete, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { countries } from 'src/utils/countries';

export const AddressForm = (props) =>{
    const user =  useSelector(state => state.user);
   

    const InitData = {
        streetaddress: user.streetaddress,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country,
    }
    const dispatch = useDispatch();
    const [addressFrmDta, setAddressFrmData] = React.useState(InitData);
    React.useEffect (()=>{
        //console.log(props)
        if (props.editUser){
            const InitData2 = {
                streetaddress: user.streetaddress,
                city: user.city,
                state: user.state,
                postalCode: user.postalCode,
                country: user.country,
            }
            setAddressFrmData(InitData2)
        }
    
      },[props,user.streetaddress,user.city,user.state, user.postalCode,user.country])

    const handleChangeStreetAddress = (event) => {
        setAddressFrmData({...addressFrmDta, "streetaddress": event.target.value})
        //dispatch(nc_streetaddress_Commit(event.target.value))
    
      };

    const handleChangeCity = (event) => {
        setAddressFrmData({...addressFrmDta, "city": event.target.value})
        //dispatch(nc_city_Commit(event.target.value))

    };

    const handleChangeState= (event) => {
        setAddressFrmData({...addressFrmDta, "state": event.target.value})
        //dispatch(nc_state_Commit(event.target.value))

    };

    const handleChangePostalCode= (event) => {
        setAddressFrmData({...addressFrmDta, "postalCode": event.target.value})
        //dispatch(nc_postalCode_Commit(event.target.value))

    };

    const handleChangeCountry= (event) => {
        console.log(event.target.childNodes)
        if (event.target.childNodes[1]){
            setAddressFrmData({...addressFrmDta, "country": event.target.childNodes[1].data})
            //dispatch(nc_country_Commit(event.target.childNodes[1].data))
        }
         // dispatch(nc_countryPhoneCode_Commit(event.target.childNodes[5].data))

    };

    return (
        <React.Fragment>
              <Card sx={{ display: 'flex',  width: '100%'  }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', m:2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width:'100%'  }}>
                <TextField
                    id="streetaddress"
                    name="streetaddress"
                    label="Street"
                    helperText=""
                    variant="standard"
                    fullWidth
                    focused
                    value={addressFrmDta.streetaddress}
                    onChange={handleChangeStreetAddress}     
                    />
                </Box>

               <Grid container justifyContent="space-between">
               <Grid item xs={12} sm={3.5} md={3.5} sx={{mt:2, mr:0.5}}>
                <TextField
                    id="city"
                    name="city"
                    label="City or Town"
                    helperText=""
                    variant="standard"
                    fullWidth
                    focused
                    sx = {{mr:2}}
                    value={addressFrmDta.city}
                    onChange={handleChangeCity}
                    
                    />
                 </Grid>
                <Grid item xs={12} sm={3} md={3} sx={{mt:2,mr:0.5}}>
                <TextField
                    id="state"
                    name="state"
                    label="State or Province"
                    helperText=""
                    variant="standard"
                    fullWidth
                    focused
                    sx = {{mr:2}}
                    value={addressFrmDta.state}
                    onChange={handleChangeState}
                    
                    />
                  </Grid>
                <Grid item xs={12} sm={2} md={2} sx={{mt:2, mr:0.5}}>
                <TextField
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    helperText=""
                    variant="standard"
                    fullWidth
                    focused
                    sx = {{mr:2}}
                    value={addressFrmDta.postalCode}
                    onChange={handleChangePostalCode}
                    
                    />
                  </Grid>
                <Grid item xs={12} sm={3} md={3} sx={{mt:2}}>
                <Autocomplete
                    id="country"
                    fullWidth
                    options={countries}
                    variant="standard"
                    label="Country"
                    onChange={handleChangeCountry}
                    autoHighlight
                    
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        {option.label} 
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        variant="standard"
                        value={addressFrmDta.country}
                        focused
                        helperText=""
                        label="Country2"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        />
                    )}
                    />
                  </Grid>
               </Grid>
              </Box>

              </Card>
        </React.Fragment>

    )
}