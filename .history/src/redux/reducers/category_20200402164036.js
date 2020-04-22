import { SAVE_CATEGORY } from '../action_types';
export default (preState = [], action) => {
  const { type, data } = action
  switch (type) {
    case SAVE_CATEGORY:
      return [...data].reverse();
    default:
      return preState;
  }
}