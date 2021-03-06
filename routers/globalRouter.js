import express from "express";
import routes from "../routes";
import { home, search, header } from "../controllers/videoController";
import {
  postLogin,
  getLogin,
  logout,
  getJoin,
  postJoin,
} from "../controllers/userController";
import { handleQuiz } from "../controllers/quizController";
import { uploadImage } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, uploadImage, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

globalRouter.get("/quiz", handleQuiz);

export default globalRouter;
