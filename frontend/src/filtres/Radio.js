
import * as React from 'react';
import { Field } from 'redux-form';

export const Radio = props => {
  if (props && props.input && props.options) {
    const renderRadioButtons = (key, index) => {
      return (
        <div>
          <Field
            id={`${props.input.name}-${index}`}
            component="input"
            name={props.input.name}
            type="radio"
            value={key}
            key={`${props.input.name}-${index}`}
          />
          <label key={`${index}`} htmlFor={`${props.input.name}-${index}`}>
          {props.options[key]} <span className="filtres___def">{props.labels[key]}</span>
        </label>
        </div>
      )
    };
    return (
      <div className="">
        <div className="">
          {props.label}
        </div>
        <div>
          {props.options &&
            Object.keys(props.options).map(renderRadioButtons)}
        </div>
      </div>
    );
  }
  return <div></div>
}

export default Radio;
