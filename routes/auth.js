const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");
const { checkBody } = require("../middlewares/checkBody");

const router = Router();

router.post('/login', [
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    checkBody
], login)

module.exports = router;
