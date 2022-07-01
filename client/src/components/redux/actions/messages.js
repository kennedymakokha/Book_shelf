import axios, { setAuthToken } from './axiosService';



export const getConversationMessages = (id) => async dispatch => {
    try {
        dispatch({ type: 'FETCH_CONVERSATION_MESSAGES' });
        await setAuthToken(axios)
        const response = await axios.get(`/api/messages/${id}`);
        const payload = response.data
        dispatch({ type: 'FETCH_CONVERSATION_MESSAGES_SUCCESSFUL', payload });
        return response
    } catch (error) {
        const payload = error.response.data.message
        dispatch({ type: 'FETCH_CONVERSATION_MESSAGES_FAIL', payload });
        throw error;
    }

};
export const PostMessage = data => async dispatch => {
    try {
        dispatch({ type: 'POST_CONVERSATION_MESSAGE' });
        const response = await axios.post(`/api/message`, data);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'POST_CONVERSATION_MESSAGE_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        dispatch({ type: 'POST_CONVERSATION_MESSAGE_FAIL', error });
        throw error;
    }

};