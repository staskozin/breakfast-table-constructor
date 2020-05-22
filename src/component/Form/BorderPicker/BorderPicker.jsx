import React from 'react';

import borders from './data';

import formStyle from '../Form.scss';
import style from './BorderPicker.scss';

export default function BorderPicker(props) {
  return (
    <>
      <h2 className={formStyle.header}>Бортик</h2>
      {
        borders.map(elem => {
          return (
            <label className={`${formStyle.label} ${formStyle.label_radio}`} key={elem.value}>
              <input
                className={formStyle.radio}
                type="radio"
                name="border"
                value={elem.value}
                checked={elem.value === props.selected}
                onChange={() => props.change(elem.value)}
              />
              <div className={`${formStyle.checkmark} ${style['checkmark_' + props.color + '-' + elem.value]}`} />
              {elem.name}
            </label>
          )
        })
      }
    </>
  )
}
