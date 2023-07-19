// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers,getOneUser,registerUser,loginUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/getOne/:userId', getOneUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
