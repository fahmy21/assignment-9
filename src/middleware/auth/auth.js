import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
export const auth = async(req,res,next)=>{

    let {authorization} = req.headers

    if(!authorization){
        return res.json({
            message:"token required"
        })
    }

    let decoded = jwt.verify(
        authorization,
        "route"
    )

    req.user = decoded.id

    next()
}
export const encrypt = (text)=>{
    return CryptoJS.AES.encrypt(
        text,
        "route"
    ).toString()
}