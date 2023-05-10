import axios from 'axios';
import { getRootUrl } from 'src/utils/rootTools';

const rootUrl = getRootUrl();
//const rootUrl = 'http://localhost:3001/v1'
const collectionUrl = rootUrl + '/collection';
const markUrl = collectionUrl + "/mark";
const valorationUrl = collectionUrl + "/valoration"
const byPromoter = collectionUrl+"/bypromoter"

export const postCollection = (collection) => {
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(collectionUrl, collection);
            if(res){
               
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
               
               resolve(res)
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const getCollectionById = (id, page)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(collectionUrl+"?id="+id+"&page="+page);
            if(res){
               
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
               
               resolve(res)
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}


export const getCollectionByUrl = (url, page)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(collectionUrl+"?url="+url+"&page="+page);
            if(res){
               
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
               
               resolve(res)
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const fetchLastCollections = (page) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const url = collectionUrl+"?page="+page
            //console.log(url)
            const res = await axios.get(url);
            //console.log("RES EN FETCH LAST RESOURCES",res)
            if(res){
               
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
               
               resolve(res)
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
    
}

export const fetchCollectionsByPromoter = (id, page) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            var axiosUrl = byPromoter + "?promoterId="+id;
            if (page){
                axiosUrl= axiosUrl+"&page="+page;
            }
            //console.log(axiosUrl);
            const res = await axios.get(axiosUrl);
            if(res){
               //console.log("DATA EN FETCHBYPROMOTERID",res.data);
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
                resolve(res.data);
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
            
        } catch (error) {
            console.log("HA HABIDO UN ERROR en fetchEdusourceByPromoter",error);
            reject(error.message);
        }
    })
}

export const searchInCollections = (terms, page) =>{
    
    return new Promise( async(resolve, reject)=>{
        const newUrl = collectionUrl+"?page="+page+"&terms="+terms;
        try {
            const res = await axios.get(newUrl);
            if(res){
                //console.log("RES DATA IN GET RESOURCES OF SEARCH IN RESORCE",res.data);
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
               // resolve(res.data);
               resolve(res)
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const markasReaded = (collectionId, contentId, userId) =>{
    const frmData = {
        "collectionId": collectionId,
        "contentId": contentId,
        "userId": userId
    }
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(markUrl,frmData);
            if(res){
               
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
               
               resolve(res)
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const findCollectionValoration = (userId, collectionId) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = valorationUrl + "?userId="+userId+"&collectionId="+collectionId;
            //console.log(axiosUrl);
            const res = await axios.get(axiosUrl);
            if(res){
                //console.log(res.data);
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
                resolve(res.data);
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
            
        } catch (error) {
            console.log("HA HABIDO UN ERROR en findCollectionValoration",error);
            reject(error.message);
        }
    })

}

export const createCollectionValoration = (collectionId, valoration, userId) =>{
    console.log("CREATE COLLECTION VALORATION", collectionId, valoration)
    const frmData  = {
        _id: valoration._id,
        collectionId:collectionId,
        senderId:userId,
        comment:valoration.comment,
        value:valoration.value
        }
    
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = valorationUrl;
            //console.log(axiosUrl);
            const res = await axios.post(axiosUrl, frmData);
            if(res){
                //console.log(res.data);
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
                resolve(res.data);
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
            
        } catch (error) {
            console.log("HA HABIDO UN ERROR en createCollectionValoration",error);
            reject(error.message);
        }
    })
}

export const updateCollectionValoration = (collectionId, valoration, userId) =>{

    console.log("UPDATECOLLECTIONVALORATION", collectionId, valoration)
    const frmData  = {
        _id :valoration._id,
        senderId:  userId,
        value: valoration.value,
        comment: valoration.comment,
        collectionId: collectionId
        }
    
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = valorationUrl;
            //console.log(axiosUrl);
            const res = await axios.patch(axiosUrl, frmData);
            if(res){
                //console.log(res.data);
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
                resolve(res.data);
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
            
        } catch (error) {
            console.log("HA HABIDO UN ERROR en updateCollectionValoration",error);
            reject(error.message);
        }
    })
}
