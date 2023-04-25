import axios from 'axios';
import { getRootUrl } from 'src/utils/rootTools';
import { replaceSpacesWithUnderscores } from 'src/utils/stringOperations';

const rootUrl = getRootUrl();
//const rootUrl = 'http://localhost:3001/v1'
const newAccessJWTurl = rootUrl + "/tokens";
const userUrl = rootUrl + '/user';
const googleRegisterUrl = userUrl + '/google-registration';
const googleLoginUrl = userUrl + '/google-login';
const loginUrl = userUrl + '/login/';
const userListUrl = userUrl + "/list";
const logOutUrl = userUrl + "/logout";
const valorationUrl= userUrl + "/valoration";
const valorationMod = userUrl + "/valorationMod"


export const userGoogleRegistrationAPI = (frmData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(googleRegisterUrl, frmData);
            
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const userFormRegistrationApi = (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(userUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const userLogin = (frmData) =>{
    console.log("USER LOGIN", frmData)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(loginUrl, frmData);
            console.log(res)
            if(res.data.status ==="success"){
                console.log("DATA DE AXIOS EN USERLOGIN",res.data);
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                  "eduplat",
                  JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
                resolve(res.data);
            }
            else{
                console.log("FALLO DE AXIOS")
                reject(res.data);
            }
          
        } catch (error) {
           reject(error);
        }
    })
}

export const userGoogleLogin = (frmData) =>{
    //console.log("USER Google LOGIN", frmData)
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(googleLoginUrl, frmData);
            if(res.data.status ==="success"){
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                  "eduplat",
                  JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
            }
            //console.log("DATA EN USERGOOGLELOGIN",res.data);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}


export const fetchNewAccessJWT = () =>{
    return new Promise( async(resolve, reject)=>{
        try {
            
            const {refreshJWT} = JSON.parse(localStorage.getItem("eduplat"));
            
            if (!refreshJWT){
                reject("Token not found!");
            }
            const res = await axios.get(newAccessJWTurl, {
                headers: {
                    Authorization :refreshJWT,
                }
            });
            if(res.data.status ==="success"){
                sessionStorage.setItem("accessJWT", res.data.accessJWT);   
            } 
            resolve(true);
            
        } catch (error) {
            if (error.message === "Request failed with status code 403"){
                localStorage.removeItem("eduplat");
            }
            reject(false);
        }
    })
}

export const userUpdate = (frmData) =>{
    console.log("USER UPDATE",frmData);
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.patch(userUrl, frmData);
            console.log("RES en USERUPDATE", res)
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const getAllUsers= ()=>{

    return new Promise( async(resolve, reject)=>{
        try {

            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                reject("Token not found!");
            }
            
            const res = await axios.get(userListUrl, {
                headers: {
                    Authorization :accessJWT,
                }
            });
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const fetchUser = () =>{
    return new Promise( async(resolve, reject)=>{
        try {

            const accessJWT = sessionStorage.getItem("accessJWT");
            console.log("ACCESSJWT iN FETCHUSER",accessJWT);
            if (!accessJWT){
                reject("Token not found!");
            }
            else{
                const res = await axios.get(userUrl, {
                    headers: {
                        Authorization :accessJWT,
                    }
                });
                resolve(res.data);
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const userLogout = async() =>{
    return new Promise( async(resolve, reject)=>{
        try {
            console.log("login OUT");
            const accessJWT = sessionStorage.getItem("accessJWT");
            if (!accessJWT){
                console.log("Token not found!");
                reject({"status":"error", "message":"Token not found"})
            }

        
            await axios.delete(logOutUrl, {
                headers: {
                    Authorization :accessJWT,
                }
            }).then((result)=>{
                console.log("RESULT IN LOGOUT",result.data)
                sessionStorage.removeItem("accessJWT")
                resolve(result.data)
                
            }).catch((error)=>{
                console.log("ERROR EN LOGOUT", error);
                reject(error)
            })
            
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
 }

export const checkUserNameExists = (username)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(userUrl+"/checkUser", {params:{
                username
            } 
            });
            if (res.data.status==="success"){
                resolve(true);
            }
            else {
                resolve(false);
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
 }

 export const checkEmailExists = (email)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const route = userUrl+"/checkUser?email="+email
            console.log(route)
            const res = await axios.get(route);
            if (res.data.status==="success"){
                resolve(true);
            }
            else {
                resolve(false);
            }
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
 }

export const fetchUserbyId = (userId) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(userUrl+"/fetchUser?userId="+userId);
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const fetchUserByUsername = (username)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(userUrl+"/fetchuserbyusername?username="+username);
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const searchInUser = (terms, languageFilter)=>{
    const newTerms = replaceSpacesWithUnderscores(terms);
    var newUrl = userUrl+"/search?terms="+newTerms;
    if (!languageFilter || languageFilter!==""){
        newUrl = newUrl + "&lang="+ languageFilter;
    }
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(newUrl);
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

export const addUserValoration = (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        console.log("frmData en ADD USER VALORATION API",frmData)
        try {
            const res = await axios.post(valorationUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const changeUserValoration = (frmData)=>{
    return new Promise( async(resolve, reject)=>{
        console.log("frmData en CHANGE USER VALORATION API",frmData)
        try {
            const res = await axios.patch(valorationUrl, frmData);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

export const setUserAcceptedRejected = (user_id, val_id, accepted, rejected)=>{
    return new Promise( async(resolve, reject)=>{
        const frmData = {
            "user_id":user_id,
            "val_id":val_id,
            "accepted":accepted,
            "rejected":rejected
        }

        try {
            const res = await axios.patch(valorationMod, frmData);
            console.log("UPDATED", res.data)
            resolve(res.data);
            
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}

