import axios from 'axios';
import { getRootUrl } from 'src/utils/rootTools';
import { replaceSpacesWithUnderscores } from 'src/utils/stringOperations';
import { SET_FAVORITES } from 'src/store/userSlice';
const rootUrl = getRootUrl();
//const rootUrl = 'http://localhost:3001/v1'
const newAccessJWTurl = rootUrl + "/tokens";
const userUrl = rootUrl + '/user';
const googleRegisterUrl = userUrl + '/google-registration';
const googleLoginUrl = userUrl + '/google-login';
const loginUrl = userUrl + '/login/';
const userListUrl = userUrl + "/all";
const logOutUrl = userUrl + "/logout";
const valorationUrl= userUrl + "/valoration";
const valorationMod = userUrl + "/valorationMod"
const userVerificationUrl = userUrl + "/verify"
const userResend = userUrl + "/resendVerificationLink"
const userLostPass = userUrl + "/reset-password"
const userFavorites = userUrl + "/favorites"
const connectedUrl = userUrl + "/connected"




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
    console.log("USER LOGIN", frmData, "Direccion: ", loginUrl)
    const config = {
        url: loginUrl,
        method :'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'origin':'x-requested-with',
            'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        },
        data: frmData
    }
    return new Promise( async(resolve, reject)=>{
        //try {

            const res = await axios(config);
            console.log("USER LOGIN RES",res, loginUrl)
            if(res.data.status ==="success"){
                console.log("DATA DE AXIOS EN USERLOGIN",res.data);
             
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                  "eduplat",
                  JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
               
                resolve(res.data);
            }
            
            if (res.data.status ==="Not Verified"){
                reject({"status":"Not Verified"})
            }
            if (res.data.status === "error"){
                console.log("FALLO DE AXIOS")
                resolve(res.data);
            }
          
       /*  } catch (error) {
           reject(error);
        } */
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
    console.log("EN FETCHNEW")
    return new Promise( async(resolve, reject)=>{
        try {
            console.log("EN PROMISE FETCH")
            const {refreshJWT} = JSON.parse(localStorage.getItem("eduplat"));
            console.log("REFRESH JWT:", refreshJWT)
            
            if (!refreshJWT){
                console.log("REFREH not found")
                reject("Refresh Token not found!");
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
                //localStorage.removeItem("eduplat");
            }
            console.log("NO TOKEN")
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

            
            var accessJWT = sessionStorage.getItem("accessJWT");
           //console.log("ACCESSJWT iN FETCHUSER",accessJWT);
            if (!accessJWT){
                console.log("Access Token not found! Trying Refresh Token");
                await fetchNewAccessJWT().then(async (data)=>{
                    if (data){
                    console.log("DATA EN FETNEWACCESSJWT");
                    //fetchUser();
                    accessJWT = sessionStorage.getItem("accessJWT");
                    const res = await axios.get(userUrl, {
                        headers: {
                            Authorization :accessJWT,
                        }
                    });
                    } else {
                        reject({message: "no Refresh Token"})
                    }


                }).catch((err)=>{
                    console.log("ERROR EN FETCH NEW JWT")
                    reject(err.message);
                })
                
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
                localStorage.removeItem("eduplat")
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
            //console.log("FETCH USER BY USERNAME", res.data, "OF ", username)
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

export const userRegistrationVerification = (frmData) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.patch(userVerificationUrl, frmData);

            resolve(res.data);
            console.log("Status en userRegistration");
            console.log(res.data);
            if(res.data.status ==="success"){
               resolve(res.data)
            }
        } catch (error) {
            console.log("Error en userRegistration");
            reject({status:"error", message:error.error});
        }
    })
}

export const resendVerificationLink = (email)=>{
    const frmData = {
        "email": email
    }
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.patch(userResend, frmData);

            resolve(res.data);
            console.log("Status en resendVerificationLink");
            console.log(res.data);
            if(res.data.status ==="success"){
               resolve(res.data)
            }
        } catch (error) {
            console.log("Error en resendeVerificationLink");
            reject({status:"error", message:error.error});
        }
    })
}


export const sendResetPasswordEmail = (email)=>{
    const frmData = {
        "email": email
    }
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(userLostPass, frmData);
            console.log("Status en sendResetPasswordEmail");
            console.log(res.data);
            if(res.data.status ==="success"){
               resolve(res.data)
            }
        } catch (error) {
            console.log("Error en sendResetPasswordEmail");
            reject({status:"error", message:error.error});
        }
    })
}

export const setNewPassword = (email, pin, password) =>{
    const frmData = {
        "email": email,
        "pin": pin,
        "newPassword": password
    }
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.patch(userLostPass, frmData);
            console.log("Status en setNewPassword");
            console.log(res.data);
            if(res.data.status ==="success"){
               resolve(res.data)
            }
        } catch (error) {
            console.log("Error en setNewPassword");
            reject({status:"error", message:error.error});
        }
    })
}

export const setInFavorites = (userid, edusourceid, value, dispatch) =>{
    const frmData = {
        "userid": userid,
        "edusourceid": edusourceid,
        "value": value
    }
    return new Promise( async(resolve, reject)=>{
       // try {
            const res = await axios.patch(userFavorites,frmData);
            //console.log("DATA EN SET FAVORITES",res.data.status)
            if (res.data.status==="success"){
              //  console.log("FRMDATA EN SETFAVORITES", frmData)
                dispatch(SET_FAVORITES(frmData))

            }
            
       // } catch (error) {
       //     reject(error)
       // }
    })
}

export const getFavourites = (userid, page)=>{
    const aPage = page?page:1
    const urlFavs = ""+ userFavorites+ "?userid="+userid+"&page="+ aPage
    //console.log("GET FAVS IN USERAPI", urlFavs)
    return new Promise( async(resolve, reject)=>{
        await axios.get(urlFavs).then((result)=>{
            //console.log(result);
            resolve(result);
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const getConnected = ()=>{
    return new Promise( async(resolve, reject)=>{
        const accessJWT = sessionStorage.getItem("accessJWT");
        if (!accessJWT){
            reject("Token not found!");
        }
        
        await axios.get(connectedUrl, {
            headers: {
                Authorization :accessJWT,
            }
        }).then((res)=>{
            if (res.data.status==="success"){
                console.log("DATOS EN AXIOS.GET",res)
                 resolve(res.data.users)
                 
             }
             else {
                console.log("ERROR EN AXIOS GET", res)
                 reject(res.data.message)
             }
        }).catch((err)=>{
            reject(err)
        })

        //console.log("RES EN GET CONNECTED",res)

        
    })
}