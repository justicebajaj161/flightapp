import mongoose from "mongoose";


const BookingsSchema = new mongoose.Schema(
    {userid: { type: mongoose.Types.ObjectId, require: true, ref: "passengers" },
     to:{type:String},
     from:{type:String},
     prices:{type:Number},
     airline:{type:String},
     date:{type:Date}
    },
    {timestamps:true}
  )
  
  const Booking = mongoose.model('bookings',BookingsSchema)
  
  export default Booking