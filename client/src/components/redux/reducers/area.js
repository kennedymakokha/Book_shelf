
const initialState = {
    area: {},
    errors: [],
    error: '',
    areas: [],
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_AREAS':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_AREAS_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                areas: action.payload
            }
        case 'FETCH_AREAS_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'POST_AREA':
            return {
                ...state,
                loading: true
            }
        case 'POST_AREA_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // types: concat(action.payload)
            }
        case 'POST_AREA_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}