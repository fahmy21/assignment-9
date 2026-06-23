import noteModel from "../../database/models/note.model.js";

export const createNote = async(userId,data)=>{

    let note = await noteModel.create({
        ...data,
        userId
    })

    return {
        message:"Note created",
        note
    }
}

export const updateNote = async(userId,noteId,data)=>{

    let note = await noteModel.findById(noteId)

    if(!note){
        return {message:"Note not found"}
    }

    if(note.userId.toString() != userId.toString()){
        return {message:"You are not the owner"}
    }

    let updatedNote = await noteModel.findByIdAndUpdate(
        noteId,
        data,
        {new:true}
    )

    return updatedNote
}

export const replaceNote = async(userId,noteId,data)=>{

    let note = await noteModel.findById(noteId)

    if(!note){
        return {message:"Note not found"}
    }

    if(note.userId.toString() != userId.toString()){
        return {message:"You are not the owner"}
    }

    let updatedNote = await noteModel.findOneAndReplace({_id:noteId},{data, userId},{new:true})

    return updatedNote
}
export const updateAllNotes = async(userId,data)=>{

    let notes = await noteModel.updateMany(
        {userId},
        {title:data.title}
    )

    if(notes.matchedCount == 0){
        return {message:"no note found"}
    }

    return {
        message:"All notes updated"
    }
}

export const deleteNote = async(userId,noteId)=>{

    let note = await noteModel.findById(noteId)

    if(!note){
        return {message:"Note not found"}
    }

    if(note.userId.toString() != userId.toString()){
        return {message:"You are not the owner"}
    }

    let deletedNote = await noteModel.findByIdAndDelete(noteId)

    return {
        message:"deleted",
        deletedNote
    }
}

export const getNoteById = async(userId,noteId)=>{

    let note = await noteModel.findById(noteId)

    if(!note){
        return {message:"Note not found"}
    }

    if(note.userId.toString() != userId.toString()){
        return {message:"You are not the owner"}
    }

    return note
}

export const getNoteByContent = async(userId,content)=>{

    let note = await noteModel.findOne({
        userId,
        content
    })

    if(!note){
        return {message:"No note found"}
    }

    return note
}

export const getNotesWithUser = async(userId)=>{

    let notes = await noteModel.find({userId})
    .populate({
        path:"userId",
        select:"email"
    })

    return notes
}