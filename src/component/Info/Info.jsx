import React from 'react';
import { connect } from 'react-redux';

import { changeQuantity, blurQuantity } from '../../store/actions';

import s from './Info.scss';

function Info(props) {
  const price = props.quantity == 1 || props.quantity === '' || props.quantity == 0
    ? '' : <span className={s.price}>{formatPrice(props.price)}/шт.</span>;
  return (
    <ul className={s.info}>
      <li className={s.info__item}>
        <button
          className={s.button}
          onClick={() => cart.add(532, props.quantity, convertStateToRequestData(props))}
        >В корзину</button>
      </li>

      <li className={`${s.info__item} ${s.info__item_quantity}`}>
        <input
          className={s.quantity}
          type="number"
          min="1"
          max="9999"
          onChange={(e) => props.changeQuantity(e.target.value)}
          onBlur={(e) => props.blurQuantity(e.target.value)}
          value={props.quantity}
        />&nbsp;шт.
        </li>

      <li className={`${s.info__item} ${s.info__item_price}`}>{formatPrice(props.total)} {price}</li>
    </ul>
  )
}

function formatPrice(price) {
  var res = "";
  if (String(price).length < 5)
    res = String(price);
  else
    for (var i = String(price).length - 1, j = 0; i >= 0; i--, j++) {
      if (j % 3 === 0 && j !== 0) {
        res = ' ' + res;
      }
      res = String(price).charAt(i) + res;
    }
  return res + ' ₽';
}

function convertStateToRequestData(state) {
  const { border, color, picture, noPicture } = state;
  let data = {};
  data['option[1]'] = border;
  data['option[2]'] = color;
  data['option[3][]'] = 9;
  data['option[4]'] = picture ? picture : '-'
  data['option[5]'] = '-';
  if (noPicture.checked)
  data['option[11][]'] = 25;
  return data;
}

const putStateToProps = state => {
  return {
    price: state.price,
    quantity: state.quantity,
    total: state.total,
    border: state.border,
    color: state.color,
    picture: state.picture,
    noPicture: state.noPicture
  }
};

const putActionsToProps = {
  changeQuantity,
  blurQuantity
}

export default connect(putStateToProps, putActionsToProps)(Info);
