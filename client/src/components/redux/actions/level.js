import axios, { setAuthToken } from './axiosService';


export const getlevelswithtypes = (data) => async dispatch => {
    
    try {
        dispatch({ type: 'FETCH_LEVELS' });
        const response = await axios.get(`/api/levels?type=${data.type}`,);
        const payload = response.data
        dispatch({ type: 'FETCH_LEVELS_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_LEVELS_FAIL', payload });
        throw error;
    }

};

export const getlevels = () => async dispatch => {
    try {
        dispatch({ type: 'FETCH_LEVELS' });
        const response = await axios.get(`/api/levels`,);
        const payload = response.data
        // alert(JSON.stringify(payload))
        dispatch({ type: 'FETCH_LEVELS_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_LEVELS_FAIL', payload });
        throw error;
    }

};

export const postlevel = data => async dispatch => {
    try {
        dispatch({ type: 'POST_LEVEL' });
        await setAuthToken(axios)
        const response = await axios.post(`/api/level`, data);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'POST_LEVEL_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        dispatch({ type: 'POST_LEVEL_FAIL', error });
        throw error;
    }

};