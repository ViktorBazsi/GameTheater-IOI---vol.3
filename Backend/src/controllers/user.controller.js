import userService from "../services/user.service.js";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

const create = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await userService.create({
      username,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const allUsers = await userService.list();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userById = await userService.getById(id);
    res.status(200).json(userById);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, isAdmin } = req.body;
  // Itt lehet validálni, hogy csak a saját profilját tudja módosítani
  try {
    const updatedUser = await userService.update(id, {
      username,
      email,
      password,
      isAdmin,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  //   Itt lehet validálni, hogy csak a saját profilját tudja törölni
  try {
    const deletedUser = await userService.destroy(id);
    res.status(200).json({ deletedUser });
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
