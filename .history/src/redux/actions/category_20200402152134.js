import { SAVE_CATEGORY } from '../action_types'

export const createSaveCategoryAction = (categoryList) => ({ type: SAVE_CATEGORY, data: categoryList })

export const createSaveCategoryAsyncAction = () => {
  return (dispatch) => {
    // 开启异步操作
  }
}