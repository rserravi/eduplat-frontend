import axios from 'axios';

const rootUrl = 'http://localhost:3001/v1';
const userUrl = rootUrl + '/user/';
const googleRegisterUrl = userUrl + '/google-registration';

export const userGoogleRegistrationAPI = (frmData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(googleRegisterUrl, frmData);
            if (res.status === 'sucess') {
                resolve(res.data);
            }
        } catch (error) {
            reject(error);
        }
    });
};
