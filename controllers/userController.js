import routes from "../routes";
import { UserModel } from "../db";
import session from "express-session";
import ejs from "ejs";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
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
      // To Do: Register User
      await UserModel.create({
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


  res.render("login", { pageTitle: "Log In" });
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
      const result = await UserModel.findAll({ where: { email: email } });
      if (email == result[0].email && password == result[0].password) {
        session.email = email;
        session.password = password;
        session.auth = 99;
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
