const Question=require('../models/question');
const Option=require('../models/option');
module.exports.delete=  function(req,res){// delete option
    Option.findById(req.params.id,function(err,option){
        if(err){
            res.status(400).json({ message: err.message });
            return;
        }
        if(option){
            if(option.votes>0){
                return res.status(400).json({message:"You can not delete an option, option has been voted!"});
            }
            const questionID=option.question;
            Question.findById(questionID,function(err, question){
                if(err){
                    res.status(400).json({ message: err.message });
                    return;
                }
                if(question){
                    question.options.pull(req.params.id);
                    question.save();
                    option.remove();
                }
            });
        }else{
            res.status(201).json({"message":"option not found"});
            return;
        }
        res.status(201).json({"message":"option deleted"});
    });

}
module.exports.add_vote=async function(req,res){// add vote to option
    try{
      const option=await Option.findById(req.params.id);
        option.votes=option.votes+1;
        option.save();
        res.status(201).json(option);
        return;
    }catch(err){
        res.status(400).json({"message":err.message});
        return;
    }
}
