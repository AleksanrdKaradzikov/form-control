import React from 'react';
import { Formik } from 'formik';
import Skills from './skills';
import RenderInputs from './render-inputs';
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

  getFetch(data, formik) {
    setTimeout(async () => {
      try {
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
        formik.setSubmitting(false);
        if (result === 'Вы успешно зарегестрированы!') {
          formik.resetForm();
        }
      } catch {
        this.setState({
          loading: false,
          response: 'Обнаружены неполадки, сообщение не отправленно',
        });
        formik.setSubmitting(false);
      }
    }, 2000);
  }

  handleReset = reset => {
    reset();
    this.setState({
      loading: false,
      response: '',
    });
  };

  handleFocus = () => {
    this.setState({
      response: '',
    });
  };

  handleSubmit = (values, formik) => {
    formik.setSubmitting(true);
    this.setState({
      loading: true,
    });
    const newValues = { ...values, skills: values.skills.filter(skill => skill !== '') };
    const data = JSON.stringify(newValues);
    this.getFetch(data, formik);
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
        onSubmit={this.handleSubmit}
      >
        {formik => {
          const { handleSubmit } = formik;
          return (
            <form className="form-control" onSubmit={handleSubmit}>
              <ul className="form-control__list">
                <li className="form-control__list-item">
                  <h2 className="form-control__heading">Контактные данные</h2>
                  <span className="form-control__required_notification">
                    * Поля, обязательные для заполнения
                  </span>
                </li>
                <RenderInputs formik={formik} response={response} handleFocus={handleFocus} />
                <Skills formik={formik} skillIndex={this.skillIndex} />
              </ul>
              <SubmitBlock
                formik={formik}
                loading={loading}
                response={response}
                handleReset={this.handleReset}
              />
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default Basic;
