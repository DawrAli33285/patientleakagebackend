const router=require('express').Router();
const {getFootData}=require('../controller/footdata')
const { verifyToken } = require('../middleware/middleware');
router.post('/getFootData',verifyToken,getFootData)




module.exports=router;