import mongoose from "mongoose";

const connectionDB = async()=>{

    await mongoose.connect(process.env.DB_URL)//notapp

    console.log("db connected");

}

export default connectionDB