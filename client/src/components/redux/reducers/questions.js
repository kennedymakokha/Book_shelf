
const initialState = {
    question: {},
    errors: [],
    error: '',
    questions: [],
    adminquestions: [],
    adminpager: null,
    pager: null,
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {
        case 'POST_QUIZ':
            return {
                ...state,
                loading: true
            }
        case 'POST_QUIZ_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // questions: action.payload
            }
        case 'POST_QUIZ_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_QUIZS':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_QUIZS_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                questions: action.payload.results.results,
                adminquestions: action.payload.admin.results,
                pager: action.payload.results.pager,
                adminpager: action.payload.admin.pager
                
            }
        case 'FETCH_QUIZS_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_QUIZ':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_QUIZ_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                question: action.payload
            }
        case 'FETCH_QUIZ_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}