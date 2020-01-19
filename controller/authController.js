const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get('/showLogin', (req, res, next) => {
  res.render('auth/logowanie', {pageTitle: 'Logowanie'});
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

      User.findByEmail(email)
      .then( ([data, metadata]) => {
        var rows = JSON.parse(JSON.stringify(data[0]));
        if(rows.IdUser) {
          var result = User.comparePassword(password,rows.IdUser);
              if(result) {
                req.session.isUserLoggedIn = true;
                req.session.loggedUser = new User(rows.Email, rows.FirstName, rows.LastName, rows.Picture, rows.Password, rows.IdUser);
                res.redirect('/products');
              } else {
                invalidEmailOrPassword(req, res);
              }
        } else {
          invalidEmailOrPassword(req, res);
        }
      })
      .catch(err => {
        console.log(err);
      });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/products');
});

function invalidEmailOrPassword(req, res) {
  req.flash('loginError', 'Nieprawidłowy email lub hasło !');
  res.redirect('/auth/showLogin');
}

module.exports.route = router;