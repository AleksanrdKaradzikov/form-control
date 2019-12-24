import React from 'react';
import PropTypes from 'prop-types';
import { getInputClass, getInputType } from '../helpers/helpers';

const ListItem = ({ formik, response, handleFocus }) => {
  const { values, handleChange, handleBlur, touched, errors } = formik;

  const labels = {
    name: ['Имя:', 'Введите имя...'],
    password: ['Пароль:', 'Введите пароль...'],
    repeatPassword: ['Повторите:', 'Повторите пароль...'],
    email: ['Email:', 'Введите email...'],
    website: ['Вебсайт:', 'Введите адресс сайта...'],
    age: ['Возраст:', 'Введите ваш возраст...'],
  };

  const format = {
    password: 'Формат пароля:"resPonses12"',
    email: 'Формат "name@something.com"',
    website: 'Формат "http://someaddress.com"',
  };

  const classNames = getInputClass(touched, errors, values);

  return Object.keys(values).map(value => {
    if (value !== 'skills' && value !== 'acceptTerms') {
      const authErrMsg =
        value === 'email' && response === 'Пользователь с таким email уже существует' ? (
          <div className="form-control__error-message">{response}</div>
        ) : null;
      return (
        <li className="form-control__list-item" key={`id_${value.length}`}>
          <div className="form-control__list-box">
            <label htmlFor={value} className="form-control__label">
              {labels[value][0]}
            </label>
            <input
              className={classNames[value]}
              id={value}
              placeholder={labels[value][1]}
              type={getInputType(value)}
              required={
                !!(
                  value === 'name' ||
                  value === 'password' ||
                  value === 'repeatPassword' ||
                  value === 'email' ||
                  value === 'age'
                )
              }
              value={values[value]}
              onChange={handleChange}
              name={value}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            {format[value] ? <span className="form-control__hint">{format[value]}</span> : null}
            {touched[value] && errors[value] ? (
              <div className="form-control__error-message">{errors[value]}</div>
            ) : null}
            {authErrMsg}
          </div>
        </li>
      );
    }
    return false;
  });
};

export default ListItem;

ListItem.defaultProps = {
  formik: {},
  response: null,
  handleFocus: () => {},
};

ListItem.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
  response: PropTypes.string,
  handleFocus: PropTypes.func,
};
