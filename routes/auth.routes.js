const express = require("express");
const router = express.Router();

const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

router.get("/signup", function (req, res, next) {

    res.render("auth", {})
})

router.post("/signup", function (req, res, next) {

    const {
        username,
        password
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, salt)
    console.log(`Password hash: ${hashedPassword}`);

    User.create({
        username: username,
        passwordH: hashedPassword
    })
        .then(function (userFromDb) {
            res.redirect('/')
        })
        .catch(err => next(err))


})

router.get('/login', function (req, res, next) {
    res.render('login')
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username: username })
        .then(function (userFromDb) {
            if (!userFromDb) {
                res.render('login', {
                    errorMessage: 'utilisateur non trouvé'
                })
                return;
            } else {
                if (bcrypt.compareSync(password, userFromDb.passwordH)) {
                    req.session.currentUser = userFromDb;
                    res.redirect('/userProfile')
                    return;
                } else {
                    res.render('login', {
                        errorMessage: 'Mauvais MDP'
                    })
                    return;

                }
            }
        })
        .catch(err => next(err));

    console.log('SESSIION ======>', req.session);
})

router.get("/userProfile", (req, res, next) => {
    res.render('users/userProfile', { userFromDb: req.session.currentUser })
})

router.get('/private', (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/')
    } else {
        res.render('private', { dataProfile: req.session.currentUser })
    }
})

module.exports = router;