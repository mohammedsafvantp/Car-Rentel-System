const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    RegNo:{
        type:String,
        required:true
    },
    CarName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    StartDate:{
        type:Date,
        required:true
    },
    EndDate:{
        type:Date,
        required:true
    }
})

const BookingDetails=mongoose.model('BookingDetails',bookingSchema)
module.exports=BookingDetails