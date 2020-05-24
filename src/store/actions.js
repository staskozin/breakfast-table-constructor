export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const BLUR_QUANTITY = 'BLUR_QUANTITY';
export const CHANGE_BORDER = 'CHANGE_BORDER';
export const CHANGE_COLOR = 'CHANGE_COLOR';
export const CHANGE_PICTURE = 'CHANGE_PICTURE';
export const CHANGE_NO_PICTURE = 'CHANGE_NO_PICTURE';

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

export const changeBorder = border => {
  return {
    type: CHANGE_BORDER,
    payload: border
  }
}

export const changeColor = color => {
  return {
    type: CHANGE_COLOR,
    payload: color
  }
}

export const changePicture = picture => {
  return {
    type: CHANGE_PICTURE,
    payload: picture
  }
}

export const changeNoPicture = checked => {
  return {
    type: CHANGE_NO_PICTURE,
    payload: checked
  }
}
