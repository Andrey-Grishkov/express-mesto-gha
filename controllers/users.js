const User = require('../models/user')

getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.send({ data: user })
    }
    )
    .catch(() => res.status(500).send({ message: 'Ошибка 500: Что-то пошло не так' }));
};


module.exports = {
  getUsers
}

// const getUsers = (req, res) => {
//   User.find({})
//     .then((user) => res.send({ data: user }))
//     .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
// };
//
// const createUser = (req, res) => {
//   const { name, about, avatar } = req.body;
//
//   User.create({ name, about, avatar })
//     .then((user
//     ) => res.send({ data: user }))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res
//           .status(400)
//           .send({ message: 'Некорректные данные' });
//       }
//       return res.status(500).send({ message: 'Что-то пошло не так' });
//     });
// };
//

