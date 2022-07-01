
const initialState = {
    message: {},
    errors: [],
    error: '',
    messages: [],
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_CONVERSATION_MESSAGES':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_CONVERSATION_MESSAGES_SUCCESSFUL':
            return {
                ...state,
                loading: true,
                messages: action.payload
            }
            case 'FETCH_CONVERSATION_MESSAGES_FAIL':
                return {
                    ...state,
                    loading: true,
                    error: action.payload
                }

        default:
            return state;
    }
}