import express from "express";
import { createCharacter, deleteCharacter, getALLCharacters, getCharacterById, updateCharacter } from "../controllers/character.controller.js";
const router = express.Router();

router.post("/characters", createCharacter);
router.get("/characters", getALLCharacters);
router.get("/characters/:id", getCharacterById);
router.put("/characters/:id", updateCharacter);
router.delete("/characters/:id", deleteCharacter);

export default router;