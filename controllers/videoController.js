import routes from "../routes";
import { videoModel, questionModel, quizModel, UserModel } from "../db";
import fs from "fs";
import session from "express-session";


export const home = async (req, res) => {
  try {

    const videos = await videoModel.findAll();
    const quizs = await quizModel.findAll();

    if (req.session.auth) {

      const user = await UserModel.findAll({ where: { email: req.session.email } });

      res.render("home", {
        pageTitle: "Home",
        videos,
        quizs,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(user[0].id),
        reglabel: req.session.email,
        quizUpload: "",
        videoUpload: ""
      });
    } else if (req.session.auth && req.session.teacher) {

      const user = await UserModel.findAll({ where: { email: req.session.email } });

      res.render("home", {
        pageTitle: "Home",
        videos,
        quizs,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(user.id),
        reglabel: req.session.email,
        quizUpload: "Quiz upload",
        videoUpload: "Video Upload"
      });
    }
    else {
      res.render("home", {
        pageTitle: "Home",
        videos,
        quizs,
        logurl: routes.login,
        loglabel: "Log In",
        regurl: routes.join,
        reglabel: "Join",
        quizUpload: "",
        videoUpload: ""
      });
    }
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [], quizs: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  const videos = await videoModel.findAll();
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description, note },
    file: { path }
  } = req;
  const newVideo = await videoModel.create({
    fileUrl: path,
    title,
    description,
    note
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

export const getUploadQuestion = async (req, res) => {
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

export const postUploadQuestion = async (req, res) => {
  const {
    params: { id },
    body: { title, description, userId }
  } = req;
  const newQuestion = await questionModel.create({
    videoId: id,
    userId,
    title,
    description
  });
  res.redirect(routes.videoDetail(newQuestion.videoId));
}
