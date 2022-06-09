import * as request from '~/utils/httpRequest'

export const updateInfo = async (profileForm) => {
    try {
        const response = await request.put(`profile/updateInfo`, profileForm);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}