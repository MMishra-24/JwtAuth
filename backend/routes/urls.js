const express = require('express');
const {registerUser, loginUser } = require('../controllers/loginController');
const { authenticateJWT } = require("../auth/auth");
const { dashboardView } = require("../controllers/dashboardController");
const {addMovie, updateMovie, deleteMovie} = require("../controllers/movieController")
const router = express.Router();
router.get("/movie", authenticateJWT, dashboardView);
router.post("/movie", authenticateJWT, addMovie);
router.patch("/movie", authenticateJWT, updateMovie);
router.delete("/movie", authenticateJWT, deleteMovie);

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;