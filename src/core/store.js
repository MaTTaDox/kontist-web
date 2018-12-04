import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer from './reducers'
import history from './history'
import {api} from '../middleware/api'

const store = createStore(
    createRootReducer(history),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware,
            api
        )
    )
);

export default store;
