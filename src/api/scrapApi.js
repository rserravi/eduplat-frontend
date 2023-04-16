import axios from 'axios';

const rootUrl = 'http://15.237.107.238:3001/api/v1';
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