import axios from 'axios';
import { replaceSpacesWithUnderscores } from 'src/utils/stringOperations';

const rootUrl = 'http://localhost:3001/v1';
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