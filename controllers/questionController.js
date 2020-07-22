import routes from "../routes";
import { videoModel, questionModel, commentModel, userModel } from "../db";

export const getQuestion = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const question = await questionModel.findAll({ where: { id: id } });
        const comments = await commentModel.findAll({ where: { questionId: question[0].id } })


        if (req.session.auth) {
            const user = await userModel.findAll({ where: { id: req.session.userId } });

            res.render("getQues", {
                pageTitle: "Question",
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                userName: user[0].name,
                quizUpload: "",
                videoUpload: "", question: question[0], comments
            });
        } else if (req.session.auth && req.session.teacher) {
            const user = await userModel.findAll({ where: { id: req.session.userId } });

            res.render("getQues", {
                pageTitle: "Question",
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                userName: user[0].name,
                quizUpload: "Quiz upload",
                videoUpload: "Video Upload", question: question[0], comments
            });
        } else {
            res.render("getQues", {
                pageTitle: "Log In",
                logurl: routes.login,
                loglabel: "Log In",
                regurl: routes.join,
                reglabel: "Join",
                userName: "anonymous",
                quizUpload: "",
                videoUpload: "", question: question[0], comments
            });
        }
    } catch (error) {
        console.log(error);
        res.render("getQues", {
            pageTitle: "Log In",
            logurl: routes.login,
            loglabel: "Log In",
            regurl: routes.join,
            reglabel: "Join",
            userName: "anonymous",
            quizUpload: "",
            videoUpload: "", question: [], comments: []
        });
    }
}

export const getEditQuestion = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const question = await questionModel.findAll({ where: { id: id } });

        if (req.session.auth) {
            res.render("editQues", {
                pageTitle: `Edit ${question[0].title}`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                quizUpload: "",
                videoUpload: "", question: question[0]
            });
        } else if (req.session.auth && req.session.teacher) {
            res.render("editQues", {
                pageTitle: `Edit ${question[0].title}`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                quizUpload: "Quiz upload",
                videoUpload: "Video Upload", question: question[0]
            });
        } else {
            res.render("editQues", {
                pageTitle: `Edit ${question[0].title}`,
                logurl: routes.login,
                loglabel: "Log In",
                regurl: routes.join,
                reglabel: "Join",
                quizUpload: "",
                videoUpload: "", question: question[0]
            });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditQuestion = async (req, res) => {
    const {
        params: { id },
        body: { title, description },
    } = req;
    try {
        await questionModel.update({ title, description }, { where: { id: id } },);
        res.redirect(routes.questionDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteQuestion = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const question = await questionModel.findAll({ where: { id: id } });
        await questionModel.destroy({ where: { id: id } });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

export const uploadComment = async (req, res) => {
    const user = await userModel.findAll({ where: { id: req.session.userId } });
    const {
        params: { id },
        body: { comment, userId }
    } = req;
    const newComment = await commentModel.create({
        questionId: id,
        userId,
        comment,
        userName: user[0].name
    });
    res.redirect(routes.questionDetail(newComment.questionId));
};

export const deleteComment = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const comment = await commentModel.findAll({ where: { id: id } });
        await commentModel.destroy({ where: { id: id } });
        res.redirect('back');
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}
