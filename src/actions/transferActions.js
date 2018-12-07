import {CALL_API} from '../middleware/api'

export const INIT_TRANSFER_REQUEST = 'INIT_TRANSFER_REQUEST';
export const INIT_TRANSFER_SUCCESS = 'INIT_TRANSFER_SUCCESS';
export const INIT_TRANSFER_FAILURE = 'INIT_TRANSFER_FAILURE';

export const CONFIRM_TRANSFER_REQUEST = 'CONFIRM_TRANSFER_REQUEST';
export const CONFIRM_TRANSFER_SUCCESS = 'CONFIRM_TRANSFER_SUCCESS';
export const CONFIRM_TRANSFER_FAILURE = 'CONFIRM_TRANSFER_FAILURE';
export function initTransfer(accountId, body) {

    return {
        [CALL_API]: {
            endpoint: 'accounts/' + accountId + '/transfer',
            method: 'POST',
            body: body,
            types: [INIT_TRANSFER_SUCCESS, INIT_TRANSFER_FAILURE, INIT_TRANSFER_REQUEST]
        }
    }
}

export function confirmTransfer(id, accountId, body) {

    return {
        [CALL_API]: {
            endpoint: 'accounts/' + accountId + '/transfer/' + id,
            method: 'PUT',
            body: body,
            types: [CONFIRM_TRANSFER_SUCCESS, CONFIRM_TRANSFER_FAILURE, CONFIRM_TRANSFER_REQUEST]
        }
    }
}

