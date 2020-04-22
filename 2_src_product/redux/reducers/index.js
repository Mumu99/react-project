import { combineReducers } from 'redux';
import loginReducer from './login';
import saveTitle from './title'
import saveCategory from './category'

export default combineReducers({
  userInfo: loginReducer,
  title: saveTitle,
  category: saveCategory
})