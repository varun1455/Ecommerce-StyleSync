const express = require('express')
const {createUser, loginUser, checkuser} = require('../controllers/Auth');
const router = express.Router();
const passport = require('passport')

router.post('/signup', createUser).post('/login',passport.authenticate('local'), loginUser).get('/check',passport.authenticate('jwt'),checkuser)

exports.router = router;