import { SAVE_CATEGORY } from '../action_types';
import { reqCategoryList } from '../../ajax'

export const createSaveCategoryAction = (categoryList) => ({ type: SAVE_CATEGORY, data: categoryList })

export const createSaveCategoryAsyncAction = () => {
  return async (dispatch) => {
    // 开启异步操作
    let result = await reqCategoryList()
  }
}