import { Router } from "express";
import { auth } from "../../middleware/auth/auth.js";
import {createNote,updateNote,replaceNote,updateAllNotes,deleteNote,
    getNotes,
    getNoteById,
    getNoteByContent,
    getNotesWithUser,getNotesAggregation} from "./note.service.js";
const router = Router();

router.post("/",auth,async(req,res)=>{
    let result = await createNote(req.user,req.body)
    res.json(result)
})

router.patch("/:noteId",auth,async(req,res)=>{
    let result = await updateNote(req.user,req.params.noteId,req.body)
    res.json(result)
})

router.put("/replace/:noteId",auth,async(req,res)=>{
    let result = await replaceNote(req.user,req.params.noteId,req.body)
    res.json(result)
})

router.patch("/all",auth,async(req,res)=>{
    let result = await updateAllNotes(req.user,req.body)
    res.json(result)
})

router.delete("/:noteId",auth,async(req,res)=>{
    let result = await deleteNote(req.user,req.params.noteId)
    res.json(result)
})

router.get("/",auth,async(req,res)=>{
    let result = await getNotes(req.user,req.query)
    res.json(result)
})

router.get("/:id",auth,async(req,res)=>{
    let result = await getNoteById(req.user,req.params.id)
    res.json(result)
})

router.get("/note-by-content/search",auth,async(req,res)=>{
    let result = await getNoteByContent(req.user,req.query.content)
    res.json(result)
})

router.get("/note-with-user/all",auth,async(req,res)=>{
    let result = await getNotesWithUser(req.user)
    res.json(result)
})
router.get("/aggregation/data",auth,async(req,res)=>{

    let result = await getNotesAggregation(req.user)

    res.json(result)

})


export default router;