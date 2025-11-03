const router=require('express').Router();
const {register,login,resetPassword}=require('../controller/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/reset-password',resetPassword)


module.exports=router;