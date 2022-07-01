import axios, { setAuthToken } from './axiosService';


export const getinstituitionswithtypes = (data) => async dispatch => {
    try {
        dispatch({ type: 'FETCH_INSTITUITIONS' });
        const response = await axios.get(`/api/instituitions?type=${data.type}`,);
        const payload = response.data
        // alert(JSON.stringify(payload))
        dispatch({ type: 'FETCH_INSTITUITIONS_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_INSTITUITIONS_FAIL', payload });
        throw error;
    }

};

export const getinstituitions = () => async dispatch => {
    try {
        dispatch({ type: 'FETCH_INSTITUITIONS' });
        // alert(JSON.stringify('payload'))
        const response = await axios.get(`/api/instituitions`);
        const payload = response.data
       
        dispatch({ type: 'FETCH_INSTITUITIONS_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_INSTITUITIONS_FAIL', payload });
        throw error;
    }

};

export const postinsti = data => async dispatch => {
    try {
        dispatch({ type: 'POST_INSTITUITION' });
        await setAuthToken(axios)
        const response = await axios.post(`/api/instituition`, data);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'POST_INSTITUITION_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        dispatch({ type: 'POST_INSTITUITION_FAIL', error });
        throw error;
    }

};