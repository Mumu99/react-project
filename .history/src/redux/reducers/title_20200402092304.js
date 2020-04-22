import { SAVE_TITLE } from '../action_types';
console.log(document.location);
export default (preState = '', action) => {
  const { type, data } = action
  switch (type) {
    case SAVE_TITLE:
      return data;
    default:
      return preState;
  }
}