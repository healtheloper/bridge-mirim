import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize('mirim_bridge', "park", process.env.USER_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
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
