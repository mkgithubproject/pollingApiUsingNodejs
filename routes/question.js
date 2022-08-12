const express=require('express');
const router=express.Router();
const questionController=require('../controllers/questionController');
router.post('/create',questionController.create);// add question
router.post('/:id/delete', questionController.delete);// delete question
router.post('/:id', questionController.viewQuestionAndOptions);// view question with options
router.post('/:id/options/create',questionController.createOption);// create option
module.exports=router;