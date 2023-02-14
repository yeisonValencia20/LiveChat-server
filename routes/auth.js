const { Router } = require("express");
const { check } = require("express-validator");

const { login, authToken } = require("../controllers/auth");
const { checkBody } = require("../middlewares/checkBody");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post('/login', [
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    checkBody
], login)

router.get('/tokenvalidation', validateJWT, authToken);

module.exports = router;
