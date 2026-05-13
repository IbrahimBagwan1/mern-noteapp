import Note from "../../models/Note.js";

export async function getAllNotes (req, res){
    try{
        const notes = await Note.find().sort({createdAt: -1}); // newly first.
        res.status(200).json(notes);
    } catch(error){
        console.error("Error in getting all Notes!", error);
        res.status(500).json({message: "Internal server error"});
    }
    
};


export async function getOneNote(req, res){
    try{
        const reqNote = await Note.findById(req.params.id);
        if(!reqNote) return res.status(404).json({message: "Unable to find Note"});

        res.status(200).json(reqNote);
        
    } catch(error) {
        console.error("Error in getting Note!", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function CreateNote(req, res){
    try{
        const {title, content} = req.body; 
        const newNote = new Note({title, content});

        const savedNote = await newNote.save();

        res.status(201).json(savedNote);

    }catch(error){
        console.error("Error in creating notes", error);
        res.status(500).json({message: "Internal server error"});
    }
};


export async function UpdateNote(req, res) {
    try{
        const {title, content} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content});

        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json(updatedNote);
    } catch(error){
        console.error("Error in Updating", error);
        res.status(500).json({message: "Internal server error"});
    }
}


export async function DeleteNote(req,res){
    try{
        const {title, content} = req.body;

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(500).json({message: "Note not found to delete"});

        res.status(200).json({message: "Deleted successfully"});
    }catch(error){
        console.error("Error occured while deleting ", error);
        res.status(500).json({message: "Error while Deleting"});
    }
}