import express from "express";
// const express = require("express") // this and above line is same
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


// middleware
app.use(cors());

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
    
    
connectDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log("Server started on PORT : ", PORT);
    });
});

