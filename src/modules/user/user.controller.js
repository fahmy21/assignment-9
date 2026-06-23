import { Router } from "express";
import { signup , login , updateUser , deleteUser , getUser } from "./user.service.js";
import { auth } from "../../middleware/auth/auth.js";

const router = Router();

router.post("/signup",async(req,res)=>{
    let result = await signup(req.body)
    res.json(result)
})

router.post("/login",async(req,res)=>{
    let result = await login(req.body)
    res.json(result)
})

router.patch("/",auth,async(req,res)=>{
    let result = await updateUser(req.user,req.body)
    res.json(result)
})

router.delete("/",auth,async(req,res)=>{
    let result = await deleteUser(req.user)
    res.json(result)
})

router.get("/",auth,async(req,res)=>{
    let result = await getUser(req.user)
    res.json(result)
})

export default router;