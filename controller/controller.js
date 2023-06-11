
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Flight from "../models/flightdetails.js";
import Passenger from "../models/passengers.js";
import Cities from '../models/cities.js';
import Booking from '../models/bookings.js';
import mongoose from 'mongoose'


// example in postman

// {
//     "cities":"jaipur"
// }


// http://localhost:7000/api/auth/postcity
const postcities= async(req,res)=>{
    console.log(req.body);
    const body=req.body;
    const saveflightdata=await new Cities(body).save();
    console.log('saved')
    res.status(200).json({message:'City created Successfully'})

}


// example in postman 

// {
   
//     "to":"banglore",
//     "from":"mumbai",
//     "prices":[{
//     "indigo":3000,
//     "airAsia":3800,
//     "vistara":8000
//     }],
//     "dates":["2023-06-04",
//     "2023-06-09",
//     "2023-06-12",
//     "2023-06-16",
//     "2023-06-23",
//     "2023-06-26",
//     "2023-06-28",
//     "2023-06-30"
//     ]

// }

// http://localhost:7000/api/auth/getdata
const placespost = async (req, res) => {
    console.log(req.body)
    
    const body=req.body
    console.log(req.body.prices[0].indigo)
    const prciesarray=req.body.prices.map((price)=>{
        return price
    })
    console.log(prciesarray)
    const saveflightdata=await new Flight(body).save();
    console.log('saved')
    res.status(200).json({message:'Event created Successfully'})
};


const Register=async(req,res)=>{
  
    const {firstName,lastName,email,password}=req.body;
    console.log(firstName,lastName,email,password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userfind = await Passenger.findOne({ $or: [{ email: email }, { password: password }] });
    try {
      if (userfind) {
          return res.json({ message: 'User Already Exists' })
      } else {
          const userWithHashedPassword = { firstName, lastName, email, password: hashedPassword }
        const newUser = await new Passenger({ ...userWithHashedPassword }).save();
        console.log(newUser);
        res.json({ message: 'User Added Successfully', newUser: userWithHashedPassword })
      }
    } catch (error) {
      res.json({ message: 'Check the email format' })
    }
  }


  const Login=async(req,res)=>{
    console.log('login')
    const {email,password} = req.body;
    const userfind = await Passenger.findOne({ email: email });
    if (userfind) {
        const isPasswordCorrect = await bcrypt.compare(password, userfind.password)
        console.log(isPasswordCorrect)
        if (isPasswordCorrect) {
          const token = jwt.sign(
            { userid:userfind._id,
              firstName: userfind.firstName,
              lastName: userfind.lastName,
              email: userfind.email
            }, process.env.JWTCODE, { expiresIn: "7d" }
          )
          return res.json({ message: 'Login Successful', user: token, logined: true, userDetails: { email: userfind.email, firstName: userfind.firstName,lastName: userfind.lastName },userid:userfind._id})
    
    
        } else {
          res.json({ message: 'Password Incorrect', logined: false })
        }
      } else {
        res.json({ message: 'User Not Found ' })
      }
}


const citiesdata = async (req, res) => {
    try {
      const data = await Cities.find({}); 
      console.log(data);
      res.json({ message: "Cities Data", citiesData: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving cities data" });
    }
  };

  const citiesSelected = async (req, res) => {
    const { inputToValue, inputFromValue } = req.body;
    try {
      console.log(inputToValue);
      console.log(inputFromValue);
      const flightFind = await Flight.findOne({
        $and: [{ to: inputToValue }, { from: inputFromValue }]
      });
      if (flightFind) {
        return res.json({ message: 'Available Dates', possibleflights: flightFind });
      } else {
        return res.json({ message: 'Flights not available for the selected cities' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving cities data' });
    }
  };


  const setbooking=async(req,res)=>{
    const {airline,price,inputToValue,inputFromValue,selectedDate}=req.body;
    const userid=req.user.userid
    console.log(airline)
    console.log(price)
    console.log(inputToValue)
    console.log(userid)
    const newBooking = await new Booking({userid:userid,to:inputToValue,from:inputFromValue,prices:price,airline:airline,date:selectedDate}).save();
    return res.json({ message: 'Booked' });
  }

  const showUserBookings=async(req,res)=>{
    const userid=req.user.userid;
    console.log('shwoing lolol')
    const bookingsOfUserid=await Booking.find({userid:userid}).populate({ path: 'userid', select: '-password' })
    res.json({message:"booking data",bookingsOfUserid})
  }
  
  



export {postcities,placespost , Login , Register,citiesdata,citiesSelected,setbooking,showUserBookings};




