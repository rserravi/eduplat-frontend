import * as React from 'react'
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';
//npm buimport _ from 'lodash';

import { fetchEdusourceByPromoter } from 'src/api/edusourceApi'
import { ResourcesNetflixGrid } from 'src/components/resources/resources';

export const MyAccountResources= (props) =>{
    const {user} = props;
    const [newWidth] = useOutletContext();
    const [edusources, setEdusources] = useState();
    const [total, setTotal]= useState(0);

    const onPageChange = (page)=>{
        try {
            fetchEdusourceByPromoter(user._id, page)
            .then((result)=>{
                if (result.status==="success"){
                    //console.log(result);
                    setEdusources(result.result);
                    setTotal(result.result.length)
                }

            }).catch((err)=>{
                console.error(err);
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        if (edusources===null || edusources ===undefined || edusources ===""){
            try {
                fetchEdusourceByPromoter(user._id, 1)
                .then((result)=>{
                    if (result.status==="success"){
                        //console.log(result);
                        setEdusources(result.result);
                        setTotal(result.result.length)
                    }
    
                }).catch((err)=>{
                    console.error(err);
                })
            } catch (error) {
                console.error(error);
            }
           
        }
    },[edusources, user._id])

    return(
        <>
        <ResourcesNetflixGrid edusourceList={edusources} title="My resources" mt={4} defaultMode={"List"} newWidth={newWidth} total={total} setPage={onPageChange}/> 
        </>
    )


    
}