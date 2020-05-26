import React, { useState } from 'react';

import formStyle from '../Form.scss';
import style from './PicturePicker.scss';

import Popup from './Popup/Popup';

export default function PicturePicker(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <h2 className={formStyle.header}>Рисунок</h2>
      <label className={style.label}>
        <input
          type="checkbox"
          checked={props.noPicture.checked}
          disabled={props.noPicture.disabled}
          onChange={() => props.changeNoPicture()}
        />
        <span>Без рисунка</span>
      </label>
      <button className={style.button} onClick={() => setIsPopupOpen(!isPopupOpen)}>Выбрать рисунок</button>
      {isPopupOpen ? <Popup setIsPopupOpen={() => setIsPopupOpen(false)} changePicture={props.changePicture} changeNoPicture={props.changeNoPicture} /> : null}
    </>
  )
}
