import express from "express";
import cors from "cors";
import Routermain from "./routers/router.js";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';



const app=express();
app.use(express.json())
app.use(cors());
dotenv.config();

const currentModuleUrl = import.meta.url;

// Convert the URL to a file path
const currentModulePath = fileURLToPath(currentModuleUrl);

// Get the directory path of the current module
const currentDir = dirname(currentModulePath);
app.use(express.static(join(currentDir, 'frontend', 'build')));


app.use("/api/auth",Routermain);

app.get('*', (req, res) => {
    res.sendFile(join(currentDir, 'frontend', 'build', 'index.html'));
  });








const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
Connection(username,password);

const PORT= process.env.PORT || 7000;

app.listen(PORT,()=>{
    console.log(`running at port ${PORT}`)
});