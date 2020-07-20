import express from "express";
import routes from "../routes";
import {
    getQuizUpload,
    postQuizUpload,
    getQuizEdit,
    postQuizEdit,
    deleteQuiz
} from "../controllers/quizController";

const quizRouter = express.Router();

quizRouter.get(routes.uploadQuiz, getQuizUpload);
quizRouter.post(routes.uploadQuiz, postQuizUpload);

quizRouter.get(routes.editQuiz(), getQuizEdit);
quizRouter.post(routes.editQuiz(), postQuizEdit);

quizRouter.get(routes.deleteQuiz(), deleteQuiz);

export default quizRouter;