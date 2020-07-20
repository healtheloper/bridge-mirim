import routes from "../routes";
import { quizModel } from "../db";

export const getQuizUpload = (req, res) => {
    res.render("uploadQuiz", { pageTitle: "Upload Quiz" });
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
        const quiz = await quizModel.findAll({ where: { id: id } });
        res.render("editQuiz", { pageTitle: `Edit Quiz`, quiz: quiz[0] });
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
