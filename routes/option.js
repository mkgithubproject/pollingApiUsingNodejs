const express=require('express');
const router=express.Router();
const optionController=require('../controllers/optionController');
router.post('/:id/delete',optionController.delete);// delete option
router.post('/:id/add_vote',optionController.add_vote);// add vote
module.exports=router;