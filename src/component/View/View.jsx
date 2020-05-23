import React from 'react';
import { connect } from 'react-redux';

import style from './View.scss';

function View(props) {
  const border = props.border === 1 ? 1 : props.color + '-' + props.border;
  return (
    <div className={style.wrap} >
      <img className={style.table} src={`/img/tables/${props.color}-${props.border}.jpg`} alt="" />
      <img className={style.picture} src="/img/picture.png" alt="" />
      <img className={style.border} src={`/img/borders/${border}.png`} alt="" />
    </div>
  )
}

const putStateToProps = (state) => {
  return {
    border: state.border,
    color: state.color
  }
};

export default connect(putStateToProps)(View);
