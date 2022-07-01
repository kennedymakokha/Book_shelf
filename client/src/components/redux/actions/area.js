import axios, { setAuthToken } from './axiosService';


export const getareaswithtypes = (data) => async dispatch => {
    try {
        dispatch({ type: 'FETCH_AREAS' });
        const response = await axios.get(`/api/areas?type=${data.type}`,);
        const payload = response.data
        // alert(JSON.stringify(payload))
        dispatch({ type: 'FETCH_AREAS_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_AREAS_FAIL', payload });
        throw error;
    }

};

export const getareas = () => async dispatch => {
    try {
        dispatch({ type: 'FETCH_AREAS' });
        const response = await axios.get(`/api/areas`,);
        const payload = response.data
        // alert(JSON.stringify(payload))
        dispatch({ type: 'FETCH_AREAS_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_AREAS_FAIL', payload });
        throw error;
    }

};

export const postarea = data => async dispatch => {
    try {
        dispatch({ type: 'POST_AREA' });
        await setAuthToken(axios)
        const response = await axios.post(`/api/area`, data);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'POST_AREA_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        dispatch({ type: 'POST_AREA_FAIL', error });
        throw error;
    }

};

export const deletearea= (id) => async dispatch => {

    try {
        await setAuthToken(axios)
        dispatch({ type: 'DELETE_AREA' });
        const response = await axios.put(`/api/area/${id}/delete`);
        const payload = response.data
        dispatch({ type: 'DELETE_AREA_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'DELETE_AREA_FAIL', payload });
        throw error;
    }

};