import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {transactionReducer} from "../reducers/transactionReducer";
import authReducer from "../reducers/authReducer";
import {userReducer} from "../reducers/userReducer";
import {accountReducer} from "../reducers/accountReducer";

export default (history) => combineReducers({
    accounts: accountReducer,
    router: connectRouter(history),
    transactions: transactionReducer,
    user: userReducer,
    auth: authReducer,

})