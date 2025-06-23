import Character from "../models/characters.model.js";

export const createCharacter = async(req, res)=>{

    //Eliminar espacios al inicio y al final de las cadenas
    if(req.body){
        for (let value in req.body){
            if(typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            } 
        }
    }

    let {name, ki, race, gender, description} = req.body;

    try {
        //Validacion para que los datos no se reciban vacios.
        if(name === undefined) return res.status(400).json({errorMessage: "'name' attribute is undefined."})
        if(ki === undefined) return res.status(400).json({errorMessage: "'ki' attribute is undefined."})
        if(race === undefined) return res.status(400).json({errorMessage: "'race' attribute is undefined."})
        if(gender === undefined) return res.status(400).json({errorMessage: "'gender' attribute is undefined."})

        //Name validation
        const nameUnique = await Character.findOne({where: {name}})

        if(nameUnique) return res.status(400).json({errorMessage: "'name' must be unique per character"});
        
        //Ki validation
        const kiInt = Math.floor(ki);
        if(ki !== kiInt) return res.status(400).json({Message: "ki value must be int."});

        //Gender validation
        if(!(gender.trim() === "Female" || gender === "Male")) return res.status(400).json({errorMessage: "'gender' must be only 'Female' or 'Male'"});

        //Description validation
        if(description !== undefined){
            if(typeof description !== "string"){
                return res.status(400).json({errorMessage: "'description' must be a string"});
            }
        }

        const character = await Character.create({name, ki, race, gender, description});
        res.status(200).json({Message: "El personaje ha sido creado con éxito", character});
    } catch (error) {
        console.log("Error al crear el personaje: ", error)
        res.status(500).json({Message: error.message});
    }
}

export const getALLCharacters = async(req, res)=>{
    try {
        const characters = await Character.findAll();
        
        if(characters.length > 0) return res.status(200).json(characters);

        return res.status(404).json({errorMessage: "Database is empty."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

export const getCharacterById = async (req, res) =>{
    try {
        const character = await Character.findByPk(req.params.id);
        if(character) return res.status(200).json(character);

        return res.status(404).json({errorMessage: "Character not found."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}