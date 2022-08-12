const mongoose=require('mongoose');
const optionScema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    votes:{
        type:Number,
    },
    votingUrl:{
        type:String
    },
    question:{
        type:mongoose.Types.ObjectId,
        ref:'Question'
    }
})
module.exports=mongoose.model('Option',optionScema);