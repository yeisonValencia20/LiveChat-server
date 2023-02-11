const { Router } = require('express');
const { check } = require('express-validator');


const { checkBody } = require('../middlewares/checkBody')
const { singUp } = require('../controllers/users');

const router = Router();

router.post('/singup', [
    check('name', 'Name is obligatory').not().isEmpty(),
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password must have a least 6 charaters'),
    checkBody
], singUp);

module.exports = router;