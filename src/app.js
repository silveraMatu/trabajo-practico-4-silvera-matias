import express from "express";
import dotenv from "dotenv";
import characterRoutes from "./routes/character.route.js";
import startDB from "./config/db.js";
dotenv.config()

const PORT = process.env.PORT;
const app = express();
//Se usa el middleware built-il json() para que el server pueda tomar JSON
app.use(express.json());
//Se usan las rutas a partir del path /api
app.use("/api", characterRoutes);

//Error handling middleware para responder accesos a rutas que no existen
app.use((req, res)=>{
    res.status(404).json({errorMessage: "Direction not found."});
});

startDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Servidor corriendo.");
    });
});