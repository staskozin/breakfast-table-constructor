import React, { useState } from 'react';

import formStyle from '../Form.scss';

import Popup from './Popup/Popup';

export default function PicturePicker(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <h2 className={formStyle.header}>Рисунок</h2>
      <label>
        <input
          type="checkbox"
          checked={props.noPicture.checked}
          disabled={props.noPicture.disabled}
          onChange={() => props.changeNoPicture()}
        />
      Без рисунка
      </label>
      <button onClick={() => setIsPopupOpen(!isPopupOpen)}>Выбрать рисунок</button>
      {isPopupOpen ? <Popup setIsPopupOpen={() => setIsPopupOpen(false)} changePicture={props.changePicture} changeNoPicture={props.changeNoPicture} /> : null}
    </>
  )
}
