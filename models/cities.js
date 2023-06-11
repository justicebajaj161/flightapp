import mongoose from "mongoose";

const citiesSchema = new mongoose.Schema({
  
  cities:{
    type:String
  }
});

const Cities = mongoose.model("cities", citiesSchema);

export default Cities;

