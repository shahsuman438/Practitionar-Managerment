const mongoose=require('mongoose');
const practitionarSchema=new mongoose.Schema({
    icuSpecialist:{
        type:Boolean,
        default:false
    },
    name:{ 
        type:String,
        required:true,
    },
    email:{
        type:String
    },
    startDateTime:{
        type:Date,
    },
    endDateTime:{
        type:Date,
    },
    created:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model("practitionar",practitionarSchema); 