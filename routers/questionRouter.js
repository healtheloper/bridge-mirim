import express from "express";
import routes from "../routes";
import { getQuestion, getEditQuestion, postEditQuestion, deleteQuestion, uploadComment, deleteComment } from "../controllers/questionController"
const questionRouter = express.Router();

questionRouter.get(routes.questionDetail(), getQuestion);

// 댓글 업로드
questionRouter.post(routes.uploadComment(), uploadComment);

// 댓글 삭제
questionRouter.get(routes.deleteComment(), deleteComment);

// 질문 수정
questionRouter.get(routes.editQuestion(), getEditQuestion);
questionRouter.post(routes.editQuestion(), postEditQuestion);

// 질문 삭제
questionRouter.get(routes.deleteQuestion(), deleteQuestion);

export default questionRouter;