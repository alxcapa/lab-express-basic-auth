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


module.exports = router;