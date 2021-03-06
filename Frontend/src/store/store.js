import rootReducer from './reducers/rootReducer'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware} from 'redux'

const loggerMiddleware = createLogger()

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))