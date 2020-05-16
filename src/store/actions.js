export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const BLUR_QUANTITY = 'BLUR_QUANTITY';

export const changeQuantity = quantity => {
  return {
    type: CHANGE_QUANTITY,
    payload: quantity
  }
}

export const blurQuantity = quantity => {
  return {
    type: BLUR_QUANTITY,
    payload: quantity
  }
}
