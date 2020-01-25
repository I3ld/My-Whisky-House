const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const passwordPlain = req.body.password;

      User.findByEmail(email)
      .then( ([data, metadata]) => {
        if(typeof data[0] !== 'undefined' && data[0].Email !== null) {
          var rows = JSON.parse(JSON.stringify(data[0]));
        
          User.comparePassword(passwordPlain,rows.Password).then( (result) => {
            if(result) {
              req.session.isUserLoggedIn = true;
              req.session.loggedUser = new User(rows.Email, rows.FirstName, rows.LastName, rows.Picture, rows.Password, rows.IdUser);
              res.redirect('/products');
            } else {
              invalidEmailOrPassword(req, res);
            }
          }).catch(err => {
            console.log(err);
          });
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
  res.redirect('/users/showLoginForm');
}

module.exports.route = router;