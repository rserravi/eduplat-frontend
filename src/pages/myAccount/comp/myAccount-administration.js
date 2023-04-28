import { Typography } from '@mui/material';
import * as React from 'react'
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';
//npm buimport _ from 'lodash';

import { ResourcesNetflixGrid } from 'src/components/resources/resources';

export const MyAccountAdministration= (props) =>{
    const {user} = props;
    const [newWidth] = useOutletContext();
   

    if (user.isBoss){
    return(
        <>
            <Typography variant='h3'>Administration</Typography>
        </>
    )
    }{
    return(
        <>
            <Typography variant='h3'>NOT AUTHORIZED</Typography>
        </>
    )

    }


    
}