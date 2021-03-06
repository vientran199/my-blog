import * as request from '~/utils/httpRequest';

export const me = async () => {
    try {
        const response = await request.get('auth');
        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
export const login = async (userForm) => {
    try {
        const response = await request.post('auth/login', userForm);
        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const register = async (userForm) => {
    try {
        const response = await request.post('auth/register', userForm);
        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

export const changePassword = async (formData) => {
    try {
        const response = await request.patch('auth/changePassword', formData);
        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
