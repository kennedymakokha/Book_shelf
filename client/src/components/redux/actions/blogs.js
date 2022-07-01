import axios, { setAuthToken } from './axiosService';


export const getblogs = (data, limit) => async dispatch => {
    try {
        dispatch({ type: 'FETCH_BLOGS' });
        let payload = []
        const response = await axios.get(`/api/blogs?page=${data}&limit=${limit}`);
        payload = response.data
        // alert(JSON.stringify(payload))
        dispatch({ type: 'FETCH_BLOGS_SUCCESSFUL', payload });
        return

    } catch (error) {
        console.log(error)
        // const payload = error.response.data.message
        // dispatch({ type: 'FETCH_BLOGS_FAIL', payload });
        // throw error;
    }

};

export const search = (data) => async dispatch => {

    setAuthToken(axios);

    try {
        dispatch({ type: 'FETCH_BLOGS' });
        let payload = []
        const response = await axios.post(`/api/note/search?word=${data}`);
        payload = response.data.note
        dispatch({ type: 'FETCH_BLOGS_SUCCESSFUL', payload });
        return

    } catch (error) {
        console.log(error.response)
        const payload = error.response
        dispatch({ type: 'FETCH_BLOGS_FAIL', payload });
        throw error;
    }




};

export const getblog = (id) => async dispatch => {

    try {
        dispatch({ type: 'FETCH_BLOG' });

        const response = await axios.get(`/api/blog/${id}`);
        const payload = response.data
        dispatch({ type: 'FETCH_BLOG_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_BLOG_FAIL', payload });
        throw error;
    }

};
export const likelog = (id) => async dispatch => {

    try {
        // dispatch({ type: 'FETCH_BLOG' });
        await setAuthToken(axios);
        const response = await axios.post(`/api/blog/like/${id}`);
        // const payload = response.data
        // dispatch({ type: 'FETCH_BLOG_SUCCESSFUL', payload });
        return response

    } catch (error) {

        // const payload = error.response
        // dispatch({ type: 'FETCH_BLOG_FAIL', payload });
        throw error;
    }

};

export const postblog = data => async dispatch => {

    var formData = new FormData();
    if (data.file) {
        formData.append('file', data.file);
    }
    formData.append('body', data.body);
    formData.append('title', data.title);

    try {
        dispatch({ type: 'POST_BLOG' });
        await setAuthToken(axios)
        // alert(formData)
        const response = await axios.post(`/api/blog`, formData);
        let payload = [];
        payload = response
        dispatch({ type: 'POST_BLOG_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        // alert(JSON.stringify(error.response))
        console.log(JSON.stringify(error))
        let payload = ""
        if (error.response === undefined) {
            payload = "timeout"
            dispatch({ type: 'POST_BLOG_FAIL', payload });
            throw error;
        }
        else {
            var obj = error.response.data;
            payload = error.response && error.response.data.message
                ? error.response.data.message
                : obj[Object.keys(obj)[0]]
            dispatch({ type: 'POST_BLOG_FAIL', payload });
            throw error;

        }


    }

};
export const publishblog = (id) => async dispatch => {

    try {
        await setAuthToken(axios)
        dispatch({ type: 'PUBLISH_NOTE' });

        const response = await axios.put(`/api/blog/${id}/publish`);
        const payload = response.data
        dispatch({ type: 'PUBLISH_NOTE_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        alert(error)
        dispatch({ type: 'PUBLISH_NOTE_FAIL', payload });
        throw error;
    }

};
export const deleteblog = (id) => async dispatch => {

    try {
        await setAuthToken(axios)
        dispatch({ type: 'DELETE_NOTE' });

        const response = await axios.put(`/api/blog/${id}/delete`);
        const payload = response.data
        dispatch({ type: 'DELETE_NOTE_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'DELETE_NOTE_FAIL', payload });
        throw error;
    }

};
