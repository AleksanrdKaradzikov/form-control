const inputsData = {
  name: {
    label: 'Имя:',
    placeholder: 'Введите имя...',
    required: true,
    id: 'name',
    type: 'text',
  },
  password: {
    label: 'Пароль:',
    placeholder: 'Введите пароль...',
    required: true,
    id: 'password',
    type: 'password',
    format:
      'Формат пароля:"латинские буквы и цифры, от 8 до 40 символов, как минимум 1 цифра и 1 заглавная буква"',
  },
  repeatPassword: {
    label: 'Повторите:',
    placeholder: 'Введите пароль...',
    required: true,
    id: 'repeatPassword',
    type: 'password',
  },
  email: {
    label: 'Email:',
    placeholder: 'Введите email...',
    required: true,
    id: 'email',
    type: 'email',
    format: 'Формат "name@something.com"',
  },
  website: {
    label: 'Вебсайт:',
    placeholder: 'Введите адресс сайта...',
    required: false,
    id: 'website',
    type: 'url',
    format: 'Формат "http://someaddress.com"',
  },
  age: {
    label: 'Возраст:',
    placeholder: 'Введите свой возраст...',
    required: true,
    id: 'age',
    type: 'number',
  },
};

export default inputsData;
