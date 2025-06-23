import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Character = sequelize.define("character",{
    id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ki: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    race:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING(),
    }

})

export default Character;
