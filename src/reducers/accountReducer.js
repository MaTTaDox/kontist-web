import {
    ACCOUNT_LIST_SUCCESS, ACCOUNT_LIST_REQUEST, ACCOUNT_LIST_FAILURE
} from '../actions/accountActions'

export function accountReducer(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case ACCOUNT_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ACCOUNT_LIST_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
            });
        case ACCOUNT_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                accounts: action.response
            });
        default:
            return state
    }
}

