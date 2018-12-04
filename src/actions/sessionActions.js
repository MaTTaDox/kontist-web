import {push} from 'connected-react-router';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: user.token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function loginUser(creds, redirect ='/') {

    let config = {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.kontist.transactionlist.v2+json',
        }),
    };

    return dispatch => {

        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));

        return fetch('api/user/auth-token', config)
            .then(response => {
                   return  response.json().then(user => ({user, response}))
                }
            ).then(({ user, response }) =>  {
                if (!response.ok) {
                    dispatch(loginError(user.title));
                } else {

                    localStorage.setItem('token',user.token);
                    // Dispatch the success action
                    dispatch(receiveLogin(user));
                    if(!redirect)
                    {
                        redirect = '/';
                    }

                    dispatch({
                        type: 'REMOVE_ALL_ALERT',
                    });
                    
                    dispatch(push(redirect))
                }
            }).catch(err => {
                dispatch(loginError(err.message))
            });
    }
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('token');
        dispatch(receiveLogout());
        dispatch(push('/login'))
    }
}