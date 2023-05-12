import { Grid, Typography,Chip, Avatar } from '@mui/material';
import * as React from 'react'
import i18next from 'i18next';
import {  useState, useEffect } from 'react';
import Loader from 'src/ui-component/Loader';
import { useSelector } from 'react-redux';

import { getConnected } from 'src/api/userApi';
import { getRightPicture } from 'src/utils/picUtils';

export const ConnectedUsers= () =>{
    const user = useSelector(state => state.user)
    const [connected, setConnected] = useState([]);
    const [firstLoad, setFirstLoad]= useState(true);

    const minutesSinceAdded = (addedAt) => {
        const addedAtDate = new Date(addedAt);
        const now = new Date();
        const diffMs = now - addedAtDate;
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // calculate the difference in minutes
        return diffMins;
      };
      
    
    useEffect(()=>{
        const fetchConnected = async () =>{
            await getConnected().then((users)=>{
                setConnected(users)
            }).catch((err)=>{console.log(err)})
        }

        if (firstLoad){
            console.log("EN FIRST LOAD")
            fetchConnected ()
            setFirstLoad(false);
        }
        
       
    },[])


    if (user && user._id !=="" ){
    return (
        <React.Fragment>
                <Grid item>
                    <Typography variant='h3' sx={{my:2}}>{connected.length} {i18next.t("Connected Users")}</Typography>
                </Grid>
                <Grid container>
                    {connected.map((user, index)=>{
                        const timeSinceAdded = minutesSinceAdded(user.access.addedAt);
                        return(
                            <React.Fragment key={index}>
                                <Chip
                                    avatar={<Avatar alt={user.username} src={getRightPicture(user.picture)} />}
                                    label={user.username + " (" + timeSinceAdded + " "+ i18next.t("minutes") +")" }
                                    variant="outlined"
                                    component="a"
                                    clickable
                                    href={'/user/'+user.username}
                                />
                            </React.Fragment>
                        )

                    })}
                </Grid>
       
        </React.Fragment>
    )
   }
    else {
        <>
            <Loader />
        </>
    }
}