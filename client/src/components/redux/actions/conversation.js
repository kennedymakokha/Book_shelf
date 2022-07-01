import axios, { setAuthToken } from './axiosService';

export const CreateConversation = data => async dispatch => {
    try {
        dispatch({ type: 'POST_CONVERSATION' });
        const response = await axios.post(`/api/conversation`, data);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'POST_CONVERSATION_MESSAGE', payload });
        return payload;
    } catch (error) {
        dispatch({ type: 'POST_CONVERSATION_FAIL', error });
        throw error;
    }

};
export const getAuthUserConversations = () => async dispatch => {
    try {
        dispatch({ type: 'GET_AUTH_USER_CONVERSATION' });
        await setAuthToken(axios)
        const response = await axios.get(`/api/conversations`);
        const payload = response.data

        dispatch({ type: 'GET_AUTH_USER_CONVERSATION_SUCCESSFUL', payload });
        return response

    } catch (error) {
        console.log(error)
        // const payload = error.response.data.message
        dispatch({ type: 'GET_AUTH_USER_CONVERSATION_FAIL' });
        throw error;
    }

};
export const getUsers = () => async dispatch => {
    try {
        const response = await axios.get(`/api/users`);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'GET_USERS', payload });
        return payload;
    } catch (error) {
        throw error;
    }

};