import userModel from "../../database/models/user.model.js"
import { hashPassword , comparePassword } from "../../utils/hash/hashing.js"
import jwt from "jsonwebtoken"
import { encrypt } from "../../utils/encryption/encryption.js";

export const signup = async(data)=>{

    let {name,email,password,phone,age} = data

    let existUser = await userModel.findOne({email})

    if(existUser){
        return {
            message:"user already exist"
        }
    }

    let hash = await hashPassword(password)

    let encryptPhone = encrypt(phone)

    let user = await userModel.create({
        name,
        email,
        password:hash,
        phone:encryptPhone,
        age
    })

    return {
        message:"done",
        user
    }
}

export const login = async(data)=>{

    let {email,password} = data

    let user = await userModel.findOne({email})

    if(!user){
        return {message:"Invalid email or password"}
    }

    let match = await comparePassword(password,user.password)

    if(!match){
        return {message:"Invalid email or password"}
    }

    let token = jwt.sign(
        {id:user._id},
        "route"
    )

    return {
        message:"login successful",
        token
    }
}

export const updateUser = async(userId,data)=>{

    let user = await userModel.findById(userId)

    if(!user){
        return {message:"User not found"}
    }

    if(data.email){

        let emailExist = await userModel.findOne({
            email:data.email
        })

        if(emailExist){
            return {message:"Email already exists"}
        }
    }

    let updatedUser = await userModel.findByIdAndUpdate(
        userId,
        data,
        {new:true}
    )

    return {
        message:"User updated",
        updatedUser
    }
}

export const deleteUser = async(userId)=>{

    let user = await userModel.findByIdAndDelete(userId)

    if(!user){
        return {message:"User not found"}
    }

    return {message:"User deleted"}
}

export const getUser = async(userId)=>{

    let user = await userModel.findById(userId)

    if(!user){
        return {message:"User not found"}
    }

    return user
}