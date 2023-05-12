const { Router } = require('express');
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');

const router = Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);

module.exports = router;