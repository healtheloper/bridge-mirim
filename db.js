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
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description: Sequelize.STRING,
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});

export const questionModel = sequelize.define("Question", {
    videoId: {
        type: Sequelize.STRING
    },
    userId: Sequelize.TEXT,
    title: {
        type: Sequelize.STRING
    },
    description: Sequelize.STRING,
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
});

export const commentModel = sequelize.define("Comment", {
    questionId: {
        type: Sequelize.STRING
    },
    userId: Sequelize.TEXT,
    comment: Sequelize.STRING
});

export const UserModel = sequelize.define("USERS",{
    email : Sequelize.STRING,
    password: Sequelize.STRING,
    password2: Sequelize.STRING,
    name : Sequelize.STRING
});

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection : ${error}`)

sequelize.sync();

sequelize
    .authenticate()
    .then(handleOpen)
    .catch(handleError);
