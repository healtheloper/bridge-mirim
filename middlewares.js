import multer from "multer";
import routes from "./routes";
import { UserModel } from "./db";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Bridge";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

export const loginCheck = async (req, res, next) => {
  try {
    if (req.session.auth) {

      const user = await UserModel.findAll({ where: { email: req.session.email } });

      res.render("partials/header", {
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(user[0].id),
        reglabel: req.session.email,
        quizUpload: "",
        videoUpload: ""
      });
    } else if (req.session.auth && req.session.teacher) {

      const user = await UserModel.findAll({ where: { email: req.session.email } });

      res.render("partials/header", {
        logurl: routes.logout,
        loglabel: "Log Out",
        regurl: routes.userDetail(user.id),
        reglabel: req.session.email,
        quizUpload: "Quiz upload",
        videoUpload: "Video Upload"
      });
    }
    else {
      res.render("partials/header", {
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
  }
}
export const uploadVideo = multerVideo.single("videoFile");
