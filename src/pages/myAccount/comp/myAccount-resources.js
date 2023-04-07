import { Grid, Button, Typography, TextField, FormControlLabel, Checkbox, FormGroup, Alert,  MenuItem, Snackbar,  Divider, Chip, Badge, IconButton } from '@mui/material';
import * as React from 'react'
import i18next from 'i18next';
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';
import Loader from 'src/ui-component/Loader';
import _ from 'lodash';
import { userUpdate } from 'src/api/userApi';
import { Valoration } from 'src/components/valoration';
import { themeOptions } from 'src/theme/theme';
import { ValorationMeanIcon } from 'src/components/favorites';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { fetchEdusourceByPromoter, fetchValorationsSorted } from 'src/api/edusourceApi'
import { ExtendedResourceValorations } from 'src/components/pageStruct/valorations';
import { ResourcesNetflixGrid } from 'src/components/resources/resources';

export const MyAccountResources= (props) =>{
    const {user} = props;
    const [loadedUser, setLoadedUser] = useState(user);
    const [newWidth] = useOutletContext();
    const [openSnack, setOpenSnack] = useState(false);
    const [edusources, setEdusources] = useState();

    //SNACK
    const [severity, setSeverity] = useState("info");
    const [message, setMessage] = useState("");

    useEffect(()=>{
        if (edusources===null || edusources ===undefined || edusources ===""){
            try {
                fetchEdusourceByPromoter(user._id)
                .then((result)=>{
                    if (result.status==="success"){
                        console.log(result);
                        setEdusources(result.result);
                    }
    
                }).catch((err)=>{
                    console.error(err);
                })
            } catch (error) {
                console.error(error);
            }
           
        }
    },[])

    return(
        <>
        <ResourcesNetflixGrid edusourceList={edusources} title="My resources" mt={4} newWidth={newWidth}/> 
        </>
    )


    
}