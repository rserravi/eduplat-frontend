import axios from 'axios';
import { getRootUrl } from 'src/utils/rootTools';
import { replaceSpacesWithUnderscores } from 'src/utils/stringOperations';

const rootUrl = getRootUrl();
//const rootUrl = 'http://localhost:3001/v1'
const edusourceUrl = rootUrl + '/edusource/';
const byLink = edusourceUrl + '/bylink';
const byPromoter = edusourceUrl + '/bypromoter/';
const valorationUrl = edusourceUrl + '/valoration';
const byPromoterSeparated = edusourceUrl + '/sortedbypromoterid';
const valorationMod = edusourceUrl + '/valorationMod';

export const fetchEdusourceByLink = (link) =>{
    //console.log("FETCHING", link)
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = byLink + "?link="+link;
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
            console.log("HA HABIDO UN ERROR en fetchEdusourceByLink",error);
            reject(error.message);
        }
    })
}

export const fetchEdusourceById = (id)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = edusourceUrl + "?id="+id;
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
            console.log("HA HABIDO UN ERROR en fetchEdusourceById",error);
            reject(error.message);
        }
    })
}

export const fetchEdusourceByPromoter = (id, page) =>{
    //  http://localhost:3001/v1/edusource/bypromoter?promoterId=63fdb9e80daaa0ce85983c3a
    return new Promise( async(resolve, reject)=>{
       // console.log("ID EN FETCHEDUSOURCE",id)
        try {
            var axiosUrl = byPromoter + "?promoterId="+id;
            if (page){
                axiosUrl= axiosUrl+"&page="+page;
            }
            //console.log(axiosUrl);
            const res = await axios.get(axiosUrl);
            if(res){
               //console.log("DATA EN FETCH",res.data);
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

export const fetchLastResources = (page) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = edusourceUrl + "/last?page="+page;
            //console.log(axiosUrl);
            const res = await axios.get(axiosUrl);
            if(res){
               // console.log("RES DATA IN FETCH",res.data);
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
            console.log("HA HABIDO UN ERROR en fetchLastResources",error);
            reject(error.message);
        }
    })
}

export const createResource = (frmData)=>{
 
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(edusourceUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const updateTheResource = (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.patch(edusourceUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const deleteResource = (frmData)=>{
 
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.delete(edusourceUrl+"?edusourceId="+frmData._id);
            //console.log("RESPUESTA en DELETE RESOURCE");
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })

}

export const addValoration = (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        console.log("frmData en ADD VALORATION API",frmData)
        try {
            const res = await axios.post(valorationUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const changeValoration = (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        //console.log("frmData en CHANGE VALORATION API",frmData)
        try {
            const res = await axios.patch(valorationUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const findValoration = (userId, edusourceId) =>{
   //console.log(userId, edusourceId)
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = valorationUrl + "?userId="+userId+"&edusourceId="+edusourceId;
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
            console.log("HA HABIDO UN ERROR en findValoration",error);
            reject(error.message);
        }
    })
}

export const fetchValorationsSorted = (promoterId) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = byPromoterSeparated + "?promoterId="+promoterId;
            //console.log(axiosUrl);
            const res = await axios.get(axiosUrl);
            if(res){
               // console.log(res.data);
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
                resolve(res.data);
            }
            else {
                console.log("NO EXISTE LA URL")
            }
            
            
        } catch (error) {
            console.log("HA HABIDO UN ERROR en fetchValorationsSorted",error);
            reject(error.message);
        }
    })
}

export const searchInResources = (terms, languageFilter, categoriesFilter, levelFilter, themesFilter, page)=>{
    var newUrl = edusourceUrl+"/search?terms="+terms;
    if (!languageFilter || languageFilter!==""){
        newUrl = newUrl + "&lang="+ languageFilter;
    }

    if (categoriesFilter && categoriesFilter!==""){
        newUrl = newUrl + "&category="+ categoriesFilter;
    }

    if (levelFilter && levelFilter!==""){
        newUrl = newUrl + "&level="+ levelFilter;
    }

    if (themesFilter && themesFilter!==""){
        newUrl = newUrl + "&themes="+ themesFilter;
    }
    newUrl = newUrl + "&page="+page;


    return new Promise( async(resolve, reject)=>{
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

export const searchResourcesMinimal = (terms) =>{
    const newUrl = edusourceUrl+ "minsearch?terms="+terms;
    return new Promise( async(resolve, reject)=>{
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

export const getResourcesOfCategory = (cat, page) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(edusourceUrl+"category?category="+replaceSpacesWithUnderscores(cat)+"&page="+page);
            if(res){
               // console.log("RES DATA IN GET RESOURCES OF CATEGORY",res.data);
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

export const getResourcesOfTheme = (thm) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(edusourceUrl+"theme?theme="+replaceSpacesWithUnderscores(thm));
            //console.log("RES IN GET THEM", res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const getResourcesOfType = (thm,page) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(edusourceUrl+"type?type="+replaceSpacesWithUnderscores(thm)+"&page="+page);
            if(res){
                //console.log("RES DATA IN GET RESOURCES OF TYPE",res.data);
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

export const getResourcesOfLevel = (level, page) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(edusourceUrl+"level?level="+level+"&page="+page);
            if(res){
                //console.log("RES DATA IN GET RESOURCES OF LEVEL",res.data);
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

export const getResourcesOflanguage = (lang, page) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(edusourceUrl+"language?language="+lang+"&page="+page);
            //console.log("RES IN GET THEM", res.data)
            if(res){
                console.log("RES DATA IN GET RESOURCES OF LANG",res.data);
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

export const setAcceptedRejected = (edu_id, val_id, accepted, rejected)=>{
    return new Promise( async(resolve, reject)=>{
        const frmData = {
            "edu_id":edu_id,
            "val_id":val_id,
            "accepted":accepted,
            "rejected":rejected
        }

        try {
            const res = await axios.patch(valorationMod, frmData);
            //console.log("UPDATED", res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

/* // Pagination 
router.get("/search/:page", (req, res, next) => {
    const resultsPerPage = 5;
    let page = req.params.page >= 1 ? req.params.page : 1;
    const query = req.query.search;

    page = page - 1

    Product.find({ name: query })
        .select("name")
        .sort({ name: "asc" })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
        .then((results) => {
            return res.status(200).send(results);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
}); */