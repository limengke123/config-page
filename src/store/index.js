import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from '../reducers'


const loggerMiddleware = createLogger()

const middlewares = [
    thunkMiddleware,
    loggerMiddleware
]


export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))
