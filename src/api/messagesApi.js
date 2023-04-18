import axios from 'axios';
//import { replaceSpacesWithUnderscores } from 'src/utils/stringOperations';

const rootUrl = 'http://13.39.99.41/api/v1';
//const rootUrl = 'http://localhost:3001/v1'
const conversationUrl = rootUrl + '/conversation';

export const getMessages = userId =>{
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.get(conversationUrl+"?userid="+userId.toString());
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

export const sendMessage = (senderId, receiverId, message)=>{

    const frmObj = {
        "senderId": senderId,
        "receiverId": receiverId,
        "message": message
    }
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(conversationUrl, frmObj);
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
            console.log("HA HABIDO UN ERROR en sendMessage",error);
            reject(error.message);
        }
    })
}

export const markAsReadedConversation = (conversationId, userId) =>{
    console.log("en MARK AS READED")
    return new Promise( async(resolve, reject)=>{
        const frmObj = {
            "conversationId": conversationId,
            "userId": userId
        }
        try {
            const res = await axios.patch(conversationUrl, frmObj);
            if(res){
                console.log("RESDATA EN AXIOS",res.data);
                if (res.data.status==="error"){
                    reject(res.data.message)
                }
                resolve(res.data);
            }
            else {
                console.log("ERROR EN AXIOS")
            }
            
            
        } catch (error) {
            console.log("HA HABIDO UN ERROR en markAsReadedConversation",error);
            reject(error.message);
        }
    })

}