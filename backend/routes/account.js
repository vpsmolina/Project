const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Incident = require('../models/Incident');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.post('/reg', (req, res) => {
  let newUser = new User({
    surname: req.body.surname,
    position: req.body.position,
    login: req.body.login,
    password: req.body.password,
    birthday: req.body.birthday,
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: "Пользователь не добавлен"});
    }
    else {
      res.json({success: true, msg: "Пользователь добавлен"});
    }
  });
});

router.post('/auth', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  User.getUserByLogin(login, (err, user) => {
    if(err) throw err;
    if(!user)
      return res.json({success: false, msg: "Такой пользователь был не найден"});

    User.comparePass(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 3600*24
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            login: user.login,
            surname: user.surname,
            position: user.position,
            birthday: user.birthday,
          },
          msg: "Зашли"
        });
      } else
        return res.json({success: false, msg: "Пароли не совпадают"});
    });
  })
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send('Кабинет пользователя');
});

router.get('/', (req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);

    } else {
      console.log('Data updated');
      res.json(data);
    }
  })
});

router.route('/:id').delete((req, res, next) => {
  User.findOneAndRemove({_id: req.params.id}, (error,data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

router.post('/', (req, res) => {
  let newUser = new User({
    surname: req.body.surname,
    position: req.body.position,
    login: req.body.login,
    password: req.body.password,
    birthday: req.body.birthday,
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: "Пользователь не добавлен"});
    }
    else {
      res.json({success: true, msg: "Пользователь добавлен"});
    }
  });
  router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
});

module.exports = router;


