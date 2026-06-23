import express from "express";
import dotenv from "dotenv";
import connectionDB from "./config/connection.js";
import { appRouter } from "./app.controller.js";

dotenv.config();

const app = express();

app.use(express.json());

connectionDB();

appRouter(app);

app.listen(3000,()=>{
    console.log("server is runing");
})