import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import main from './main'

const reducer = combineReducers({main})

const store = createStore(reducer, applyMiddleware(createLogger))

export default store
export * from './main'
