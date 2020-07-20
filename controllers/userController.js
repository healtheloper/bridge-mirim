import routes from "../routes";
import { UserModel } from "../db";
const session=require('express-session');
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, password2, name },
  } = req;
  try{
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
}catch(error){
  console.log(error);
  res.redirect(routes.home);
}

};

  res.render("login", { pageTitle: "Log In" });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  req.session.destroy(function(error){
    if(error){
       console.log(error);
    }else{
        res.redirect(routes.home);
    }
  
});
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
