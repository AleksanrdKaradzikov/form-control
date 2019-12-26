import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import inputsData from '../helpers/data';
import getInputClass from '../helpers/helpers';

const RenderInputs = ({ formik, response, handleFocus }) => {
  const { touched, errors } = formik;
  const classNames = getInputClass(touched, errors);
  return Object.keys(inputsData).map(key => {
    const authErrMsg =
      key === 'email' && response === 'Пользователь с таким email уже существует' ? (
        <div className="form-control__error-message">{response}</div>
      ) : null;
    return (
      <li className="form-control__list-item" key={`id_${key}`}>
        <div className="form-control__list-box">
          <label htmlFor={key} className="form-control__label">
            {inputsData[key].label}
          </label>
          <Field
            className={classNames[key]}
            id={inputsData[key].id}
            placeholder={inputsData[key].placeholder}
            type={inputsData[key].type}
            required={inputsData[key].required}
            name={key}
            onFocus={handleFocus}
          />
          {inputsData[key].format ? (
            <span className="form-control__hint">{inputsData[key].format}</span>
          ) : null}
          {touched[key] && errors[key] ? (
            <div className="form-control__error-message">{errors[key]}</div>
          ) : null}
          {authErrMsg}
        </div>
      </li>
    );
  });
};

export default RenderInputs;

RenderInputs.defaultProps = {
  formik: {},
  response: null,
  handleFocus: () => {},
};

RenderInputs.propTypes = {
  formik: PropTypes.shape({
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
  response: PropTypes.string,
  handleFocus: PropTypes.func,
};
