const mongoose = require("mongoose");


const newRegistration = new mongoose.Schema(
  {
      username:{type:String, required:true, unique: true},
      email : {type:String, required:true, unique: true},
      cource: {type:String,required:true},
      age:{type:Number,required:true},
      phno:{type:Number,required:true},
      key: {type:String,required:true},
  },
  {timestamps:true}
);
module.exports=mongoose.model("newReg",newRegistration)
