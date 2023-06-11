import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  to:{type:String,required:true},
  from:{type:String,required:true},
  prices:[{
    indigo:{type:Number,required:true},
    airAsia:{type:Number,required:true},
    vistara:{type:Number,required:true}
  }],
  dates:[{
   type:Date
  }]
});

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;

