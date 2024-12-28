import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import { isValidGamePathName } from "../utils/validation.utils.js";

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

export default {
  create,
  list,
};
