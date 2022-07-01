import axios, { setAuthToken } from './axiosService';

export const register = (data1) => async (dispatch) => {

    const { email, password } = data1
    dispatch({ type: "USER_REGISTER_REQUEST", payload: { email, password } });
    try {
        const { data } = await axios.post(`/api/register`, data1);
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
        dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {

        var obj = error.response.data;
        const j = obj[Object.keys(obj)[0]]
        throw j
    }
};
export const login = (email, password) => async (dispatch) => {
    dispatch({ type: "USER_SIGNIN_REQUEST", payload: { email, password } });
    try {
        const { data } = await axios.post(`/api/signin`, { email, password });
        dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
        localStorage.setItem('token', `${data.token}`);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        var obj = error.response.data;
        const j = error.response && error.response.data.message
            ? error.response.data.message
            : obj[Object.keys(obj)[0]]
        // console.log(j)
        throw j
    }

};

export const fetchUsers = (ext) => async (dispatch, getState) => {

    dispatch({ type: "FETCH_USERS_REQUEST" });
    try {
        const { data } = await axios.get(`/api/users/${ext}`);

        dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: "FETCH_USERS_FAIL", payload: message });
    }
};
export const detailsUser = (userId) => async (dispatch, getState) => {

    dispatch({ type: "USER_DETAILS_REQUEST", payload: userId });
    try {

        const { data } = await axios.get(`/api/user/${userId}`);
        // const data = {}

        dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
    } catch (error) {
        console.log(error)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: "USER_DETAILS_FAIL", payload: message });
    }
};

export const GmailLogin = (respo) => async (dispatch, getState) => {

    dispatch({ type: "USER_DETAILS_REQUEST" });
    try {
        const datar = respo.profileObj
        const { data } = await axios.post(`/api/usermail/${datar.email}`, datar);
        dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
        localStorage.setItem('token', `${data.token}`);
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: "USER_DETAILS_FAIL", payload: message });
    }
};
export const approvecc = (userId) => async (dispatch, getState) => {

    try {

        const { data } = await axios.put(`/api/user/${userId}/approve`);

        return data
    } catch (error) {
        throw error
    }
};

export const apply = () => async (dispatch, getState) => {
    try {
        await setAuthToken(axios)
        const { data } = await axios.put(`/api/content-creator-application`);
        dispatch({ type: "USER_SIGNIN_SUCCESS", payload: data });
        return

    } catch (error) {
        throw error
    }
};

export const signout = () => async (dispatch) => {
    try {
        await dispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');

    } catch (error) {
        alert(error)
    }

};

// export const updateUserProfile = (user) => async (dispatch, getState) => {
//     dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
//     const {
//         userSignin: { userInfo },
//     } = getState();
//     try {
//         const { data } = await Axios.put(`${base}api/user/profile`, user, {
//             headers: { Authorization: `Bearer ${userInfo.token}` },
//         });
//         dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
//         dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//         localStorage.setItem('userInfo', JSON.stringify(data));
//     } catch (error) {
//         const message =
//             error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message;
//         dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
//     }
// };