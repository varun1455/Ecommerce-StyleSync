const express = require('express')
const {fetchUsers, fetchUserById, updateUser} = require('../controllers/Users');
const router = express.Router();

router.get('/',fetchUsers ).get('/:id', fetchUserById).patch('/:id', updateUser)


exports.router = router;
