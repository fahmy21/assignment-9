import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return value !== value.toUpperCase()
            },
            message:"title must not be uppercase"
        }
    },
    content:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

export const noteModel = mongoose.model("Note",noteSchema)

export default noteModel