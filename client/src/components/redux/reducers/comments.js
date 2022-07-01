
const initialState = {
    comment: {},
    errors: [],
    error: '',
    comments: [],
    pager: null,
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {
        case 'POST_COMMENT':
            return {
                ...state,
                loading: true
            }
        case 'POST_COMMENT_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // comments: action.payload
            }
        case 'POST_COMMENT_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_COMMENTS':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_COMMENTS_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                comments: action.payload,
                pager: action.payload.pager
            }
        case 'FETCH_COMMENTS_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_COMMENT':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_COMMENT_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                comment: action.payload
            }
        case 'FETCH_COMMENT_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}