const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      Yup = require('yup'),
      app = express(),
      jsonParser = bodyParser.json(),
      data = [
        {
          name: 'Test',
          password: 'test12TEST21',
          repeatPassword: 'test12TEST21',
          email: 'firsttestemail@gmail.com',
          website: 'http://localhost.ru',
          age: 22,
          skills: [],
        },
      ],
      SignupShema = Yup.object({
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

app.use(cors());

const setNewUser = function(req, res) {
  if (!req.body) {
    res.sendStatus(400, 'Данных нет');
    res.end();
    return;
  }
  SignupShema.isValid(req.body)
              .then(() => {
                const request = req.body;
                if (data.every((user) => user.email !== request.email)) {
                  const newUser = {};
                  for (const key in request) {
                    if (request.hasOwnProperty(key) && key !== 'acceptTerms') {
                      newUser[key] = request[key];
                    }
                  }
                  data.push(newUser);
                  res.send('Вы успешно зарегестрированы!');
                  res.status(200).end();
                } else {
                  res.send('Пользователь с таким email уже существует');
                  res.status(200).end();
                }
              })
              .catch(() => {
                 res.send('Введите валидные данные');
                 res.status(400).end();
              })
              
  
};

app.post('/sign-up', jsonParser, setNewUser);

app.listen(8080);
