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

    const {name, ki, race, gender, description} = req.body;

    try {
        //Validacion para que los datos no se reciban vacios.
        if(name === undefined) return res.status(400).json({errorMessage: "'name' attribute is undefined."})
        if(ki === undefined) return res.status(400).json({errorMessage: "'ki' attribute is undefined."})
        if(race === undefined) return res.status(400).json({errorMessage: "'race' attribute is undefined."})
        if(gender === undefined) return res.status(400).json({errorMessage: "'gender' attribute is undefined."})

        //Validación para que los nombres sean únicos
        const nameUnique = await Character.findOne({where: {name}});

        if(nameUnique) return res.status(400).json({errorMessage: "'name' must be unique per character"});
        
        //Validación para que el ki sea solo un entero
        const kiInt = Math.floor(ki);
        if(ki !== kiInt) return res.status(400).json({Message: "ki value must be int."});

        //Validación para que el género sea solo Female o Male
        if(!(gender === "Female" || gender === "Male")) return res.status(400).json({errorMessage: "'gender' must be only 'Female' or 'Male'"});

        //Si la descripción no viene vacias se valida que sea un string
        if(description !== undefined){
            if(typeof description !== "string"){
                return res.status(400).json({errorMessage: "'description' must be a string"});
            }
        }

        const character = await Character.create({name, ki, race, gender, description});
        res.status(200).json({Message: "Character created succesfully", character});
    } catch (error) {
        console.log("Error in character creation: ", error)
        res.status(500).json({Message: error.message});
    }
}
//Función para hacer un get de todos los personajes
export const getALLCharacters = async(req, res)=>{
    try {
        const characters = await Character.findAll();
        
        if(characters.length > 0) return res.status(200).json(characters);

        return res.status(404).json({errorMessage: "Database is empty."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}
//Función para hacer un get de un personaje por su id
export const getCharacterById = async (req, res) =>{
    try {
        const character = await Character.findByPk(req.params.id);
        if(character) return res.status(200).json(character);

        return res.status(404).json({errorMessage: "Character not found."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Función para actualizar el pj
export const updateCharacter = async (req, res)=>{
//Se hace un trim a todos los datos que sean string
     if(req.body){
        for (let value in req.body){
            if(typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            } 
        }
    }

    const {name, ki, race, gender, description} = req.body;

    try {
        //Validación para que el nombre de cada pj sea único
        if(name){
            const nameUnique = await Character.findOne({where: {name}});
            if(nameUnique) return res.status(400).json({errorMessage: "'name' must be unique per character"});
        }
        
        const [updated] = await Character.update({name, ki, race, gender, description}, {
            where: {id: req.params.id}
        });
       
        //Si la cantidad de filas afectadas es mayor a 0 entonces el personaje fue actualizado
       
        if(updated > 0) return res.status(200).json({Message: "Character has been updated"});
       
        //De otro modo, si no se actualizaron filas, el personaje no existe
       
        return res.status(404).json({errorMessage: "Character not found"})
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Función para eliminar pjs
export const deleteCharacter = async (req, res)=>{
    try {
        const deleted = await Character.destroy({where: {id: req.params.id}})

        //Si el entero que devuelve destroy es mayor a 0 entonces el pj ha sido eliminado
        
        if(deleted > 0) return res.status(200).json({Message: "Character has been deleted."});
        
        //sino, entonces el personaje no existe.
        
        return res.status(404).json({errorMessage: "Character not found."});
    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}