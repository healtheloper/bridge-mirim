import routes from "../routes";
import { videoModel, questionModel } from "../db";
import fs from "fs";

export const home = async (req, res) => {
  try {
    const videos = await videoModel.findAll(); // DB에 있는 모든 video를 가져옴, await 부분이 끝나기 전 까지 render를 하지 않음, 에러가 생겨도 실행
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await videoModel.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoModel.findAll({ where: { id: id } });
    const questions = await questionModel.findAll({ where: { videoId: id } });
    res.render("videoDetail", { pageTitle: video[0].title, video: video[0], questions });

  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoModel.findAll({ where: { id: id } });
    res.render("editVideo", { pageTitle: `Edit ${video[0].title}`, video: video[0] });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await videoModel.update({ title, description }, { where: { id: id } },);
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await videoModel.findAll({ where: { id: id } });
    fs.unlinkSync(video[0].fileUrl, (err) => {
      if (err) console.log(err);
      else console.log("-- Video Deleted --")
    });

    await videoModel.destroy({ where: { id: id } });
    await questionModel.destroy({ where: { videoId: id } });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const getQuestion = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoModel.findAll({ where: { id: id } });
    res.render("uploadQues", { pageTitle: `Question Upload ${video[0].title}`, video: video[0] });
  } catch (error) {
    res.redirect(routes.home);
  }
}

export const postQuestion = async (req, res) => {
  const {
    params: { id },
    body: { title, description, userId }
  } = req;
  console.log(req.body);
  const newQuestion = await questionModel.create({
    videoId: id,
    userId,
    title,
    description
  });
  res.redirect(routes.videoDetail(newQuestion.videoId));
}
