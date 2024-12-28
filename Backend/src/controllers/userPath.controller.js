import userPathService from "../services/userPath.service.js";

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

const update = async (req, res, next) => {
  const { id } = req.params;
  const { gamePathId, questionNr, resReka, resDomi, resKata, nextQuestion } =
    req.body;

  try {
    const updatedUserPath = await userPathService.update(id, {
      gamePathId,
      questionNr,
      resReka,
      resDomi,
      resKata,
      nextQuestion,
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

export default {
  create,
  list,
  getById,
  update,
  destroy,
};
