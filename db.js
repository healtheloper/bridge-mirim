import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize('mirimLab', "root", process.env.USER_PASSWORD, {
    host: '34.71.189.196',
    dialect: 'mysql',
    logging: false
});


export const videoModel = sequelize.define("Video", {
    fileUrl: {
        type: Sequelize.STRING,
        required: "File URL is required",
    },
    title: {
        type: Sequelize.STRING,
        required: "Title is required",
    },
    description: Sequelize.STRING,
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    comments: Sequelize.TEXT
});

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection : ${error}`)

sequelize.sync();

sequelize
    .authenticate()
    .then(handleOpen)
    .catch(handleError);
