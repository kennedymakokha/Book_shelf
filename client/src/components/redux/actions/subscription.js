import axios, { setAuthToken } from './axiosService';


export const subscribe = (data) => async dispatch => {

    try {
        dispatch({ type: 'SUBSCRIBE' });
        const response = await axios.post(`api/fcm/assign-topic`, data);
        let payload = response
        dispatch({ type: 'SUBSCRIBE_SUCCESSFUL', payload });
        return

    } catch (error) {
        console.log(error)
        const payload = error.response.data.message
        dispatch({ type: 'SUBSCRIBE_FAIL', payload });
        throw error;
    }

};

export const unsubscribe = (data) => async dispatch => {

    try {
        dispatch({ type: 'UNSUBSCRIBE' });
        const response = await axios.post(`api/fcm/revoke-topic`, data);
        let payload = response
        dispatch({ type: 'UNSUBSCRIBE_SUCCESSFUL', payload });
        return

    } catch (error) {
        console.log(error)
        const payload = error.response.data.message
        dispatch({ type: 'UNSUBSCRIBE_FAIL', payload });
        throw error;
    }

};

export const check = (data) => async dispatch => {

    try {
        dispatch({ type: 'CHECK_SUBSCRIBER' });
        const response = await axios.post(`/api/fcm/check-status`, data);
        let payload = response.data

        dispatch({ type: 'CHECK_SUBSCRIBER_SUCCESSFUL', payload });
        return

    } catch (error) {
        console.log(error)
        const payload = error.response.data.message
        dispatch({ type: 'CHECK_SUBSCRIBER_FAIL', payload });
        throw error;
    }

};
