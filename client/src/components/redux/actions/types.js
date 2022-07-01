import axios, { setAuthToken } from './axiosService';




export const gettypes = () => async dispatch => {
    try {

        await dispatch({ type: 'FETCH_TYPES' });
        const response = await axios.get(`/api/types`);
        const payload = response
        
        await dispatch({ type: 'FETCH_TYPES_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_TYPES_FAIL', payload });
        throw error;
    }

};

export const posttype = data => async dispatch => {
    try {
        dispatch({ type: 'POST_TYPE' });
        await setAuthToken(axios)
        const response = await axios.post(`/api/type`, data);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'POST_TYPE_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        dispatch({ type: 'POST_TYPE_FAIL', error });
        throw error;
    }

};