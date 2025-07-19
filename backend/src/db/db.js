const mongoose = require('mongoose');

function connectDB(){
   mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('connected to MongoDB');
    }).catch((err)=>{
        console.log('Error to connect to mongodb', err);
    })
}

module.exports= connectDB