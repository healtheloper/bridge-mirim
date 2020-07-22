import routes from "../routes";
import { quizModel } from "../db";

export const getQuizUpload = (req, res) => {
    if (req.session.auth) {
        res.render("uploadQuiz", {
            pageTitle: "Upload Quiz",
            logurl: routes.logout,
            loglabel: "Log Out",
            regurl: routes.userDetail(req.session.userId),
            reglabel: req.session.email,
            quizUpload: "",
            videoUpload: ""
        });
    } else if (req.session.auth && req.session.teacher) {
        res.render("uploadQuiz", {
            pageTitle: "Upload Quiz",
            logurl: routes.logout,
            loglabel: "Log Out",
            regurl: routes.userDetail(req.session.userId),
            reglabel: req.session.email,
            quizUpload: "Quiz upload",
            videoUpload: "Video Upload"
        });
    } else {
        res.render("uploadQuiz", {
            pageTitle: "Upload Quiz",
            logurl: routes.login,
            loglabel: "Log In",
            regurl: routes.join,
            reglabel: "Join",
            quizUpload: "",
            videoUpload: ""
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
        if (req.session.auth) {
            const quiz = await quizModel.findAll({ where: { id: id } });

            res.render("editQuiz", {
                pageTitle: `Edit Quiz`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                quizUpload: "",
                videoUpload: "", quiz: quiz[0]
            });
        } else if (req.session.auth && req.session.teacher) {
            res.render("editQuiz", {
                pageTitle: `Edit Quiz`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                quizUpload: "Quiz upload",
                videoUpload: "Video Upload", quiz: quiz[0]
            });
        } else {
            res.render("editQuiz", {
                pageTitle: `Edit Quiz`,
                logurl: routes.login,
                loglabel: "Log In",
                regurl: routes.join,
                reglabel: "Join",
                quizUpload: "",
                videoUpload: "", quiz: quiz[0]
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
