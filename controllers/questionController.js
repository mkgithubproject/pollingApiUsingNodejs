const Question=require('../models/question');
const Option=require('../models/option');
const path=require('path');
module.exports.home=function(req,res){
    return res.sendFile(path.join(__dirname,'../README.md'));
} 
module.exports.create= function(req,res){// create question
   Question.create({
    title:req.body.title,
    options:[],
   },function(err,question){
    if(err){
        res.status(400).json({ message: err.message });
        return;
    }
    res.status(201).json(question);
    return;

   });
}
module.exports.delete=  function(req,res){// delete question
    Question.findById(req.params.id).populate('options').exec(function(err,question){
        if(err){
            res.status(400).json({ message: err.message });
            return;
        }
        if(question){
            for(opt of question.options){
                if(opt.votes>0){
                    return res.status(400).json({message:"You can not delete , question has been voted!"})
                }
            }
            question.remove();
            Option.deleteMany({question:req.params.id},function(err){
                if(err){
                    res.status(400).json({ message: err.message });
                   return;
                }
            });
        }else{
            res.status(201).json({"success":"question not found"});
            return; 
        }
        res.status(201).json({"success":"question deleted","question":question});
        return;

    });

}

module.exports.createOption=async function(req,res){// create option
    try{
        const question= await Question.findById(req.params.id);
        if(question){
           const option=await  Option.create({
                text:req.body.text,
                votes:0,
                question:question._id,
             });
             if(option){
                option.votingUrl=req.protocol + '://' + req.get('host')+'/options/'+option._id+'/add_votes';
                option.save();
            }
            await question.options.push(option);
            question.save();
            res.status(201).json({"message":"option added",option,question});
            return;
        }
    }catch(err){
        res.status(400).json({ message: err.message });
        return;
    }
   

}
module.exports.viewQuestionAndOptions=async function(req,res){// view question with all options
    try{
       const question=await Question.findById(req.params.id).populate('options');
       res.status(201).json(question);
       return;
    }catch(err){
        res.status(400).json({ message: err.message });
        return;
    }
}