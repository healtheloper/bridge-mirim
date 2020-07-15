//TODO: Video DB input

import routes from "../routes";
export const home = (req, res) => {
  //TODO: Video DB render
  res.render("home", { pageTitle: "Home" });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //TODO: Video DB render
  res.render("search", { pageTitle: "Search", searchingBy });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

//TODO postUpload

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
