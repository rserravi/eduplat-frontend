import axios from 'axios';

const rootUrl = 'http://localhost:3001/v1';
const edusourceUrl = rootUrl + '/edusource/';
const byLink = edusourceUrl + '/bylink';
const byPromoter = edusourceUrl + '/bypromoter/';
const valorationUrl = edusourceUrl + '/valoration';
const byPromoterSeparated = edusourceUrl + '/sortedbypromoterid';

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

export const fetchEdusourceByPromoter = (id) =>{
    //  http://localhost:3001/v1/edusource/bypromoter?promoterId=63fdb9e80daaa0ce85983c3a
    return new Promise( async(resolve, reject)=>{
        console.log("ID EN FETCHEDUSOURCE",id)
        try {
            const axiosUrl = byPromoter + "?promoterId="+id;
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
            console.log("HA HABIDO UN ERROR en fetchEdusourceByPromoter",error);
            reject(error.message);
        }
    })
}

export const fetchLastResources = () =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = edusourceUrl + "/last";
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
            console.log("RESPUESTA en DELETE RESOURCE");
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
        console.log("frmData en CHANGE VALORATION API",frmData)
        try {
            const res = await axios.patch(valorationUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const findValoration = (userId, edusourceId) =>{
    console.log(userId, edusourceId)
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = valorationUrl + "?userId="+userId+"&edusourceId="+edusourceId;
            console.log(axiosUrl);
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