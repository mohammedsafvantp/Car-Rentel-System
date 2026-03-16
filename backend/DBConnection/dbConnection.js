const mongoose=require('mongoose')
const CONNECTION_STRING=process.env.CONNECTION_STRING

mongoose.connect(CONNECTION_STRING).then(res=>{
    console.log("Server Connected with DB");
    
}).catch(err=>{
    console.log("Connection Failed",err);
    
})