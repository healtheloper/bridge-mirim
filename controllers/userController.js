import routes from "../routes";
import { userModel, videoModel } from "../db";
import fs from "fs";
import session from "express-session";

export const getJoin = async (req, res) => {
  const videos = await videoModel.findAll();

  if (req.session.auth && req.session.teacher == false) {
    res.render("join", {
      pageTitle: "Join",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      teacher: req.session.teacher,
      quizUpload: "",
      videoUpload: "", videos
    });
  } else if (req.session.auth && req.session.teacher) {
    res.render("join", {
      pageTitle: "Join",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      teacher: req.session.teacher,
      quizUpload: "Quiz upload",
      videoUpload: "Video Upload", videos
    });
  } else {
    res.render("join", {
      pageTitle: "Join",
      logurl: routes.login,
      loglabel: "Log In",
      regurl: routes.join,
      reglabel: "Join",
      teacher: false,
      quizUpload: "",
      videoUpload: "", videos
    });
  }
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, password2, studentCheck, name },
    file: { path }
  } = req;
  try {
    if (password !== password2) {
      res.status(400);
      res.render("join", { pageTitle: "Join" });
    } else {
      await userModel.create({
        email,
        password,
        studentCheck,
        avatarUrl: path,
        name
      });
      // To Do: Log user in
      res.redirect(routes.login);
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }

};
export const getLogin = async (req, res) => {
  const videos = await videoModel.findAll();

  if (req.session.auth && req.session.teacher == false) {
    res.render("login", {
      pageTitle: "Log In",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      teacher: req.session.teacher,
      quizUpload: "",
      videoUpload: "", videos
    });
  } else if (req.session.auth && req.session.teacher) {
    res.render("login", {
      pageTitle: "Log In",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      teacher: req.session.teacher,
      quizUpload: "Quiz upload",
      videoUpload: "Video Upload", videos
    });
  } else {
    res.render("login", {
      pageTitle: "Log In",
      logurl: routes.login,
      loglabel: "Log In",
      regurl: routes.join,
      reglabel: "Join",
      teacher: false,
      quizUpload: "",
      videoUpload: "", videos
    });
  }
};

export const postLogin = async (req, res) => {
  const {
    body: { email, password },
    session
  } = req;
  try {

    if (email == '' || password == '') {
      res.status(562).end('<meta charset="utf-8">아이디나 암호가 입력되지 않아서 로그인할 수 없습니다.');
    } else {
      const result = await userModel.findAll({ where: { email: email } });
      if (email == result[0].email && password == result[0].password) {
        if (result[0].studentCheck == 1) {
          session.email = email;
          session.password = password;
          session.auth = true;
          session.userId = result[0].id;
          session.teacher = false;
          console.log("student ? " + session.teacher + ", 학생으로 로그인");
        } else {
          session.email = email;
          session.password = password;
          session.auth = true;
          session.userId = result[0].id;
          session.teacher = true;
          console.log("student ? " + session.teacher + ", 강사로 로그인");
        }

        res.redirect(routes.home);
      } else {
        res.redirect(routes.login);
      }

    }

  } catch (error) {
    console.log(error);
  }

};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const profile = await UserModel.findAll({ where: { id: id } });
    res.render("editProfile", { pageTitle: `Edit Profile`, profile: profile[0] });
    res.redirect(routes.editProfile);
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = async (req, res) => {
  const {
    params: { id },
    body: { email, password, name },
  } = req;
  try {
    await userModel.update({ email, password, name }, { where: { id: id } },);
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
