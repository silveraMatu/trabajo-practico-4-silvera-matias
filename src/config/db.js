import sequelize from "./database.js";

const startDB = async()=>{
    try{
        await sequelize.authenticate();
        console.log("Conectado a la base de datos con exito.");
        await sequelize.sync();
    }catch(err){
        console.log("Hubo un problema al conectarse con la base de datos: ",);
    }
}

export default startDB;