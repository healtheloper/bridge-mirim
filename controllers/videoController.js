import routes from "../routes";
import { videoModel, questionModel, quizModel, userModel } from "../db";
import fs from "fs";
import session from "express-session";

export const home = async (req, res) => {
  try {

    const videos = await videoModel.findAll();
    const quizs = await quizModel.findAll();

    if (req.session.auth) {

      const user = await userModel.findAll({ where: { email: req.session.email } });

      res.render("home", {
        pageTitle: "Home",
        videos,
        quizs,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        quizUpload: "",
        videoUpload: "", videos
      });
    } else if (req.session.auth && req.session.teacher) {

      const user = await userModel.findAll({ where: { email: req.session.email } });

      res.render("home", {
        pageTitle: "Home",
        videos,
        quizs,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        quizUpload: "Quiz upload",
        videoUpload: "Video Upload", videos
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
        videoUpload: "", videos
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

export const getUpload = async (req, res) => {
  const videos = await videoModel.findAll();

  if (req.session.auth) {
    res.render("upload", {
      pageTitle: "Upload",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      quizUpload: "",
      videoUpload: "", videos
    });
  } else if (req.session.auth && req.session.teacher) {
    res.render("upload", {
      pageTitle: "Upload",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      quizUpload: "Quiz upload",
      videoUpload: "Video Upload", videos
    });
  } else {
    res.render("upload", {
      pageTitle: "Upload",
      logurl: routes.login,
      loglabel: "Log In",
      regurl: routes.join,
      reglabel: "Join",
      quizUpload: "",
      videoUpload: "", videos
    });
  }
}


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
    const videos = await videoModel.findAll();
    const video = await videoModel.findAll({ where: { id: id } });
    const questions = await questionModel.findAll({ where: { videoId: id } });

    if (req.session.auth) {
      const user = await userModel.findAll({ where: { id: req.session.userId } });

      res.render("videoDetail", {
        pageTitle: video[0].title,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        userName: user[0].name,
        quizUpload: "",
        videoUpload: "", video: video[0], questions, videos
      });
    } else if (req.session.auth && req.session.teacher) {
      const user = await userModel.findAll({ where: { id: req.session.userId } });

      res.render("videoDetail", {
        pageTitle: video[0].title,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        userName: user[0].name,
        quizUpload: "Quiz upload",
        videoUpload: "Video Upload", video: video[0], questions, videos
      });
    } else {
      res.render("videoDetail", {
        pageTitle: video[0].title,
        logurl: routes.login,
        loglabel: "Log In",
        regurl: routes.join,
        reglabel: "Join",
        userName: "anonymous",
        quizUpload: "",
        videoUpload: "", video: video[0], questions, videos
      });
    }

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
    const videos = await videoModel.findAll();

    if (req.session.auth) {
      res.render("editVideo", {
        pageTitle: `Edit ${video[0].title}`,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        quizUpload: "",
        videoUpload: "", video: video[0], videos
      });
    } else if (req.session.auth && req.session.teacher) {
      res.render("editVideo", {
        pageTitle: `Edit ${video[0].title}`,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        quizUpload: "Quiz upload",
        videoUpload: "Video Upload", video: video[0], videos
      });
    } else {
      res.render("editVideo", {
        pageTitle: `Edit ${video[0].title}`,
        logurl: routes.login,
        loglabel: "Log In",
        regurl: routes.join,
        reglabel: "Join",
        quizUpload: "",
        videoUpload: "", video: video[0], videos
      });
    }

  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description, note },
  } = req;
  try {
    await videoModel.update({ title, description, note }, { where: { id: id } },);
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
    const videos = await videoModel.findAll();

    if (req.session.auth) {
      const user = await userModel.findAll({ where: { id: req.session.userId } });

      res.render("uploadQues", {
        pageTitle: `Question Upload ${video[0].title}`,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        userName: user[0].name,
        quizUpload: "",
        videoUpload: "", video: video[0], videos
      });
    } else if (req.session.auth && req.session.teacher) {
      const user = await userModel.findAll({ where: { id: req.session.userId } });

      res.render("uploadQues", {
        pageTitle: `Question Upload ${video[0].title}`,
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(req.session.userId),
        reglabel: req.session.email,
        userName: user[0].name,
        quizUpload: "Quiz upload",
        videoUpload: "Video Upload", video: video[0], videos
      });
    } else {
      res.render("uploadQues", {
        pageTitle: `Question Upload ${video[0].title}`,
        logurl: routes.login,
        loglabel: "Log In",
        regurl: routes.join,
        reglabel: "Join",
        userName: "anonymous",
        quizUpload: "",
        videoUpload: "", video: video[0], videos
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
}

export const postUploadQuestion = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  const user = await userModel.findAll({ where: { id: req.session.userId } });

  const newQuestion = await questionModel.create({
    videoId: id,
    userName: user[0].name,
    title,
    description
  });
  res.redirect(routes.videoDetail(newQuestion.videoId));
}
