import routes from "../routes";
import { videoModel } from "../db";

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
    res.render("videoDetail", { pageTitle: video[0].title, video: video[0] });

  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoModel.findAll({ where: { id: id } });
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
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
    params: { id },
  } = req;
  try {
    await videoModel.detroy({ where: { id: id } });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

