import express from "express";
// const express = require("express") // this and above line is same
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors());
}

app.use(express.json());
app.use(rateLimiter);
// app.use((req, res, next) =>{
    //     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    //     next();
    // }); // run this first then go with next router.
    
app.use("/api/notes", notesRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/posts", postsRoutes);
// app.use("/api/payments", paymentsRoutes);
// app.use("/api/emails", emailsRoutes);
    
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));    
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"))
    });
}
    
connectDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log("Server started on PORT : ", PORT);
    });
});

