
const initialState = {
    instituition: {},
    errors: [],
    error: '',
    instituitions: [],
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_INSTITUITIONS':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_INSTITUITIONS_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                instituitions: action.payload
            }
        case 'FETCH_INSTITUITIONS_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'POST_INSTITUITION':
            return {
                ...state,
                loading: true
            }
        case 'POST_INSTITUITION_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // types: concat(action.payload)
            }
        case 'POST_INSTITUITION_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}