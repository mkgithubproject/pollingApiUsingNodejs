const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect( `mongodb://localhost/${process.env.DB}`);
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));
db.once('open',function(){
    console.log('Connected to Database:: MongoDB');
});
module.exports=db;
