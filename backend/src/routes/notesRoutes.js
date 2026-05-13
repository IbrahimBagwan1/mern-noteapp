import express from "express";

const router = express.Router();

import { CreateNote, DeleteNote, getAllNotes, UpdateNote, getOneNote } from "../controllers/notesController.js";

router.get("/",  getAllNotes);

router.get("/:id",  getOneNote);

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 2 notes");
// });

router.post("/", CreateNote);

router.put("/:id", UpdateNote);

router.delete("/:id", DeleteNote);


export default router;