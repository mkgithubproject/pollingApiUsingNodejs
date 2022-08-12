const express=require('express');
const router=express.Router();
const questionController=require('../controllers/questionController')
router.get('/',questionController.home);// home route
router.use('/questions',require('./question'));// questions router
router.use('/options',require('./option'));//options router
module.exports=router;