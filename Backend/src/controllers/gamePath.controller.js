import gamePathService from "../services/gamePath.service.js";

const create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newGamePath = await gamePathService.create({
      name,
    });
    res.status(201).json(newGamePath);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const allGamePaths = await gamePathService.list();
    res.status(200).json(allGamePaths);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getGamePathById = await gamePathService.getById(id);
    res.status(200).json(getGamePathById);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { questionNr, resRekaAll, resDomiAll, resKataAll, nextQuestion } =
    req.body;

  try {
    const updatedGamePath = await gamePathService.update(id, {
      questionNr,
      resRekaAll,
      resDomiAll,
      resKataAll,
      nextQuestion,
    });
    res.status(201).json(updatedGamePath);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedGamePath = await gamePathService.destroy(id);
    res.status(200).json({ deletedGamePath });
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
