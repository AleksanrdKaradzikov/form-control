import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FieldArray, Field } from 'formik';

const Skills = ({ formik, skillIndex }) => {
  const { values, touched, errors } = formik;
  return (
    <FieldArray
      name="skills"
      render={arrayHelpers => {
        let skillId = skillIndex;
        return (
          <li className="form-control__list-item">
            <label htmlFor="skills" className="form-control__label">
              Навыки:
            </label>
            <div className="form-control__skills-box">
              {values.skills.map((skill, index) => {
                skillId += 1;
                return (
                  <div className="form-control__skill-box" key={`id_${skillId}`}>
                    <Field
                      name={`skills.${index}`}
                      id="skills"
                      className="form-control__input"
                      placeholder="Введите сюда свои навыки..."
                    />
                    {touched.skills && errors.skills ? (
                      <div className="form-control__skills-message">{errors.skills}</div>
                    ) : null}
                  </div>
                );
              })}
              <Button
                type="default"
                className="btn-add"
                htmlType="button"
                onClick={() => arrayHelpers.push('')}
              >
                Добавить навык
              </Button>
            </div>
          </li>
        );
      }}
    />
  );
};

export default Skills;

Skills.defaultProps = {
  formik: {},
  skillIndex: 1,
};

Skills.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
  skillIndex: PropTypes.number,
};
