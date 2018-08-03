const axios = require('axios');

async function getAuthToken(endPoint, params) {
    try {
        const response = await axios.post(endPoint, params)
        const tokenObject = response.data;
        return tokenObject;
    } catch (error) {
        console.log(error);
        return error;
    }

}

async function getUserProfile(endPoint, bearerToken) {
    const axiosProfileInstance = axios.create({
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Accept-Language': 'en_US',
            'Content-Type': 'application/json'
        }
    });


    try {
        const response = await axiosProfileInstance.get(endPoint);
        const profileObject = response.data;
        return profileObject;

    } catch (error) {
        console.log(error);
        return error;
    }

}

async function getUserActivities(endPoint, bearerToken, limitVal = null, offsetVal = null) {
    axiosActivityInstance = axios.create({
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Accept-Language': 'en_US',
            'Content-Type': 'application/json'
        }
    });

    try {
        const response = await axiosActivityInstance.get(endPoint, {
            params: {
                limit: limitVal,
                offset: offsetVal
            }
        });

        const activityObject = response.data;
        return activityObject;

    } catch (error) {
        console.log(error);
        return error;
    }



}

module.exports = {
    getAuthToken,
    getUserProfile,
    getUserActivities
}