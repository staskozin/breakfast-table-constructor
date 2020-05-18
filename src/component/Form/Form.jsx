import React from 'react';
import { connect } from 'react-redux';

import {
  changeBorder,
  changeColor
} from '../../store/actions';

import BorderPicker from './BorderPicker/BorderPicker';
import ColorPicker from './ColorPicker/ColorPicker';
import PicturePicker from './PicturePicker/PicturePicker';

function Form(props) {
  return (
    <>
      <div className="col-sm-2">
        <PicturePicker />
      </div>
      <div className="col-sm-2">
        <BorderPicker selected={props.border} change={props.changeBorder} />
      </div>
      <div className="col-sm-2">
        <ColorPicker selected={props.color} change={props.changeColor} />
      </div>
    </>
  )
}

const putStateToProps = (state) => {
  return {
    border: state.border,
    color: state.color
  }
};

const putActionsToProps = {
  changeBorder,
  changeColor
};

export default connect(putStateToProps, putActionsToProps)(Form);
