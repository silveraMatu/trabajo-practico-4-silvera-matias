import express from "express";
import { createCharacter, getALLCharacters, getCharacterById } from "../controllers/character.controller.js";
const router = express.Router();

router.post("/characters", createCharacter);
router.get("/characters", getALLCharacters);
router.get("/characters/:id", getCharacterById);
// router.put("/characters",)
// router.delete("/characters",)

export default router;