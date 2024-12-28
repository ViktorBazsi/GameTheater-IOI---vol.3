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

export default {
  create,
  list,
};
