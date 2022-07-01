
const initialState = {
    level: {},
    errors: [],
    error: '',
    levels: [],
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_LEVELS':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_LEVELS_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                levels: action.payload
            }
        case 'FETCH_LEVELS_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'POST_LEVEL':
            return {
                ...state,
                loading: true
            }
        case 'POST_LEVEL_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // types: concat(action.payload)
            }
        case 'POST_LEVEL_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}