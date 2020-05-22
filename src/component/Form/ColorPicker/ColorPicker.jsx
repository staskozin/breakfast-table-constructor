import React from 'react';

import colors from './data';

import formStyle from '../Form.scss';
import style from './ColorPicker.scss';

export default function ColorPicker(props) {
  return (
    <>
      <h2 className={formStyle.header}>Цвет</h2>
      {
        colors.map(elem => {
          return (
            <label className={`${formStyle.label} ${formStyle.label_radio}`} key={elem.value}>
              <input
                className={formStyle.radio}
                type="radio"
                name="color"
                value={elem.value}
                checked={elem.value === props.selected}
                onChange={() => props.change(elem.value)}
              />
              <div className={`${formStyle.checkmark} ${style['checkmark_' + elem.value]} ${style.checkmark}`} />
              {elem.name}
            </label>
          )
        })
      }
    </>
  )
}
