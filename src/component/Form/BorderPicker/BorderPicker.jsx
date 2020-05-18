import React from 'react';

import borders from './data';

import formStyle from '../Form.scss';

export default function BorderPicker(props) {
  return (
    <>
      <h2 className={formStyle.header}>Бортик</h2>
      {
        borders.map(elem => {
          return (
            <label key={elem.value}>
              <input
                type="radio"
                name="border"
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
