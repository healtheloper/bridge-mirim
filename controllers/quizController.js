import routes from "../routes";
import { quizModel, videoModel } from "../db";

export const handleQuiz = async (req, res) => {
    const videos = await videoModel.findAll();
    const quizs = await quizModel.findAll();

    if (req.session.auth && req.session.teacher) {
        res.render("quiz", {
            pageTitle: "Quiz",
            logurl: routes.logout,
            loglabel: "Log Out",
            regurl: routes.userDetail(req.session.userId),
            reglabel: req.session.email,
            teacher: req.session.teacher,
            quizUpload: "Quiz upload",
            videoUpload: "Video Upload", videos, quizs
        });
    } else if (req.session.auth && req.session.teacher == false) {
        res.render("quiz", {
            pageTitle: "Quiz",
            logurl: routes.logout,
            loglabel: "Log Out",
            regurl: routes.userDetail(req.session.userId),
            reglabel: req.session.email,
            teacher: req.session.teacher,
            quizUpload: "",
            videoUpload: "", videos, quizs
        });
    } else {
        res.render("quiz", {
            pageTitle: "Quiz",
            logurl: routes.login,
            loglabel: "Log In",
            regurl: routes.join,
            reglabel: "Join",
            teacher: false,
            quizUpload: "",
            videoUpload: "", videos, quizs
        });
    }
}

export const getQuizUpload = async (req, res) => {
    const videos = await videoModel.findAll();

    if (req.session.auth && req.session.teacher == false) {

        res.render("uploadQuiz", {
            pageTitle: "Upload Quiz",
            logurl: routes.logout,
            loglabel: "Log Out",
            regurl: routes.userDetail(req.session.userId),
            reglabel: req.session.email,
            teacher: req.session.teacher,
            quizUpload: "",
            videoUpload: "", videos
        });
    } else if (req.session.auth && req.session.teacher) {

        res.render("uploadQuiz", {
            pageTitle: "Upload Quiz",
            logurl: routes.logout,
            loglabel: "Log Out",
            regurl: routes.userDetail(req.session.userId),
            reglabel: req.session.email,
            teacher: req.session.teacher,
            quizUpload: "Quiz upload",
            videoUpload: "Video Upload", videos
        });
    } else {
        res.render("uploadQuiz", {
            pageTitle: "Upload Quiz",
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
export const postQuizUpload = async (req, res) => {
    const {
        body: { question, answerOne, answerTwo, answerThree, answerFour, answerCheck }
    } = req;
    const newQuiz = await quizModel.create({
        question,
        answerOne,
        answerTwo,
        answerThree,
        answerFour,
        answerCheck
    });
    res.redirect(routes.home);
};

export const getQuizEdit = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const videos = await videoModel.findAll();
        if (req.session.auth && req.session.teacher == false) {
            const quiz = await quizModel.findAll({ where: { id: id } });

            res.render("editQuiz", {
                pageTitle: `Edit Quiz`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                teacher: req.session.teacher,
                quizUpload: "",
                videoUpload: "", quiz: quiz[0], videos
            });
        } else if (req.session.auth && req.session.teacher) {
            res.render("editQuiz", {
                pageTitle: `Edit Quiz`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                teacher: req.session.teacher,
                quizUpload: "Quiz upload",
                videoUpload: "Video Upload", quiz: quiz[0], videos
            });
        } else {
            res.render("editQuiz", {
                pageTitle: `Edit Quiz`,
                logurl: routes.login,
                loglabel: "Log In",
                regurl: routes.join,
                reglabel: "Join",
                teacher: false,
                quizUpload: "",
                videoUpload: "", quiz: quiz[0], videos
            });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postQuizEdit = async (req, res) => {
    const {
        params: { id },
        body: { question, answerOne, answerTwo, answerThree, answerFour, answerCheck },
    } = req;
    try {
        await quizModel.update({ question, answerOne, answerTwo, answerThree, answerFour, answerCheck }, { where: { id: id } },);
        res.redirect(routes.home);
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const deleteQuiz = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const quiz = await quizModel.findAll({ where: { id: id } });
        await quizModel.destroy({ where: { id: id } });

    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};
