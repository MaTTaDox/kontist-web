import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {transactionReducer} from "../reducers/transactionReducer";
import authReducer from "../reducers/authReducer";
import {userReducer} from "../reducers/userReducer";
import {accountReducer} from "../reducers/accountReducer";
import {confirmTransferReducer, initTransferReducer} from '../reducers/transferReducer'

export default (history) => combineReducers({
    accounts: accountReducer,
    router: connectRouter(history),
    transactions: transactionReducer,
    user: userReducer,
    auth: authReducer,
    initTransfer: initTransferReducer,
    confirmTransfer: confirmTransferReducer
})