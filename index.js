const express=require('express');
const app=express();
require('dotenv').config();
app.use(express.json());
const db=require('./config/mongoose');
const localPort=8000;
app.use('/',require('./routes'));
app.listen(process.env.PORT || localPort,(err)=>{// start server
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port ${localPort} `);

})



