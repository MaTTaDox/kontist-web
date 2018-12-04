import {CALL_API} from '../middleware/api'

export const LIST_TRANSACTIONS_REQUEST = 'LIST_TRANSACTIONS_REQUEST';
export const LIST_TRANSACTIONS_SUCCESS = 'LIST_TRANSACTIONS_SUCCESS';
export const LIST_TRANSACTIONS_FAILURE = 'LIST_TRANSACTIONS_FAILURE';


export function fetchTransactions(accountId) {

    return {
        [CALL_API]: {
            endpoint: 'accounts/' + accountId + '/transactions',
            method: 'GET',
            types: [LIST_TRANSACTIONS_SUCCESS, LIST_TRANSACTIONS_FAILURE, LIST_TRANSACTIONS_REQUEST]
        }
    }
}

