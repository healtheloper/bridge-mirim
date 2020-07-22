import routes from "../routes";
import { videoModel, questionModel, commentModel, userModel } from "../db";

export const getQuestion = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const question = await questionModel.findAll({ where: { id: id } });
        const comments = await commentModel.findAll({ where: { questionId: question[0].id } })
        const videos = await videoModel.findAll();

        if (req.session.auth && req.session.teacher == false) {
            const user = await userModel.findAll({ where: { id: req.session.userId } });
            const users = await userModel.findAll();

            res.render("getQues", {
                pageTitle: "Question",
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                userName: user[0].name,
                userImage: "/" + user[0].avatarUrl,
                teacher: req.session.teacher,
                userId: req.session.userId,
                questionUploaderId: question.userId,
                quizUpload: "",
                videoUpload: "", question: question[0], comments, videos
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
                userImage: "/" + user[0].avatarUrl,
                teacher: req.session.teacher,
                userId: req.session.userId,
                questionUploaderId: question.userId,
                quizUpload: "Quiz upload",
                videoUpload: "Video Upload", question: question[0], comments, videos
            });
        } else {
            res.render("getQues", {
                pageTitle: "Log In",
                logurl: routes.login,
                loglabel: "Log In",
                regurl: routes.join,
                reglabel: "Join",
                userName: "anonymous",
                userImage: "https://lh3.googleusercontent.com/proxy/uxjgxlTUyMZwqviuMkmP8DUckvOEGFco04lylNTc4U4xKeC5HQMiyy7ihDcQ3Dgp2RRj4GXUBlO1JBxF796ETCbnyiFklzjxEvAHY0eaMjOwqqvKfv2mQHb6WkcJwqi6jIzu0ZB1RNa1i0HhAQOLIp-RwUEqWamwID1d",
                userId: "anonymous",
                questionUploaderId: question.userId,
                teacher: false,
                quizUpload: "",
                videoUpload: "", question: question[0], comments, videos
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
            userId: "anonymous",
            questionUploaderId: "",
            teacher: false,
            quizUpload: "",
            videoUpload: "", question: [], comments: [], videos: []
        });
    }
}

export const getEditQuestion = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const question = await questionModel.findAll({ where: { id: id } });
        const videos = await videoModel.findAll();

        if (req.session.auth && req.session.teacher == false) {
            res.render("editQues", {
                pageTitle: `Edit ${question[0].title}`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                teacher: req.session.teacher,
                userId: req.session.userId,
                quizUpload: "",
                videoUpload: "", question: question[0], videos
            });
        } else if (req.session.auth && req.session.teacher) {
            res.render("editQues", {
                pageTitle: `Edit ${question[0].title}`,
                logurl: routes.logout,
                loglabel: "Log Out",
                regurl: routes.userDetail(req.session.userId),
                reglabel: req.session.email,
                userId: req.session.userId,
                teacher: req.session.teacher,
                quizUpload: "Quiz upload",
                videoUpload: "Video Upload", question: question[0], videos
            });
        } else {
            res.render("editQues", {
                pageTitle: `Edit ${question[0].title}`,
                logurl: routes.login,
                loglabel: "Log In",
                regurl: routes.join,
                reglabel: "Join",
                userId: "anonymous",
                teacher: false,
                quizUpload: "",
                videoUpload: "", question: question[0], videos
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
        body: { comment }
    } = req;
    const newComment = await commentModel.create({
        questionId: id,
        userId: req.session.userId,
        userImage: user[0].avatarUrl,
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
