import { SAVE_CATEGORY } from '../action_types';
import { reqCategoryList } from '../../ajax'
import { message } from 'antd';

export const createSaveCategoryAction = (categoryList) => ({ type: SAVE_CATEGORY, data: categoryList.reverse() })

// 请求分类数据的异步的action
export const createSaveCategoryAsyncAction = () => {
  return async (dispatch) => {
    // 开启异步操作
    let result = await reqCategoryList();
    const { status, data, msg } = result
    if (status === 0) {
      dispatch(createSaveCategoryAction(data))
    } else {
      message.error(msg)
    }
  }
}