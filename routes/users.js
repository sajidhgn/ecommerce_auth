const express = require('express');
const {registerUser,currentUser,loginUser,logoutUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateToken');
const router = express.Router();

console.log('user route==>',router)

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current',validateToken,currentUser);
// router.get('/logout',logoutUser);

module.exports = router;