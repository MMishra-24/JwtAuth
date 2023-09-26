const express = require('express');
const {registerView, loginView, registerUser, loginUser } = require('../controllers/loginController');
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");
const { logoutUser } = require("../controllers/logoutController")
const {addMovie, updateMovie, deleteMovie} = require("../controllers/movieController")
const router = express.Router();
router.get('/register', registerView);
router.get('/login', loginView);
router.get("/movie", protectRoute, dashboardView);
router.post("/movie", protectRoute, addMovie);
router.patch("/movie", protectRoute, updateMovie);
router.delete("/movie", protectRoute, deleteMovie);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/logout', logoutUser);
module.exports = router;