
const initialState = {
    note: {},
    errors: [],
    error: '',
    notes: [],
    adminNotes: [],
    adminpager: null,
    pager: null,
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {
        case 'DELETE_NOTE':
            return {
                ...state,
                loading: true
            }
        case 'DELETE_NOTE_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // notes: action.payload
            }
        case 'DELETE_NOTE_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'PUBLISH_NOTE':
            return {
                ...state,
                loading: true
            }
        case 'PUBLISH_NOTE_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // notes: action.payload
            }
        case 'PUBLISH_NOTE_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'POST_NOTE':
            return {
                ...state,
                loading: true
            }
        case 'POST_NOTE_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // notes: action.payload
            }
        case 'POST_NOTE_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_NOTES':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_NOTES_SUCCESSFUL':
            return {
                ...state,
                loading: false,

                notes: action.payload.results.results,
                adminNotes: action.payload.admin.results,
                pager: action.payload.results.pager,
                adminpager: action.payload.admin.pager
            }
        case 'FETCH_NOTES_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_NOTE':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_NOTE_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                note: action.payload
            }
        case 'FETCH_NOTE_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}