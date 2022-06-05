import * as request from '~/utils/httpRequest'

export const getPost = async (filter) => {
    try {
        //filter all,public,private
        const response = await request.get('post', filter);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const create = async (postForm) => {
    try {
        const response = await request.post('post/create', postForm);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}