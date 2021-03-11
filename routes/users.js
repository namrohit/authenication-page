const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

//user model
const User = require('../models/User');

//login page
router.get('/login', (req, res) => res.render('login'));

//login page
router.get('/register', (req, res) => res.render('register'));

//register handle

router.post('/register', (req, res) => {
    // console.log(req.body);
    const { name, email, password, password2 } = req.body;
    let errors = [];
    // res.send('hello');


    //check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });

    }

    //check password match
    if (password != password2) {
        errors.push({ msg: 'password do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'password should be atleast 6 characters long' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {

        // validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else {
                    const newUser = new User({
                        name, email, password
                    });

                    console.log(newUser);
                    // res.send("hello");

                    //hash password

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.password = hash;

                            //save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered');
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err));
                        })
                    })
                }
            })


    }
})

// Login
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/notes',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


// logout handle

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out');
    res.redirect('/users/login');

});

module.exports = router;