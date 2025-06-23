import express from "express";
import dotenv from "dotenv";
import characterRoutes from "./routes/character.route.js";
import startDB from "./config/db.js";
dotenv.config()

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api", characterRoutes);

startDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Servidor corriendo.");
    });
});