import * as React from 'react'
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';
import _ from 'lodash';

import { fetchEdusourceByPromoter } from 'src/api/edusourceApi'
import { ResourcesNetflixGrid } from 'src/components/resources/resources';

export const MyAccountResources= (props) =>{
    const {user} = props;
    const [newWidth] = useOutletContext();
    const [edusources, setEdusources] = useState();

    useEffect(()=>{
        if (edusources===null || edusources ===undefined || edusources ===""){
            try {
                fetchEdusourceByPromoter(user._id)
                .then((result)=>{
                    if (result.status==="success"){
                        //console.log(result);
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
        <ResourcesNetflixGrid edusourceList={edusources} title="My resources" mt={4} defaultMode={"List"} newWidth={newWidth}/> 
        </>
    )


    
}