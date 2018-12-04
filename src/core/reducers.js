import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {transactionReducer} from "../reducers/transactionReducer";
import authReducer from "../reducers/authReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    transactions: transactionReducer,
    auth: authReducer,

})