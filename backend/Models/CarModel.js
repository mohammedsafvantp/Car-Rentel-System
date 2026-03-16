const mongoose=require('mongoose')

const carSchema=new mongoose.Schema({
    CarName:{
        type:String,
        required:true
    },
    Year:{
        type:Number,
        required:true
    },
    RegNo:{
        type:String,
        required:true,
        unique:true
    },
    BodyType:{
        type:String,
        required:true
    },
    Transmission:{
        type:String,
        required:true
    },
    Seat:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Fuel:{
        type:String,
        required:true

    },
    Availability : {
        type:String,
        required:true
    },
    CarImg:{
        type:String,
        required:true,
    }

})

const CarDetails=mongoose.model("CarDetails",carSchema)

module.exports=CarDetails