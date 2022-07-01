
const initialState = {
    type: {},
    errors: [],
    error: '',
    types: [],
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_TYPES':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_TYPES_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                types: action.payload.data
            }
        case 'FETCH_TYPES_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'POST_TYPE':
            return {
                ...state,
                loading: true
            }
        case 'POST_TYPE_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // types: concat(action.payload)
            }
        case 'POST_TYPE_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}