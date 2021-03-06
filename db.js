import { Sequelize, Model, DataTypes, INTEGER } from "sequelize";
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
    note: Sequelize.STRING(2000),
    views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});

export const quizModel = sequelize.define("Quiz", {
    question: {
        type: Sequelize.STRING
    },
    answerOne: Sequelize.STRING,
    answerTwo: Sequelize.STRING,
    answerThree: Sequelize.STRING,
    answerFour: Sequelize.STRING,
    answerCheck: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});

export const questionModel = sequelize.define("Question", {
    videoId: {
        type: Sequelize.STRING
    },
    userName: Sequelize.TEXT,
    userId: Sequelize.TEXT,
    title: {
        type: Sequelize.STRING
    },
    description: Sequelize.STRING(2000),
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
    userName: Sequelize.STRING,
    userImage: Sequelize.STRING,
    comment: Sequelize.STRING
});

export const userModel = sequelize.define("User", {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    avatarUrl: Sequelize.STRING,
    studentCheck: Sequelize.INTEGER,
    password: Sequelize.STRING,
    password2: Sequelize.STRING,
});

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection : ${error}`)

sequelize.sync();

sequelize
    .authenticate()
    .then(handleOpen)
    .catch(handleError);
