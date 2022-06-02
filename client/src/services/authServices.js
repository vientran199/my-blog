import * as request from '~/utils/httpRequest';

export const login = async (userForm) => {
    try {
        const response = await request.post('auth/login', userForm);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (userForm) => {
    try {
        const response = await request.post('auth/register', userForm);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
