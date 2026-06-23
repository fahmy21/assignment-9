import userController from "./modules/user/user.controller.js";
import noteController from "./modules/note/note.controller.js";

export const appRouter = (app)=>{

    app.use("/users",userController)

    app.use("/notes",noteController)

}