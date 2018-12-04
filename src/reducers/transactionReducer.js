import {
    LIST_TRANSACTIONS_SUCCESS, LIST_TRANSACTIONS_FAILURE, LIST_TRANSACTIONS_REQUEST
} from '../actions/transactionAction'

export function transactionReducer(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case LIST_TRANSACTIONS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case LIST_TRANSACTIONS_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
            });
        case LIST_TRANSACTIONS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                transactions: action.response
            });
        default:
            return state
    }
}

