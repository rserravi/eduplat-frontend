import axios from 'axios';

const rootUrl = 'http://localhost:3001/v1';
const edusourceUrl = rootUrl + '/edusource/';
const byLink = edusourceUrl + '/bylink';
const byPromoter = edusourceUrl + '/bypromoter/';

export const fetchEdusourceByLink = (link) =>{
    console.log("FETCHING", link)
    return new Promise( async(resolve, reject)=>{
        try {
            const axiosUrl = byLink + "?link="+link;
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
            console.log("HA HABIDO UN ERROR",error);
            reject(error.message);
        }
    })
}

export const fetchEdusourceByPromoter = (id) =>{
    //  http://localhost:3001/v1/edusource/bypromoter?promoterId=63fdb9e80daaa0ce85983c3a
    return new Promise( async(resolve, reject)=>{
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
            console.log("HA HABIDO UN ERROR",error);
            reject(error.message);
        }
    })
}
