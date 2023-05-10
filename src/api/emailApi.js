import axios from 'axios';
import { getRootUrl } from 'src/utils/rootTools';

const rootUrl = getRootUrl()
//const rootUrl = 'http://localhost:3001/v1'
const emailUrl = rootUrl + '/emails';
const supportUrl = emailUrl+ '/support';

export const sendSupportEmail = (sender, subject, message)=>{

    const frmObj = {
        "sender": sender,
        "subject": subject,
        "message": message
    }
    return new Promise( async(resolve, reject)=>{
        try {
            const res = await axios.post(supportUrl, frmObj);
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

