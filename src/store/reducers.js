import {
  CHANGE_QUANTITY,
  BLUR_QUANTITY,
  CHANGE_BORDER,
  CHANGE_COLOR
} from './actions';

import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_QUANTITY: {
      let quantity;
      if (isNaN(Number(action.payload))) {
        quantity = null;
      }
      else if (action.payload > 9999)
        quantity = 9999;
      else
        quantity = action.payload;
      return {
        ...state,
        quantity: quantity,
        total: quantity < 1 ? state.price : state.price * quantity
      };
    }
    case BLUR_QUANTITY: {
      const quantity = action.payload < 1 ? 1 : action.payload;
      return {
        ...state,
        quantity: quantity,
        total: state.price * quantity
      };
    }
    case CHANGE_BORDER: {
      return {
        ...state,
        border: action.payload
      }
    }
    case CHANGE_COLOR: {
      return {
        ...state,
        color: action.payload
      }
    }
    default:
      return state;
  }
}
