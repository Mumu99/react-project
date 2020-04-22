import { SAVE_CATEGORY } from '../action_types'

export const createSaveCategoryAction = (title) => ({ type: SAVE_CATEGORY, data: title })
