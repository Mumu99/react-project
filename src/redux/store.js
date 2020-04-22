/*
  核心文件
*/
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))