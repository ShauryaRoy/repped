const{signup,login} =require('../controllers/AuthController.js');
const {signupValidation,loginValidation} = require('../middleware/AuthValidation.js')

const router =require('express').Router();



router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);

module.exports = router;