import axios, { setAuthToken } from './axiosService';


export const postquestion = data => async dispatch => {

  

    try {
        dispatch({ type: 'POST_QUIZ' });
        await setAuthToken(axios)
        await axios.post(`/api/question`, data);
        let payload = [];
        
        dispatch({ type: 'POST_QUIZ_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        alert(JSON.stringify(error))
        // var obj = error.response.data;
        // const payload = error.response && error.response.data.message
        //     ? error.response.data.message
        //     : obj[Object.keys(obj)[0]]


        // dispatch({ type: 'POST_QUIZ_FAIL', payload });
        // throw error;
    }

};


export const reply = data => async dispatch => {

  

    try {
        dispatch({ type: 'POST_QUIZ' });
        await setAuthToken(axios)
        await axios.post(`/api/question/reply`, data);
        let payload = [];
        
        dispatch({ type: 'POST_QUIZ_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        alert(JSON.stringify(error))
        // var obj = error.response.data;
        // const payload = error.response && error.response.data.message
        //     ? error.response.data.message
        //     : obj[Object.keys(obj)[0]]


        // dispatch({ type: 'POST_QUIZ_FAIL', payload });
        throw error;
    }

};


export const getquestions = (data, limit) => async dispatch => {
    try {
        dispatch({ type: 'FETCH_QUIZS' });
        let payload = []
        const response = await axios.get(`/api/questions?page=${data}&limit=${limit}`);
        payload = response.data
        dispatch({ type: 'FETCH_QUIZS_SUCCESSFUL', payload });
        return

    } catch (error) {
        alert(error)
        const payload = error.response
        dispatch({ type: 'FETCH_QUIZS_FAIL', payload });
        // throw error;
    }

};
