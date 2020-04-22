import { combineReducers } from 'redux';
import loginReducer from './login';
import saveTitle from './title'

export default combineReducers({
  userInfo: loginReducer,
  title: saveTitle
})