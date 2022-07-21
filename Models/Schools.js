const mongoose = require("mongoose");

const SchoolsSchema = new mongoose.Schema(
  {
    schoolLink: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { data: Buffer,contentType:String, default:false},
    categories: { type: String, default: false },
    knownFor: { type: String, required: true },
    location: { type: String, required: true },
    board:{ type: String, required: true },
    ownership:{ type: String, required: true }, 
    // campusSize:{ type: Number, required: true },
    annualFees:{ type: Number, required: true },
    coEd:{ type: String, required: true },
    courses:{type: Array, default: false },
    academicStats:{type:String,default:false},
    admissionStatus:{type:String,required:true},
    startDate:{type:String,required:true},
    endDate:{type:String,required:true}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Schools", SchoolsSchema);

