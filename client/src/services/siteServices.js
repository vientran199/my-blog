import * as request from '~/utils/httpRequest'

export const getPostsPublic = async () => {
    try {
        const response = await request.get('getPostsPublic');
        return response
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}