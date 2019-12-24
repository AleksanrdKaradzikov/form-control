import React from 'react';
import { Formik, FieldArray, Field } from 'formik';
import { Button } from 'antd';
import ListItem from './list-item';
import SubmitBlock from './submit-block';
import SignupShema from '../helpers/validation-shema';

class Basic extends React.Component {
  skillIndex = 1;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      response: '',
    };
  }

  handleFocus = () => {
    this.setState({
      response: '',
    });
  };

  render() {
    const { loading, response } = this.state;
    const { handleFocus } = this;
    return (
      <Formik
        initialValues={{
          name: '',
          password: '',
          repeatPassword: '',
          email: '',
          website: '',
          age: '',
          skills: [''],
          acceptTerms: false,
        }}
        validationSchema={SignupShema}
        onSubmit={(values, formik) => {
          formik.setSubmitting(false);
          this.setState({
            loading: true,
          });
          const newValues = { ...values, skills: values.skills.filter(skill => skill !== '') };
          const data = JSON.stringify(newValues);
          setTimeout(async () => {
            const res = await fetch('http://localhost:8080/sign-up', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: data,
            });

            const result = await res.text();
            this.setState({
              loading: false,
              response: result,
            });
            if (result === 'Вы успешно зарегестрированы!') {
              formik.resetForm();
            } else {
              formik.setErrors();
            }
          }, 2000);
        }}
      >
        {formik => {
          const { values, handleSubmit, touched, errors } = formik;
          return (
            <form className="form-control" onSubmit={handleSubmit}>
              <ul className="form-control__list">
                <li className="form-control__list-item">
                  <h2 className="form-control__heading">Контактные данные</h2>
                  <span className="form-control__required_notification">
                    * Поля, обязательные для заполнения
                  </span>
                </li>
                <ListItem formik={formik} response={response} handleFocus={handleFocus} />
                <FieldArray
                  name="skills"
                  render={arrayHelpers => {
                    let skillId = this.skillIndex;
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
                                <Button
                                  type="default"
                                  className="btn-add"
                                  htmlType="button"
                                  onClick={() => arrayHelpers.insert(index, '')}
                                >
                                  +
                                </Button>
                                {touched.skills && errors.skills ? (
                                  <div className="form-control__skills-message">
                                    {errors.skills}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </li>
                    );
                  }}
                />
              </ul>
              <SubmitBlock formik={formik} loading={loading} response={response} />
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default Basic;
