// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";
const VIDEO_QUESTION = "/:id/question";

// Videos - Posts
const QUESTION = "/question";
const QUESTION_DETAIL = "/:id";
const EDIT_QUESTION = "/:id/edit";
const DELETE_QUESTION = "/:id/delete";

// Comment

const UPLOAD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/comment/delete";

// Quiz

const QUIZ = "/quiz";
const UPLOAD_QUIZ = "/upload";
const QUIZ_DETAIL = "/:id";
const EDIT_QUIZ = "/:id/edit"
const DELETE_QUIZ = "/:id/delete"

////

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  uploadComment: (id) => {
    if (id) {
      return `/question/${id}/comment`;
    } else {
      return UPLOAD_COMMENT;
    }
  },
  uploadQuestion: (id) => {
    if (id) {
      return `/videos/${id}/question`;
    } else {
      return VIDEO_QUESTION;
    }
  },
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteComment: (id) => {
    if (id) {
      return `/question/${id}/comment/delete`;
    } else {
      return DELETE_COMMENT;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  question: QUESTION,
  questionDetail: (id) => {
    if (id) {
      return `/question/${id}`;
    } else {
      return QUESTION_DETAIL;
    }
  },
  editQuestion: (id) => {
    if (id) {
      return `/question/${id}/edit`;
    } else {
      return EDIT_QUESTION;
    }
  },
  deleteQuestion: (id) => {
    if (id) {
      return `/question/${id}/delete`;
    } else {
      return DELETE_QUESTION;
    }
  },
  quiz: QUIZ,
  uploadQuiz: UPLOAD_QUIZ,
  QUIZ_DETAIL: QUIZ_DETAIL,
  editQuiz: (id) => {
    if (id) {
      return `/quiz/${id}/edit`;
    } else {
      return EDIT_QUIZ;
    }
  },
  deleteQuiz: (id) => {
    if (id) {
      return `/quiz/${id}/delete`;
    } else {
      return DELETE_QUIZ;
    }
  },

};

export default routes;


