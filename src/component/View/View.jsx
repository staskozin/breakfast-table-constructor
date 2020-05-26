import React from 'react';
import { connect } from 'react-redux';

import style from './View.scss';

function View(props) {
  const border = props.border === 1 ? 1 : props.color + '-' + props.border;
  return (
    <div className={style.wrap} >
      <img className={style.table} src={`/_constructor/img/tables/${props.color}-${props.border}.jpg`} alt="" />
      {
        !props.noPicture.checked ?
          <>
            <img
              className={style.picture}
              src={props.picture}
              alt=""
            />
            <img className={style.border} src={`/_constructor/img/borders/${border}.png`} alt="" />
          </>
          : null
      }
    </div>
  )
}

const putStateToProps = (state) => {
  return {
    border: state.border,
    color: state.color,
    picture: state.picture,
    noPicture: state.noPicture
  }
};

export default connect(putStateToProps)(View);
