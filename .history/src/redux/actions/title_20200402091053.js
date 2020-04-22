import { SAVE_TITLE } from '../action_types'

export const createDeleteUserAction = () => {
  localStorage.clear()
  return { type: DELETE_USER_INFO }
}
