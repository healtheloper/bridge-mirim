import routes from "../routes";
import { userModel } from "../db";
import session from "express-session";
import ejs from "ejs";

export const getJoin = (req, res) => {
  if (req.session.auth) {
    res.render("join", {
      pageTitle: "Join",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      quizUpload: "",
      videoUpload: ""
    });
  } else if (req.session.auth && req.session.teacher) {
    res.render("join", {
      pageTitle: "Join",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      quizUpload: "Quiz upload",
      videoUpload: "Video Upload"
    });
  } else {
    res.render("join", {
      pageTitle: "Join",
      logurl: routes.login,
      loglabel: "Log In",
      regurl: routes.join,
      reglabel: "Join",
      quizUpload: "",
      videoUpload: ""
    });
  }
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, password2, name },
  } = req;
  try {
    if (password !== password2) {
      res.status(400);
      res.render("join", { pageTitle: "Join" });
    } else {
      await userModel.create({
        email,
        password,
        password2,
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
export const getLogin = (req, res) => {

  if (req.session.auth) {
    res.render("login", {
      pageTitle: "Log In",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      quizUpload: "",
      videoUpload: ""
    });
  } else if (req.session.auth && req.session.teacher) {
    res.render("login", {
      pageTitle: "Log In",
      logurl: routes.logout,
      loglabel: "Log Out",
      regurl: routes.userDetail(req.session.userId),
      reglabel: req.session.email,
      quizUpload: "Quiz upload",
      videoUpload: "Video Upload"
    });
  } else {
    res.render("login", {
      pageTitle: "Log In",
      logurl: routes.login,
      loglabel: "Log In",
      regurl: routes.join,
      reglabel: "Join",
      quizUpload: "",
      videoUpload: ""
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
        session.email = email;
        session.password = password;
        session.auth = 99;
        session.userId = result[0].id;
        console.log(session);
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

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
