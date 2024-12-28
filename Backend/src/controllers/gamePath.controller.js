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

export default {
  create,
  list,
};
