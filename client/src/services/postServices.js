import * as request from '~/utils/httpRequest'

export const getPost = async (filter) => {
    try {
        //filter all,public,private
        const response = await request.get(`post/filter?status=${filter.status}`);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const getPostSaved = async () => {
    try {
        const response = await request.get(`post/getPostSaved`);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const updateReact = async (type, id, data) => {
    try {
        const response = await request.put(`post/${id}/updateReact`, {
            type,
            data
        });
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const updatePost = async (id, formData) => {
    try {
        const response = await request.put(`post/${id}`, formData);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}
export const getPostById = async (id) => {
    try {
        //filter all,public,private
        const response = await request.get(`post/${id}`);
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

export const deleteById = async (postId) => {
    try {
        const response = await request.deletee(`/post/${postId}`);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const search = async (query) => {
    try {
        const response = await request.get(`/post/search?q=${query}`);
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}