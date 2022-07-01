import axios, { setAuthToken } from './axiosService';



export const likenote = (id) => async dispatch => {

    try {
        await setAuthToken(axios)
        dispatch({ type: 'FETCH_NOTE' });
        const response = await axios.post(`/api/note/${id}/like`);
        const responsew = await axios.get(`/api/note/${id}`);
        const payload = responsew.data
        dispatch({ type: 'FETCH_NOTE_SUCCESSFUL', payload });
        return response

    } catch (error) {
        throw error;
    }

};
export const getnotes = (page, limit, data, searchTerm) => async dispatch => {
    // alert(JSON.stringify(data))

    try {
        dispatch({ type: 'FETCH_NOTES' });
        let payload = []
        let response = undefined
        if (data === undefined) {
            response = await axios.get(`/api/notes?page=${page}&limit=${limit}`);
            payload = response.data
            console.log(JSON.stringify(payload))
            dispatch({ type: 'FETCH_NOTES_SUCCESSFUL', payload });
            return
        }
        else {
            response = await axios.get(`/api/notes?page=${page}&limit=${limit}&${data.name}=${data.type}`);
            payload = response.data
            dispatch({ type: 'FETCH_NOTES_SUCCESSFUL', payload });
            return

        }



    } catch (error) {
        alert(error)
        // const payload = error.response.data
        dispatch({ type: 'FETCH_NOTES_FAIL', error });
        throw error;
    }

};



export const getusernotes = (data) => async dispatch => {

    try {
        await setAuthToken(axios)
        dispatch({ type: 'FETCH_NOTES' });
        let payload = []
        if (data === undefined) {
            const response = await axios.get(`/api/notes/mynotes`);
            payload = response.data
            dispatch({ type: 'FETCH_NOTES_SUCCESSFUL', payload });
            return
        }

        const response = await axios.get(`/api/notes/mynotes?instituition=Kabarak University&type=${data.type}`);
        payload = response.data
        dispatch({ type: 'FETCH_NOTES_SUCCESSFUL', payload });
        return

    } catch (error) {
        console.log(error)
        // const payload = error.response.data.message
        // dispatch({ type: 'FETCH_NOTES_FAIL', payload });
        // throw error;
    }

};
export const getnote = (id) => async dispatch => {

    try {
        dispatch({ type: 'FETCH_NOTE' });

        const response = await axios.get(`/api/note/${id}`);
        const payload = response.data
        dispatch({ type: 'FETCH_NOTE_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'FETCH_NOTE_FAIL', payload });
        throw error;
    }

};
export const publishnote = (id) => async dispatch => {

    try {
        await setAuthToken(axios)
        dispatch({ type: 'PUBLISH_NOTE' });

        const response = await axios.put(`/api/note/${id}/publish`);
        const payload = response.data
        dispatch({ type: 'PUBLISH_NOTE_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'PUBLISH_NOTE_FAIL', payload });
        throw error;
    }

};
export const deletenote = (id) => async dispatch => {

    try {
        await setAuthToken(axios)
        dispatch({ type: 'DELETE_NOTE' });

        const response = await axios.put(`/api/note/${id}/delete`);
        const payload = response.data
        dispatch({ type: 'DELETE_NOTE_SUCCESSFUL', payload });
        return response

    } catch (error) {

        const payload = error.response
        dispatch({ type: 'DELETE_NOTE_FAIL', payload });
        throw error;
    }

};
export const postnotes = data => async dispatch => {

    var formData = new FormData();
    formData.append('type', data.type);
    formData.append('instituition', data.instituition);
    formData.append('title', data.title);
    formData.append('file', data.file);
    formData.append('area', data.area);
    formData.append('level', data.level);
    formData.append('desc', data.desc);



    try {
        dispatch({ type: 'POST_NOTE' });
        await setAuthToken(axios)
        const response = await axios.post(`/api/note`, formData);
        let payload = [];
        payload = response.data.users;
        dispatch({ type: 'POST_NOTE_SUCCESSFUL', payload });
        return payload;
    } catch (error) {
        alert(JSON.stringify(error.response))
        var obj = error.response.data;
        const payload = error.response && error.response.data.message
            ? error.response.data.message
            : obj[Object.keys(obj)[0]]

        dispatch({ type: 'POST_NOTE_FAIL', payload });

        throw error;
    }

};

export const getsubscriptionState = async (data) => {


    try {

        const response = await axios.post(`/api/fcm/check-status`, data);
        // console.log(response.data)
        // alert(JSON.stringify(response.data))
        return response.data

    } catch (error) {

        throw error;
    }

};

