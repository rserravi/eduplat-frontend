import axios from 'axios';

//const rootUrl = 'http://13.39.99.41/api/v1';
const rootUrl = 'http://localhost:3001/v1'
const scrapUrl = rootUrl + "/scrap";

export const scrapping = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(scrapUrl+"?url="+url);
            
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};