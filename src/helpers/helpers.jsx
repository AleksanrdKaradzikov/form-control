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

const getInputType = value => {
  let type = '';
  switch (value) {
    case 'name': {
      type = 'text';
      return type;
    }
    case 'password': {
      type = 'password';
      return type;
    }
    case 'repeatPassword': {
      type = 'password';
      return type;
    }
    case 'email': {
      type = 'email';
      return type;
    }
    case 'website': {
      type = 'url';
      return type;
    }
    case 'age': {
      type = 'number';
      return type;
    }
    default: {
      return type;
    }
  }
};

export { getInputClass, getInputType };
