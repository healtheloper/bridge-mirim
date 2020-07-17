import express from "express";
import routes from "../routes";
import {
  videos,
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  getQuestion,
  postQuestion
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// 비디오 게시
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// ID 별 비디오 상세 정보
videoRouter.get(routes.videoDetail(), videoDetail);

// 비디오 수정
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// 비디오 삭제
videoRouter.get(routes.deleteVideo(), deleteVideo);

// 질문게시글 게시
videoRouter.get(routes.uploadQuestion(), getQuestion);
videoRouter.post(routes.uploadQuestion(), postQuestion);

export default videoRouter;
