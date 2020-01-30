const express = require('express');
const router = express.Router();

const User = require('../model/user');
const authCheck = require('../middleware/authCheck');

router.get("/", authCheck, (req, res, next) => {
    User.list()
        .then(([userList, metadata]) => {
            res.render('users/userList', {
                userList: userList,
                formAction: "listUsers"
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
    res.render('auth/logowanie', {
        pageTitle: "Login",
        formAction: "login",
    });
});

router.get("/showUserPanel", authCheck, (req, res, next) => {
    if (typeof req.session.loggedUser == 'undefined' || req.session.loggedUser.id == null) {
        req.flash('authError', 'Brak dostępu do panelu użytkownika!');
        res.redirect("/products");
    } else {
        var userId = req.session.loggedUser.id;
        User.details(userId)
        .then(([user, metadata]) => {
            res.render('users/userPanel', {
                pageTitle: "Show user panel",
                formAction: "edit",
                user: user[0]
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
});

router.post("/add", (req, res, next) => {
    const plainPassword = req.body.psw;
    User.hashPassword(plainPassword)
        .then(hash1 => {
            const newUser = new User(req.body.email, req.body.first_name, req.body.last_name, req.body.picturePath, hash1, req.session.loggedUser.id);
            User.add(newUser);
            req.flash('authError', 'Witaj ' + req.body.first_name + ' ' + req.body.last_name + '. Konto zostało utworzone !');
            res.redirect("/products");
        })
        .catch(err => {
            console.log(err);
        });
});

router.post("/edit",  authCheck, (req, res, next) => {
    const plainPassword = req.body.psw;
    User.hashPassword(plainPassword)
        .then(hash1 => {
            const editUser = new User(req.body.email, req.body.first_name, req.body.last_name, req.body.picturePath, hash1);
            User.edit(editUser);
            res.redirect("/showUserPanel");
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/delete", authCheck, (req, res, next) => {
    var id = parseInt(req.session.loggedUser.id);
    User.delete(id).then(() => {
            req.session.isUserLoggedIn = false;
            res.redirect("/products");
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports.route = router;