import answerService from "../services/answer.service.js";
import questionService from "../services/question.service.js";
import userPathService from "../services/userPath.service.js";
import answerController from "./answer.controller.js";

const create = async (req, res, next) => {
  const username = req.user?.username;
  const { gamePathId } = req.params;

  console.log("Username:", req.user?.username);
  console.log("GamePath ID:", req.params.gamePathId);

  try {
    const newUserPath = await userPathService.create({ username, gamePathId });
    res.status(201).json(newUserPath);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const allUserPaths = await userPathService.list();
    res.status(200).json(allUserPaths);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getUserPathById = await userPathService.getById(id);
    res.status(200).json(getUserPathById);
  } catch (error) {
    next(error);
  }
};

const getByName = async (req, res, next) => {
  const { username } = req.params;
  try {
    const userPathByUsername = await userPathService.getByName(username);
    res.status(200).json(userPathByUsername);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const {
    gamePathId,
    questionNr,
    resReka,
    resDomi,
    resKata,
    nextQuestion,
    userAnswerId,
  } = req.body;

  try {
    const updatedUserPath = await userPathService.update(id, {
      gamePathId,
      questionNr,
      resReka,
      resDomi,
      resKata,
      nextQuestion,
      userAnswerId,
    });
    res.status(201).json(updatedUserPath);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUserPath = await userPathService.destroy(id);
    res.status(200).json({ deletedUserPath });
  } catch (error) {
    next(error);
  }
};

const nextQuestion = async (req, res, next) => {
  const username = req.user?.username;
  const userPath = await userPathService.getByName(username);
  const nextQuestionNr = userPath.nextQuestion;
  const nextQuestion = await questionService.getByNumber(nextQuestionNr);
  res.status(200).json(nextQuestion);
};

const addAnswer = async (req, res, next) => {
  const { answer } = req.body;
  // kiszedjük a megfelelő userPath-ot a username alapján
  const username = req.user?.username;
  const userPath = await userPathService.getByName(username);
  // kieszedjük a userPath-hoz tartozó következő kérdést, a kérdésszám alapján
  const nextQuestionNr = userPath.nextQuestion;
  const nextQuestion = await questionService.getByNumber(nextQuestionNr);
  // Kiválasztja a user a megfelelő választ.
  const userAnswer = await answerService.getByAnswer(answer);
  // kiszedjük a választott kérdést
  const chosenAnswerId = userAnswer.id;
  const getChosenAnswer = await answerService.getById(chosenAnswerId);
  // Frissítjük a userPath-ot a megfelelő válasszal
  const updatedUserPath = await userPathService.update(userPath.id, {
    questionNr: getChosenAnswer.relQuestionNr,
    resReka: getChosenAnswer.resultReka,
    resDomi: getChosenAnswer.resultDomi,
    resKata: getChosenAnswer.resultKata,
    nextQuestion: getChosenAnswer.nextQuestNr,
    userAnswerId: getChosenAnswer.id,
  });
  res.status(200).json(updatedUserPath);
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
  getByName,
  // ------ EXTRA
  nextQuestion,
  addAnswer,
};
