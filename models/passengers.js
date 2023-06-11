import mongoose from "mongoose";


const PassengerSchema= new mongoose.Schema({
    firstName:{type:String, require:true},
    lastName:{type:String,require:true},
    email: { type: String, unique: true, require:true},
    password: { type: String,  require:true}
},{timestamps:true}
)

const Passenger= mongoose.model('passengers',PassengerSchema)

export default Passenger