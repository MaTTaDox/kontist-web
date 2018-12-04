import {CALL_API} from '../middleware/api'

export const ACCOUNT_LIST_REQUEST = 'ACCOUNT_LIST_REQUEST';
export const ACCOUNT_LIST_SUCCESS = 'ACCOUNT_LIST_SUCCESS';
export const ACCOUNT_LIST_FAILURE = 'ACCOUNT_LIST_FAILURE';


export function fetchAccounts() {

    return {
        [CALL_API]: {
            endpoint: 'accounts',
            method: 'GET',
            types: [ACCOUNT_LIST_SUCCESS, ACCOUNT_LIST_FAILURE, ACCOUNT_LIST_REQUEST]
        }
    }
}

