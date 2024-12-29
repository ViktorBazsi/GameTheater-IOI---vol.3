import userPath_On_QuestionService from "../services/userPath_On_Question.service.js";

const create = async (req, res, next) => {
  const { userPathUName, questionNr } = req.body;
  try {
    const newUserPath_On_Question_Connection =
      await userPath_On_QuestionService.create({
        userPathUName,
        questionNr,
      });
    res.status(201).json(newUserPath_On_Question_Connection);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  const allUserPath_On_Question_Connections =
    await userPath_On_QuestionService.list();
  res.status(200).json(allUserPath_On_Question_Connections);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getUserPath_On_QuestionById =
      await userPath_On_QuestionService.getById(id);
    res.status(200).json(getUserPath_On_QuestionById);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { userPathUName, questionNr } = req.body;

  try {
    const updatedUserPath_On_Question =
      await userPath_On_QuestionService.update(id, {
        userPathUName,
        questionNr,
      });
    res.status(201).json(updatedUserPath_On_Question);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUserPath_On_Question =
      await userPath_On_QuestionService.destroy(id);
    res.status(200).json({ deletedUserPath_On_Question });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
};
