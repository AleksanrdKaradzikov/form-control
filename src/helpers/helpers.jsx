const getInputClass = (touched, errors) => {
  const valuesInput = ['name', 'password', 'repeatPassword', 'email', 'website', 'age', 'skills'];
  const classNames = {
    name: '',
    password: '',
    repeatPassword: '',
    email: '',
    website: '',
    age: '',
    skills: '',
  };

  valuesInput.forEach(value => {
    if (touched[value] && errors[value]) {
      classNames[value] = 'form-control__input form-control__input--invalid';
    } else if (touched[value] && !errors[value]) {
      classNames[value] = 'form-control__input form-control__input--valid';
    } else {
      classNames[value] = 'form-control__input';
    }
  });

  return classNames;
};

export default getInputClass;
