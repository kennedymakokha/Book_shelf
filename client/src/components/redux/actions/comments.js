import axios, { setAuthToken } from './axiosService';


export const getcomments = (id) => async dispatch => {

    try {
        dispatch({ type: 'FETCH_COMMENTS' });

        const response = await axios.get(`/api/comments/${id}`);
        const payload = response.data
        dispatch({ type: 'FETCH_COMMENTS_SUCCESSFUL', payload });
        return response

    } catch (error) {
        const payload = error.response
        dispatch({ type: 'FETCH_COMMENTS_FAIL', payload });
        throw error;
    }

};

export const postcomment = data => async dispatch => {

    try {
        dispatch({ type: 'POST_COMMENT' });
        await setAuthToken(axios)
        const response = await axios.post(`/api/comment`, data);
        let payload = [];
        payload = response;
        dispatch({ type: 'POST_COMMENT_SUCCESSFUL', payload });
        return payload;
    } catch (error) {

        var obj = error.response.data;
        const payload = error.response && error.response.data.message
            ? error.response.data.message
            : obj[Object.keys(obj)[0]]


        dispatch({ type: 'POST_COMMENT_FAIL', payload });
        throw error;
    }

};

export const postreply = data => async dispatch => {

    try {
        dispatch({ type: 'POST_COMMENT' });
        await setAuthToken(axios)
        const response = await axios.post(`/api/reply`, data);
        let payload = [];
        payload = response;
        dispatch({ type: 'POST_COMMENT_SUCCESSFUL', payload });
        return payload;
    } catch (error) {

        var obj = error.response.data;
        const payload = error.response && error.response.data.message
            ? error.response.data.message
            : obj[Object.keys(obj)[0]]


        dispatch({ type: 'POST_COMMENT_FAIL', payload });
        throw error;
    }

};