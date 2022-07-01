
const initialState = {
    subscription: {},
    subscriber: {},
    errors: [],
    error: '',
    subscriptions: [],
    loading: false
}

export default function store(state = initialState, action) {
    switch (action.type) {

        case 'CHECK_SUBSCRIBER':
            return {
                ...state,
                loading: true
            }
        case 'CHECK_SUBSCRIBER_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                subscriber: action.payload
            }
        case 'CHECK_SUBSCRIBER_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'SUBSCRIBE':
            return {
                ...state,
                loading: true
            }
        case 'SUBSCRIBE_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                // subscriptions: action.payload
            }
        case 'SUBSCRIBE_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'UNSUBSCRIBE':
            return {
                ...state,
                loading: true
            }
        case 'UNSUBSCRIBE_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                subscriptions: action.payload
            }
        case 'UNSUBSCRIBE_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        case 'FETCH_SUBSCRIPTION':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_SUBSCRIPTION_SUCCESSFUL':
            return {
                ...state,
                loading: false,
                subscription: action.payload
            }
        case 'FETCH_SUBSCRIPTION_FAIL':
            return {
                ...state,
                loading: true,
                error: action.payload
            }

        default:
            return state;
    }
}