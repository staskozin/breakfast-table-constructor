import {
  CHANGE_QUANTITY,
  BLUR_QUANTITY,
  CHANGE_BORDER,
  CHANGE_COLOR,
  CHANGE_PICTURE,
  CHANGE_NO_PICTURE
} from './actions';

import initialState from './initialState';

import borders from '../component/Form/BorderPicker/data';
import colors from '../component/Form/ColorPicker/data';

function getPrice(border, color) {
  const borderPrice = borders.find(elem => elem.value === border).price;
  const colorPrice = colors.find(elem => elem.value === color).price;
  return borderPrice + colorPrice;
}

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
      const price = getPrice(action.payload, state.color);
      return {
        ...state,
        border: action.payload,
        price: price,
        total: price * state.quantity
      }
    }
    case CHANGE_COLOR: {
      const price = getPrice(state.border, action.payload);
      return {
        ...state,
        color: action.payload,
        price: price,
        total: price * state.quantity
      }
    }
    case CHANGE_PICTURE: {
      return {
        ...state,
        picture: action.payload
      }
    }
    case CHANGE_NO_PICTURE: {
      return {
        ...state,
        noPicture: {
          checked: action.payload === undefined ? !state.noPicture.checked : action.payload,
          disabled: false
        }
      }
    }
    default:
      return state;
  }
}
