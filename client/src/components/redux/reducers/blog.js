
const initialState = {
    blog: {},
    errors: [],
    error: '',
    blogs: [],
    adminblogs: [],
    adminpager: null,
    pager: null,
    loading: true
}

export default function store(state = initialState, action) {
    switch (action.type) {
        case 'POST_BLOG':
            return {
                ...state,
                loading: true
            }
        case 'POST_BLOG_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // blogs: action.payload
            }
        case 'POST_BLOG_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_BLOGS':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_BLOGS_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                blogs: action.payload.results.results,
                adminblogs: action.payload.admin.results,
                pager: action.payload.results.pager,
                adminpager: action.payload.admin.pager
                
            }
        case 'FETCH_BLOGS_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_BLOG':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_BLOG_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                blog: action.payload
            }
        case 'FETCH_BLOG_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}