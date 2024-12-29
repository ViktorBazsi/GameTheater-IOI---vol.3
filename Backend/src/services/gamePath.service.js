import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import {
  isValidGamePathId,
  isValidGamePathName,
} from "../utils/validation.utils.js";

const create = async ({ name }) => {
  await isValidGamePathName(name);
  const newGamePath = await prisma.gamePath.create({
    data: { name },
  });
  return newGamePath;
};

const list = async () => {
  const allGamePaths = await prisma.gamePath.findMany({
    include: {
      userpaths: true,
    },
  });
  return allGamePaths;
};

const getById = async (id) => {
  await isValidGamePathId(id);
  const getGamePathById = await prisma.gamePath.findUnique({
    where: { id },
    include: {
      userpaths: true,
    },
  });
  return getGamePathById;
};

const update = async (id, gamePathData) => {
  await isValidGamePathId(id);
  const updatedGamePath = await prisma.gamePath.update({
    where: { id },
    data: { ...gamePathData },
  });
  return updatedGamePath;
};

const destroy = async (id) => {
  await isValidGamePathId(id);
  const deletedGamePath = await prisma.gamePath.delete({
    where: { id },
  });
  return deletedGamePath;
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
};
