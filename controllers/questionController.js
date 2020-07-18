import routes from "../routes";
import { videoModel, questionModel, commentModel } from "../db";

export const getQuestion = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const question = await questionModel.findAll({ where: { id: id } });
        const comments = await commentModel.findAll({ where: { questionId: question[0].id } })
        res.render("getQues", { pageTitle: "Question", question: question[0], comments });
    } catch (error) {
        console.log(error);
        res.render("getQues", { pageTitle: "Question", question: [], comments: [] });
    }
}

export const getEditQuestion = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const question = await questionModel.findAll({ where: { id: id } });
        res.render("editQues", { pageTitle: `Edit ${question[0].title}`, question: question[0] });
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
    const {
        params: { id },
        body: { comment, userId }
    } = req;
    const newComment = await commentModel.create({
        questionId: id,
        userId,
        comment
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
