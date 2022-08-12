const mongoose=require('mongoose');
const questionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    options:[{
        type:mongoose.Types.ObjectId,
        ref:'Option',
    }]

});
module.exports=mongoose.model('Question',questionSchema);