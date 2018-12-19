import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'
import { init as websocketInit, emit } from './websocketsInit'

const middleware = [thunkMiddleware.withExtraArgument({ emit })]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(reducers, enhancer)
websocketInit(store)
export default store
