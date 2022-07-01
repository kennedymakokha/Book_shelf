const initialState = {
    userInfo: {},
    user: {}
};

export const userSigninReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_SIGNIN_REQUEST":
            return { loading: true };
        case "USER_SIGNIN_SUCCESS":
            return { loading: false, userInfo: action.payload };
        case "USER_SIGNIN_FAIL":
            return { loading: false, error: action.payload };
        case "USER_SIGNOUT":
            return { userInfo: null, user: null };
        default:
            return state;
    }
};
export const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_REGISTER_REQUEST":
            return { loading: true };
        case "USER_REGISTER_SUCCESS":
            return { loading: false, userInfo: action.payload };
        case "USER_REGISTER_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const userDetailsReducer = (state = { loading: true, }, action) => {
    
    switch (action.type) {
        case "USER_DETAILS_REQUEST":
            return { loading: true };
        case "USER_DETAILS_SUCCESS":
            return { loading: false, user: action.payload };
        case "USER_DETAILS_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const usersReducer = (state = { loading: true, }, action) => {
    
    switch (action.type) {
        case "FETCH_USERS_REQUEST":
            return { loading: true };
        case "FETCH_USERS_SUCCESS":
            return { loading: false, users: action.payload };
        case "FETCH_USERS_FAIL":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
// export const userUpdateProfileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case USER_UPDATE_PROFILE_REQUEST:
//             return { loading: true };
//         case USER_UPDATE_PROFILE_SUCCESS:
//             return { loading: false, success: true };
//         case USER_UPDATE_PROFILE_FAIL:
//             return { loading: false, error: action.payload };
//         case USER_UPDATE_PROFILE_RESET:
//             return {};
//         default:
//             return state;
//     }
// };