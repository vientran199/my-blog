import * as request from '~/utils/httpRequest';

export const updateInfo = async (profileForm) => {
    try {
        const response = await request.put(`profile/updateInfo`, profileForm);
        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const updateAvatar = async (avatar) => {
    try {
        const response = await request.patch(`profile/updateAvatar`, avatar);
        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const getProfileByUsername = async (username) => {
    try {
        const response = await request.get(`profile/${username}`);
        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
