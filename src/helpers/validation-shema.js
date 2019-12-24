import * as Yup from 'yup';

const SignupShema = Yup.object({
  name: Yup.string()
    .min(3, 'Имя не менее 3 символов')
    .max(50, 'Имя не более 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле')
    .matches(
      /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z]).*$/,
      'от 8 до 40 символов, 1 цифра и 1 заглавная буква'
    ),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Введите валидный email')
    .required('Обязательное поле'),
  age: Yup.number()
    .min(18, 'Минимальный возраст 18 лет')
    .max(65, 'Максимальный возраст 65 лет')
    .required('Обязательное поле'),
  website: Yup.string().url('Введите корректный url'),
  acceptTerms: Yup.boolean()
    .required('Обязательное поле')
    .oneOf([true], 'Я принимаю правила и условия'),
  skills: Yup.array().of(Yup.string().min(3, 'Не менее 3 символов')),
});

export default SignupShema;
