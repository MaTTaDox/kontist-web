import {
    INIT_TRANSFER_FAILURE, INIT_TRANSFER_REQUEST, INIT_TRANSFER_SUCCESS,
    CONFIRM_TRANSFER_FAILURE, CONFIRM_TRANSFER_REQUEST, CONFIRM_TRANSFER_SUCCESS
} from '../actions/transferActions'

export function initTransferReducer(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case INIT_TRANSFER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                success: null
            });
        case INIT_TRANSFER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
                success: false
            });
        case INIT_TRANSFER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                transfer: action.response,
                success: true
            });
        default:
            return state
    }
}

export function confirmTransferReducer(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case CONFIRM_TRANSFER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                success: null
            });
        case CONFIRM_TRANSFER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
                success: false
            });
        case CONFIRM_TRANSFER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                transfer: action.response,
                success: true
            });
        default:
            return state
    }
}
