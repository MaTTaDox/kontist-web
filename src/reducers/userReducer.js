import {
    USER_SUCCESS, USER_REQUEST, USER_FAILURE
} from '../actions/userActions'

export function userReducer(state = {
    isFetching: false,
}, action) {
    switch (action.type) {
        case USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
            });
        case USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                user: action.response
            });
        default:
            return state
    }
}

