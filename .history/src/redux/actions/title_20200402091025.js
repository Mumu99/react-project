import { SAVE_USER_INFO, DELETE_USER_INFO } from '../action_types'

export const createSaveUserAction = userObj => {
  // 将数据存入到浏览器的localStorage中存入用户信息, 包含 user:{}, token:''
  const { user, token } = userObj
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  return { type: SAVE_USER_INFO, data: userObj }
}

export const createDeleteUserAction = () => {
  localStorage.clear()
  return { type: DELETE_USER_INFO }
}
