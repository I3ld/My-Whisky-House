const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get("/", (req, res, next) => {
    User.list()
    .then( ([userList, metadata]) => {
        res.render('users/userList', {
            userList: userList
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/showNewForm", (req, res, next) => {
    res.render('users/rejestracja', {
        pageTitle: "Nowy użytkownik",
        formAction: "add",
        user: {}
    });
});

router.get("/showLoginForm", (req, res, next) => {
    User.list()
    .then( ([userList, metadata]) => {
        var id = parseInt(req.query.user_id);
        const user = userList[id-1];
        res.render('auth/logowanie', {
            pageTitle: "Login",
            formAction: "login",
            user: user
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/add", (req, res, next) => {
    const plainPassword = req.body.psw;
    User.hashPassword(plainPassword)
        .then(hash1 => {
            const newUser = new User(req.body.email, req.body.first_name, req.body.last_name, req.body.picturePath, hash1);
            User.add(newUser);
            req.flash('authError','Witaj ' + req.body.first_name + ' ' +req.body.last_name + '. Konto zostało utworzone !');
            res.redirect("/products");
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports.route = router;