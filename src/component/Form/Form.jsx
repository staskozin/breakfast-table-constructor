import React from 'react';
import { connect } from 'react-redux';

import {
  changeBorder,
  changeColor,
  changePicture,
  changeNoPicture
} from '../../store/actions';

import BorderPicker from './BorderPicker/BorderPicker';
import ColorPicker from './ColorPicker/ColorPicker';
import PicturePicker from './PicturePicker/PicturePicker';

function Form(props) {
  return (
    <>
      <div className="col-sm-2">
        <PicturePicker
          picture={props.picture}
          changePicture={props.changePicture}
          noPicture={props.noPicture}
          changeNoPicture={props.changeNoPicture}
        />
      </div>
      <div className="col-sm-2">
        <BorderPicker selected={props.border} change={props.changeBorder} color={props.color} />
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
    color: state.color,
    picture: state.picture,
    noPicture: state.noPicture
  }
};

const putActionsToProps = {
  changeBorder,
  changeColor,
  changePicture,
  changeNoPicture
};

export default connect(putStateToProps, putActionsToProps)(Form);
