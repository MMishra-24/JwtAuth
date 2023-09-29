const express = require('express');
const {registerView, loginView, dashboardView} = require('../controllers/loginController');
const router = express.Router();
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/dashboard', dashboardView)
module.exports = router;