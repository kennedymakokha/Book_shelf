
const initialState = {
    conversation: {},
    errors: [],
    error: '',
    conversations: [],
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {

        case 'GET_AUTH_USER_CONVERSATION':
            return {
                ...state,
                loading: true
            }
        case 'GET_AUTH_USER_CONVERSATION_SUCCESSFUL':
            return {
                ...state,
                loading: true,
                conversations: action.payload
            }
            case 'GET_AUTH_USER_CONVERSATION_FAIL':
                return {
                    ...state,
                    loading: true,
                    error: action.payload
                }

        default:
            return state;
    }
}