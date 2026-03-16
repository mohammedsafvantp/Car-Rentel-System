require('dotenv').config()
const cors=require('cors')
const express=require('express')
const router=require('./Router/router')
require('./DBConnection/dbConnection')


const backend=express()
backend.use(cors())
backend.use(express.json())
backend.use(router)
backend.use('/carImages',express.static('./carImages'))


PORT=process.env.PORT || 3000

backend.listen(PORT,()=>{
    console.log(`Server Running at Port ${PORT}`);
    
})

backend.get('/',(req,res)=>{
    res.status(200).send("Server Running Successfully")
})