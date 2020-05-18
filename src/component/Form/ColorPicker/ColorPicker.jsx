import React from 'react';

import colors from './data';

import formStyle from '../Form.scss';

export default function ColorPicker(props) {
  return (
    <>
      <h2 className={formStyle.header}>Цвет</h2>
      {
        colors.map(elem => {
          return (
            <label key={elem.value}>
              <input
                type="radio"
                name="color"
                value={elem.value}
                checked={elem.value === props.selected}
                onChange={() => props.change(elem.value)}
              />
              {elem.name}
            </label>
          )
        })
      }
    </>
  )
}
