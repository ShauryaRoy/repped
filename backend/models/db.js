const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_CONN
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("MONGODB connected")
}).catch((error)=>{
    console.log('some error occured: ',error);
})