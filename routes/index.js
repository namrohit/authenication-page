const express = require('express');

const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//weclome page
router.get('/', (req, res) => res.render('welcome'));

//Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name
}));

router.get('/notes', ensureAuthenticated, (req, res) => res.sendFile(__dirname + '/notes.html'));

// console.log(__dirname);
module.exports = router;