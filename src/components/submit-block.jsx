import React from 'react';
import { Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';

const SubmitBlock = ({ formik, loading, response }) => {
  const acceptTermsError =
    formik.touched.acceptTerms && formik.errors.acceptTerms ? (
      <span className="form-control__accept-error">{formik.errors.acceptTerms}</span>
    ) : null;
  const successMessage =
    response === 'Вы успешно зарегестрированы!' ? (
      <div className="form-control__success">{response}</div>
    ) : null;
  return (
    <div className="form-control__submit-block">
      <Checkbox
        className="checked"
        name="acceptTerms"
        type="checkbox"
        id="acceptTerms"
        checked={formik.values.acceptTerms}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      >
        Согласие на обработку данных
      </Checkbox>
      {acceptTermsError}
      <div className="form-control__btn-block">
        <Button
          className="btn-submit"
          disabled={!formik.values.acceptTerms}
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
        >
          {loading ? 'Отправка...' : 'Отправить'}
        </Button>
        <Button
          className="btn-reset"
          size="large"
          type="danger"
          htmlType="reset"
          onClick={formik.handleReset}
          disabled={loading}
        >
          Сбосить
        </Button>
      </div>
      {successMessage}
    </div>
  );
};

export default SubmitBlock;

SubmitBlock.defaultProps = {
  formik: {},
  response: '',
  loading: false,
};

SubmitBlock.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
    handleReset: PropTypes.func,
  }),
  response: PropTypes.string,
  loading: PropTypes.bool,
};
