import * as React from 'react'
import {  useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';
import { fetchCollectionsByPromoter } from 'src/api/collectionApi';

import { ResourcesNetflixGrid } from 'src/components/resources/resources';

export const MyAccountCollections= (props) =>{
    const {user} = props;
    const [newWidth] = useOutletContext();
    const [collections, setCollections] = useState();
    const [total, setTotal]= useState(0);

    const onPageChange = (page)=>{
        try {
            fetchCollectionsByPromoter(user._id, page)
            .then((result)=>{
                if (result.status==="success"){
                    //console.log(result);
                    setCollections(result.result);
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
        if (collections===null || collections ===undefined || collections ===""){
            try {
                fetchCollectionsByPromoter(user._id, 1)
                .then((result)=>{
                    if (result.status==="success"){
                        //console.log(result);
                        setCollections(result.result);
                        setTotal(result.result.length)
                    }
    
                }).catch((err)=>{
                    console.error(err);
                })
            } catch (error) {
                console.error(error);
            }
           
        }
    },[collections, user._id])

    return(
        <>
        <ResourcesNetflixGrid edusourceList={collections} title="My Collections" mt={4} defaultMode={"List"} newWidth={newWidth} total={total} setPage={onPageChange} isCollection={true}/> 
        </>
    )


    
}