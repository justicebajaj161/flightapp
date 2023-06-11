import logginedstatus from "../authorization/authorization.js";
import {Login, Register, citiesSelected, citiesdata, placespost, postcities, setbooking, showUserBookings} from "../controller/controller.js";
import express from "express"



const Routermain= express.Router();

Routermain.post('/postcity',postcities)
Routermain.post('/getdata',placespost)
Routermain.post('/login',Login)
Routermain.post('/register',Register)
Routermain.get('/getcitiesdata',citiesdata)
Routermain.post('/sendcitiesfordates',logginedstatus,citiesSelected)
Routermain.post('/postbooking',logginedstatus,setbooking)
Routermain.get('/showbooking',logginedstatus,showUserBookings)

export default Routermain;